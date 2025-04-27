'use client';

import { ICourse, ILesson } from '@/models/Course';
import { IUser } from '@/models/User';
import { useUser } from '@auth0/nextjs-auth0';
import React, { useState, useEffect } from 'react';

interface DataContextProps {
    isLoading: boolean;
    user: IUser | undefined;
    courses: ICourse[];
    isFetchingCourses: boolean;
    updateSurvey: (survey: object) => void;
    completeLesson: (course: ICourse, lesson: ILesson) => void;
}

const DataContext = React.createContext<DataContextProps | undefined>(undefined);

const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const { user: auth0User } = useUser();

    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState<IUser | undefined>(undefined);
    const [courses, setCourses] = useState<ICourse[]>([]);
    const [isFetchingCourses, setIsFetchingCourses] = useState(false);
    const updateSurvey = async (survey: object) => {
        const response = await fetch('/api/survey', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                auth0Id: auth0User?.sub,
                survey: survey,
            }),
        });

        if(response.ok)
            fetchCourses();
        else
            throw new Error('Failed to update survey');
    }; 

    useEffect(() => {

        if(!auth0User)
        {
        
            setUser(undefined);
            setCourses([]);

            setIsLoading(false);
            return;
        }
        
        const fetchUser = async () => {

            setIsLoading(true);

            const res = await fetch('/api/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    auth0Id: auth0User?.sub,
                    firstname: auth0User?.given_name,
                    lastname: auth0User?.family_name,
                }),
            });

            if(res.ok)
            {
                const user = await res.json();
                setUser(user);

                if(user.hasCompletedSurvey)
                    fetchCourses();
                else
                    setCourses([]);
            }
            else
                throw new Error('Failed to fetch user');

            setIsLoading(false);
        }

        fetchUser();
        
    }, [auth0User]);

    const fetchCourses = async () => {

        if(!auth0User || !auth0User.sub)
            return;

        setIsFetchingCourses(true);
        const res = await fetch('/api/courses', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                auth0Id: auth0User?.sub,
            }),
        });

        setIsFetchingCourses(false);

        if(res.ok)
        {
            const courses = await res.json();
            setCourses(courses);
        }
        else
            throw new Error('Failed to fetch courses');
    }

    const completeLesson = async (course: ICourse, lesson: ILesson) => {

        const res = await fetch('/api/updateCourse', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                course: {
                    ...course,
                    lessons: course.lessons.map((l) => l.title === lesson.title ? { ...l, isCompleted: true } : l),
                },
            }),
        });

        if(res.ok)
        {
            const updatedCourse = await res.json();
            setCourses(courses.map((c) => c._id === updatedCourse._id ? updatedCourse : c));
        }
        else
            throw new Error('Failed to update course');
    };

    return (
        <DataContext.Provider value={{ user, courses, isLoading, updateSurvey, isFetchingCourses, completeLesson}}>
            {children}
        </DataContext.Provider>
    )
};

const useData = () => {
    const context = React.useContext(DataContext);

    if (!context)
        throw new Error('useData must be used within a DataProvider');
    
    return context;
};

export { DataProvider, useData };