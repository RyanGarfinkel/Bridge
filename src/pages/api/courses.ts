import type { NextApiRequest, NextApiResponse } from 'next';
import dbconnect from '@/lib/dbConnection';
import Course, { ICourse } from '@/models/Course';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    if (req.method !== 'POST')
        return res.status(405).json({ error: 'Method not allowed' });

    const { auth0Id } = req.body;
    if(!auth0Id)
        return res.status(400).json({ error: 'Missing auth0Id.' });

    dbconnect();

    const courses = await Course.find({ auth0Id: auth0Id });

    if(!courses || courses.length === 0)
        return res.status(404).json({ error: 'No courses found for this user.' });

    return res.status(200).json(courses as ICourse[]);
};

export default handler;