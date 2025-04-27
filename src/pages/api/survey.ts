import type { NextApiRequest, NextApiResponse } from 'next';
import dbconnect from '@/lib/dbConnection';
import Survey from '@/models/Survey';
import User from '@/models/User';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    if (req.method !== 'POST')
        return res.status(405).json({ error: 'Method not allowed' });

    const { auth0Id, survey } = req.body;
    
    if (!auth0Id || !survey)
        return res.status(400).json({ error: 'Missing auth0Id or survey.' });

    await dbconnect();

    const existingSurvey = await Survey.findOne({ auth0Id: auth0Id });
    if (existingSurvey)
        return res.status(403).json({ error: 'Survey already exists and cannot be modified.' });

    const surveyObj = await Survey.create({ auth0Id: auth0Id, ...survey });
    if (!surveyObj)
        return res.status(500).json({ error: 'Failed to create survey.' });

    await User.updateOne(
        { auth0Id: auth0Id },
        { hasCompletedSurvey: true }
    );

    return res.status(204).end();
};

export default handler;