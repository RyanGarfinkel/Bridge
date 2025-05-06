'use client';

import { useCourse } from '@/context/CourseProvider';
import { ICourse } from '@/models/Course';
import { useState, useEffect } from 'react';
import { Card, CardDescription, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface CoursePageProps {
    params: Promise<{ courseId: string }>;
}

const CoursePage: React.FC<CoursePageProps> = ({ params }) => {

    const [courseId, setCourseId] = useState<string>('');
    const { courses } = useCourse();

    const [course, setCourse] = useState<ICourse>({} as ICourse);

    useEffect(() => {

        params.then(({ courseId: id }) => {
            setCourseId(id);
        });
    }, [params]);

    useEffect(() => {
        if(!courseId) return;

        const c = courses.find((course) => course._id === courseId);
        if(!c)
            return;

        setCourse(c as ICourse);
    }, [courses, courseId]);

    const handleClick = (lessonId: string) => {

        const lesson = course.lessons.find((lesson) => lesson.id === lessonId);

        if(!lesson)
            return;

        window.location.href = `/course/${courseId}/${lessonId}`;
    }

    return (
        <div className='flex justify-center items-center bg-gray-50 w-full p-10'>
            <div className='font-sans text-gray-800 w-full'>
                <h1 className='text-3xl font-bold mb-4'>
                    {course.title}
                </h1>
                <p className='text-lg text-gray-600 mb-6'>
                    {course.description}
                </p>
                <div className='grid grid-cols-3 gap-6 w-full'>
                    {
                        course.lessons?.map((lesson) => (
                            <Card key={lesson.id} className='w-[500px]'>
                                <CardHeader className='text-xl font-semibold'>
                                    { lesson.title }
                                </CardHeader>
                                <CardDescription className='text-primary text-lg mx-2'>
                                    { lesson.description }
                                </CardDescription>
                                <CardFooter className='flex flex-row justify-between items-center'>
                                    <Button variant='default' className='bg-blue-500 hover:bg-blue-600 text-white' onClick={() => handleClick(lesson.id)}>
                                        {lesson.isCompleted ? '🔄 Review Lesson' : '🚀 Start Lesson'}
                                    </Button>
                                    <span className={`text-lg ${lesson.isCompleted ? 'text-green-500' : 'text-red-500'}`}>
                                        {lesson.isCompleted ? '✅ Completed' : '❌ Not Completed'}
                                    </span>
                                </CardFooter>
                            </Card>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default CoursePage;