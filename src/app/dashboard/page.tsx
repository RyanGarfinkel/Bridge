'use client';

import { Button } from '@/components/ui/button';
import { useData } from '@/context/DataProvider';
import { useEffect } from 'react';

export default function Home() {
  const { user, courses, isLoading, isFetchingCourses } = useData();

  useEffect(() => {
    if(!user && !isLoading)
      window.location.href = '/auth/login';
  }, [user, isLoading]);

  if(isFetchingCourses)
    return (
      <div className='flex justify-center items-center h-screen w-screen font-sans text-center'>
        <h1 style={{ fontSize: '3rem' }}>Loading...</h1>
      </div>
    );


  if(!user)
    return (
      <div className='flex justify-center items-center h-screen w-screen font-sans text-center'>
        <h1 style={{ fontSize: '3rem' }}>Loading...</h1>
      </div>
    );

  if(user && !user.hasCompletedSurvey)
    return (
      <div className='flex justify-center items-center h-screen w-screen font-sans text-center flex-col gap-5 m-0 p-0 box-border'>
        <h1 className="text-3xl">Welcome, {user.firstname + ' ' + user.lastname}.</h1>
        <h3 className="text-2xl">Please complete the survey to get started ✏️</h3>
        <Button variant="outline" asChild>
          <a href="/survey">Start Survey</a>
        </Button>
      </div>
    );

  console.log('Courses:', courses);
  console.log('User:', user);

  if(user && user.hasCompletedSurvey)
    return (
      <div className='flex justify-center items-center h-screen w-screen font-sans text-center flex-col gap-5 m-0 p-0 box-border'>
        <h1 className="text-3xl">Welcome, {user.firstname + ' ' + user.lastname}.</h1>
        <h3 className="text-2xl">Available Units 📚</h3>
        <div className="flex flex-col gap-2">
          {
            courses.map((course, i) => (
              <Button variant="outline" asChild key={i}>
                <a href={`/template?unit=${course.title.toLowerCase().replaceAll(' ', '-')}`}>{course.title.toUpperCase()}</a>
              </Button>
            ))
          }
        </div>
      </div>
    );
}
