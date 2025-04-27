'use client';

import { ICourse } from '@/models/Course';
import { ISurvey } from '@/models/Survey';
import { IUser } from '@/models/User';
import { useUser } from '@auth0/nextjs-auth0';
import React, { useState, useEffect } from 'react';

interface DataContextProps {
    isLoading: boolean;
    user: IUser | undefined;
    courses: ICourse[];
    survey: ISurvey | undefined;
    updateSurvey: (survey: object) => void;
}

const DataContext = React.createContext<DataContextProps | undefined>(undefined);

const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const { user: auth0User } = useUser();

    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState<IUser | undefined>(undefined);
    const [courses, setCourses] = useState<ICourse[]>([]);
    const [survey, setSurvey] = useState<ISurvey | undefined>(undefined);
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
            setSurvey(await response.json());
        else
            throw new Error('Failed to update survey');
    };

    useEffect(() => {

        if(!auth0User || !auth0User.sub)
        {
            setUser(undefined);
            setCourses([]);
            setIsLoading(false);
            return;
        }
       
        const callback = async () => {

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
                const { user, courses } = await res.json();

                setUser(user);
                setCourses(courses);
                setSurvey(user.survey);
            }
            else
            {
                setUser(undefined);
                setCourses([]);
                throw new Error('Failed to fetch user and courses');
            }
            setIsLoading(false);
        }

        callback();

    }, [auth0User]);

    return (
        <DataContext.Provider value={{ user, courses, isLoading, survey, updateSurvey }}>
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