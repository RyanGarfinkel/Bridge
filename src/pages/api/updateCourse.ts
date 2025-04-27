import { NextApiRequest, NextApiResponse } from 'next';
import Course, { ICourse } from '@/models/Course';
import dbconnect from '@/lib/dbConnection';


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    
    if (req.method !== 'PUT')
        return res.status(405).json({ message: 'Method not allowed' });

    await dbconnect();

    const { course } = req.body;

    if (!course)
        return res.status(400).json({ message: 'Course is required' });

    const updatedCourse = await Course.findByIdAndUpdate((course as ICourse)._id, course, {
        new: true
    });

    if (!updatedCourse)
        return res.status(404).json({ message: 'Course not found' });

    res.status(200).json(updatedCourse);
}

export default handler;
