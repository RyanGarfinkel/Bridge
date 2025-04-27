'use client';

import { useData } from '@/context/DataProvider';
import { ICourse, ILesson } from '@/models/Course';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface CourseOverviewProps {
    course: ICourse;
    lessons: ILesson[];
};
const CourseOverview: React.FC<CourseOverviewProps> = ({ course, lessons }) => {

    return (
        <div>
            <h1>{course.title}</h1>
            <ul>
                {lessons.map((lesson, i) => (
                    <li key={i}>{lesson.title}</li>
                ))}
            </ul>
        </div>
    );
}

const CoursePage: React.FC = () => {
    
    const { courses } = useData();

    const params = useParams();
    const courseName = params?.course as string | undefined;

    const [course, setCourse] = useState<ICourse>();

    useEffect(() => {

        const c = courses.find((course) => course.title.toLowerCase().replace(' ', '-') === courseName);
        console.log('c', c); 

        if (course) {
            console.log('Course found:', course);
            setCourse(c);
        }
    }, [courseName, courses]);

    if (!course)
        return <div>Course not found</div>

    return <CourseOverview course={course} lessons={course.lessons} />;
};

export default CoursePage;