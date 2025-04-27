import type { NextApiRequest, NextApiResponse } from 'next';
import dbconnect from '@/lib/dbConnection';
import Course, { ICourse } from '@/models/Course';
import Survey from '@/models/Survey';
import prompts, { unitTitles } from '@/utils/prompts';
import createCourse from '@/utils/createCourse';
import pLimit from 'p-limit';

const retryWithBackoff = async <T>(
    fn: () => Promise<T>,
    retries = 5, // Increase retries
    delay = 2000 // Start with a 2-second delay
): Promise<T | undefined> => {
    while (retries > 0) {
        try {
            return await fn();
        } catch (error: unknown) {
            if (error instanceof Error && error.message.includes('429')) {
                console.warn(`Rate limit exceeded. Retrying in ${delay / 1000}s...`);
                await new Promise((resolve) => setTimeout(resolve, delay));
                retries--;
                delay *= 2; // Exponential backoff
            } else {
                console.error('Non-retryable error:', error);
                throw error; // Throw non-rate-limit errors immediately
            }
        }
    }
    console.error('Failed after multiple retries.');
    throw new Error('Failed after multiple retries.');
};

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

    console.log('Courses (api):', courses);

    if(courses && courses.length > 0)
        return res.status(200).json(courses as ICourse[]);

    const surveyResponses = JSON.stringify(survey);

    const limit = pLimit(1);

     console.log('Creating courses for user:', auth0Id);
     console.log('prompts:', prompts);

    await Promise.all(
        prompts.map((prompt, i) =>
            limit(() =>
                retryWithBackoff(() => createCourse(unitTitles[i], prompt, surveyResponses, auth0Id))
            )
        )
    );

    return res.status(200).json(courses as ICourse[]);
};

export default handler;