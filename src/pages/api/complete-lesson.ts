import { NextApiRequest, NextApiResponse } from 'next';
import Course, { ILesson } from '@/models/Course';
import dbconnect from '@/lib/dbConnection';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    
    if (req.method !== 'PUT')
        return res.status(405).json({ message: 'Method not allowed' });

    await dbconnect();

    const { courseId, lessonId } = req.body;

    if (!courseId || !lessonId)
        return res.status(400).json({ message: 'Course ID and Lesson ID are required' });

    const updatedCourse = await Course.findOneAndUpdate(
        { _id: courseId, 'lessons.id': lessonId },
        { $set: { 'lessons.$.isCompleted': true }, status: 'In Progress' },
        { new: true }
    ).catch((error) => {
        console.error('Error updating lesson:', error);
        return res.status(500).json({ message: 'Internal server error' });
    });

    if (!updatedCourse)
        return res.status(404).json({ message: 'Course not found' });

    if(updatedCourse.lessons.every((lesson: ILesson) => lesson.isCompleted))
        await Course.findByIdAndUpdate(courseId, { status: 'Completed' }, { new: true })
            .catch((error) => {
                console.error('Error updating course:', error);
                return res.status(500).json({ message: 'Internal server error' });
            });

    return res.status(204).end();
}

export default handler;
