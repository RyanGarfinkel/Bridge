import type { NextApiRequest, NextApiResponse } from 'next';
import dbconnect from '@/lib/dbConnection';
import Survey, { ISurvey } from '@/models/Survey';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    if (req.method !== 'POST')
        return res.status(405).json({ error: 'Method not allowed' });

    const { auth0Id, survey } = req.body;
    
    if (!auth0Id || !survey)
        return res.status(400).json({ error: 'Missing auth0Id or survey.' });

    await dbconnect();

    console.log('Survey:', survey);

    const surveyObj = await Survey.findOneAndUpdate(
        { auth0Id: auth0Id },
        { ...survey, auth0Id: auth0Id },
        { new: true }
    );

    if(!surveyObj)
        return res.status(404).json({ error: 'Survey not found.' });

    return res.status(200).json(surveyObj as ISurvey);
};

export default handler;