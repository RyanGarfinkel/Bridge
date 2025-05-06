
import { useCourse } from '@/context/CourseProvider';
import { ICourse } from '@/models/Course';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import { useData } from '@/context/DataProvider';
import { useEffect } from 'react';
import { Card, CardFooter, CardDescription, CardHeader, CardContent } from './ui/card';

const CourseList = () => {

    const { user } = useData();
    const { courses } = useCourse();

    const router = useRouter();

    const handleClick = (course: ICourse) => router.push(`/course/${course._id}`);

    useEffect(() => {
        console.log('Courses:', courses[0]);
    })

    return (
        <div className='flex flex-col items-center w-full my-20'>
            <h1 className='text-4xl font-bold mb-6 text-center'>
                Welcome {user!.firstname} {user!.lastname} 👋
            </h1>
            <p className='text-xl text-gray-600 mb-10 text-center'>
                We&apos;re so excited to have you here! 🚀 Let&apos;s dive into your courses and start learning! 🎓✨
            </p>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl'>
                {
                    courses.map((course: ICourse, i: number) => (
                        <Card 
                            key={i} 
                            className='shadow-lg rounded-xl border border-gray-300 transition-transform transform hover:scale-105 hover:shadow-2xl w-full max-w-md mx-auto'
                        >
                            <CardHeader className='p-6 text-center'>
                                <h2 className='text-2xl font-extrabold mb-2 text-gray-800'>
                                    {course.title}
                                </h2>
                            </CardHeader>
                            <CardContent className='px-6'>
                                <CardDescription className='text-left text-lg text-gray-600 mb-4'>
                                    {course.description}
                                </CardDescription>
                                <div className='text-center mb-6'>
                                    <span 
                                        className={`inline-block text-base font-semibold px-4 py-2 rounded-full ${
                                            course.status === 'Completed' ? 'bg-green-100 text-green-700' : 
                                            course.status === 'In Progress' ? 'bg-yellow-100 text-yellow-700' : 
                                            'bg-gray-100 text-gray-700'
                                        }`}
                                        style={{ minHeight: '2.5rem', lineHeight: '2.5rem' }}
                                    >
                                        {course.status === 'Completed' ? '✅ Completed' : 
                                        course.status === 'In Progress' ? '⏳ In Progress' : 
                                        '🛑 Not Started'}
                                    </span>
                                </div>
                            </CardContent>
                            <CardFooter className='p-6 flex justify-center'>
                                <Button 
                                    variant='default' 
                                    className='bg-blue-600 hover:bg-blue-700 text-white text-lg font-medium px-6 py-3 rounded-lg'
                                    onClick={() => handleClick(course)}
                                >
                                    {course.status === 'Completed' ? '🌟 Review Unit' : 
                                    course.status === 'In Progress' ? '🔥 Continue Unit' : 
                                    '✨ Start Unit'}
                                </Button>
                            </CardFooter>
                        </Card>
                    ))
                }
            </div>
        </div>
    );
};

export default CourseList;