'use client';

import { Button } from '@/components/ui/button';
import { useData } from '@/context/DataProvider';
import { useEffect } from 'react';
import SurveyPrompt from '@/components/SurveyPrompt';
import Loading from '@/components/Loading';

export default function Home() {
  const { user, courses, isLoading, isFetchingCourses } = useData();

  useEffect(() => {
    if (!user && !isLoading)
      window.location.href = '/auth/login';
  }, [user, isLoading]);

  if (isFetchingCourses)
    return (
      <Loading />
    );

  if (!user)
    return (
      <div className='flex justify-center items-center h-screen w-screen font-sans text-center'>
        <h1 style={{ fontSize: '3rem' }}>Loading...</h1>
      </div>
    );

  if (user && !user.hasCompletedSurvey)
    return <SurveyPrompt firstname={user.firstname || ''} lastname={user.lastname || ''} />;

  if (user && user.hasCompletedSurvey)
    return (
      <div className="flex flex-col items-center justify-start min-h-screen w-full font-sans text-center gap-10 p-8 box-border">
        <header className="w-full max-w-4xl text-center">
          <h1 className="text-5xl font-extrabold mb-4">👋 Welcome, {user.firstname + ' ' + user.lastname}!</h1>
          <p className="text-xl text-gray-600">🎓 Here are your available courses. Start learning or continue where you left off!</p>
        </header>
        <h3 className="text-3xl font-semibold text-center mt-8">📚 Available Units</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-4xl mx-auto">
          {courses.map((course, i) => (
            <div
              key={i}
              className="border rounded-lg shadow-lg p-8 hover:shadow-2xl transition-shadow flex flex-col justify-between text-center"
            >
              <h4 className="text-2xl font-medium mb-6">📖 {course.title.toUpperCase()}</h4>
              <p className="text-base text-gray-500 mb-6">
                {course.isCompleted ? '✅ Completed' : '⏳ In Progress'}
              </p>
              <Button variant="outline" asChild>
                <a href={`/template?unit=${course.title.toLowerCase().replaceAll(' ', '-')}`}>
                  {course.isCompleted ? '🔄 Review Unit' : '🚀 Start Unit'}
                </a>
              </Button>
            </div>
          ))}
        </div>
      </div>
    );

  return null;
}
