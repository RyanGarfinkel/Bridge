'use client';

import { ICourse } from '@/models/Course';
import React, { useState, useEffect } from 'react';
import { useData } from './DataProvider';

interface CourseContextProps {
    courses: ICourse[];
    isFetchingCourses: boolean;
    completeLesson: (courseId: string, lessonId: string) => Promise<void>;
};

const CourseContext = React.createContext<CourseContextProps | undefined>(undefined);

const CourseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const { user } = useData();

    const [courses, setCourses] = useState<ICourse[]>([]);
    const [isFetchingCourses, setIsFetchingCourses] = useState(false);
    const [trigger, setTrigger] = useState(false);

    const completeLesson = async (courseId: string, lessonId: string) => {

        if(!courses)
            return;

        const response = await fetch('/api/complete-lesson', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                lessonId: lessonId,
                courseId: courseId,
            }),
        });

        if (response.ok)
            setTrigger(true);
        else
        {
            const error = await response.json();
            console.error('Error completing lesson:', error);
        }
    };

    // Fetches list of courses
    useEffect(() => {

        const fetchCourses = async () => {;

            if(isFetchingCourses)
                return;

            if(!user)
            {
                setCourses([]);
                setIsFetchingCourses(false);
                setTrigger(false);
                return;
            }

            if(isFetchingCourses || !user.hasCompletedSurvey)
                return;

            setIsFetchingCourses(true);

            const response = await fetch('/api/courses', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    auth0Id: user.auth0Id,
                }),
            });

            if(response.ok)
            {
                const data = await response.json();
                setCourses(data);
            }
            else
            {
                const error = await response.json();
                console.error('Error fetching courses:', error);
                setCourses([]);
            }

            setIsFetchingCourses(false);
            setTrigger(false);
        }

        fetchCourses();
    }, [user, trigger]);
              
    return (
        <CourseContext.Provider value={{ courses, isFetchingCourses, completeLesson }}>
            {children}
        </CourseContext.Provider>
    );
};

const useCourse = () => {

    const context = React.useContext(CourseContext);

    if(!context)
        throw new Error('useCourse must be used within a CourseProvider');
    
    return context;
};

export { CourseProvider, useCourse };
