'use client';

import { IUser } from '@/models/User';
import { useUser } from '@auth0/nextjs-auth0';
import React, { useState, useEffect } from 'react';

interface DataContextProps {
    isLoading: boolean;
    user: IUser | undefined;
    updateSurvey: (survey: object) => void;
}

const DataContext = React.createContext<DataContextProps | undefined>(undefined);

const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const { user: auth0User } = useUser();

    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState<IUser | undefined>(undefined);
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

        if(!response.ok)
        {
            const error = await response.json();
            console.error('Error updating survey:', error);
        }
        
    }; 

    useEffect(() => {

        if(!auth0User)
        {
        
            setUser(undefined);
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
            }
            else
                throw new Error('Failed to fetch user');

            setIsLoading(false);
        }

        fetchUser();
        
    }, [auth0User]);

    return (
        <DataContext.Provider value={{ user, isLoading, updateSurvey }}>
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