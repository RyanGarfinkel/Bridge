import type { NextApiRequest, NextApiResponse } from 'next';
import dbconnect from '@/lib/dbConnection';
import Course, { ICourse } from '@/models/Course';
import Survey from '@/models/Survey';
import prompts, { unitTitles } from '@/utils/prompts';
import createCourse from '@/utils/createCourse';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    if (req.method !== 'POST')
        return res.status(405).json({ error: 'Method not allowed' });

    const { auth0Id } = req.body;
    if(!auth0Id)
        return res.status(400).json({ error: 'Missing auth0Id.' });

    dbconnect();

    const survey = await Survey.findOne({ auth0Id: auth0Id });
    if(!survey)
        return res.status(404).json({ error: 'No survey found for this user. Cannot fetch courses without a survey.' });

    const courses = await Course.find({ auth0Id: auth0Id });

    if(courses && courses.length > 0)
        return res.status(200).json(courses as ICourse[]);

    const surveyResponses = JSON.stringify(survey);

    prompts.forEach((prompt, i) => {
        createCourse(unitTitles[i], prompt, surveyResponses, auth0Id)
    });

    return res.status(200).json(courses as ICourse[]);
};

export default handler;
