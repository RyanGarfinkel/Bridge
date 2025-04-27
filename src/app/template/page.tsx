'use client';

import { Button } from '@/components/ui/button';
import { useData } from '@/context/DataProvider';
import { ICourse } from '@/models/Course';
import { set } from 'mongoose';
import { useRouter } from 'next/navigation'; // Correct import for client components
import { useEffect, useState } from 'react';

export default function CourseDescription() {
  const router = useRouter();
  const {courses} = useData();
  const [course, setCourse] = useState<ICourse>();

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const unit = queryParams.get('unit');
    
    if(!unit)
      console.log('No unit selected');
    else
    {
      console.log('unit passed in', unit)

      const course = courses.find((course) => course.title.toLowerCase().replaceAll(' ', '-') === unit);

      if(!course)
        console.log('No course found');
      else
        setCourse(course as ICourse);
    }
  }, [courses, router]);

  return (
    <div
      style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      padding: '20px',
      fontFamily: 'sans-serif',
      textAlign: 'center',
      gap: '20px',
      width: '100%',
      maxWidth: '800px',
      margin: '0 auto',
      }}
    >
      {/* Back Button */}
      <div
      style={{
        alignSelf: 'flex-start',
        marginBottom: '5px', // Add spacing below the button
      }}
      >
      <Button variant="outline" onClick={() => router.push('/dashboard')}>
        Back to Dashboard
      </Button>
      </div>

      {/* Course Title */}
      <h1 style={{ fontSize: '3rem', fontWeight: 'bold' }}>
      {course ? course.title.toUpperCase() : 'Loading...'}
      </h1>

      {/* Curriculum Section */}
      <div style={{ textAlign: 'left', width: '100%' }}>
      <h2 style={{ fontSize: '2rem', marginBottom: '10px' }}>Curriculum:</h2>
      {course && course.lessons && course.lessons.length > 0 ? (
        course.lessons.map((lesson, index) => (
        <li key={index}>
          {lesson.title}{' '}
          {!lesson.isCompleted ? (
            <span style={{ color: 'orange', marginLeft: '10px' }}>⚠️</span>
          ) : (
            <span style={{ color: 'green', marginLeft: '10px' }}>✔️</span>
          )}
        </li>
        ))
      ) : (
        <li>No lessons available</li>
      )}
      </div>

      {course && course.lessons && course.lessons.length > 0 && (
      <Button
        variant="outline"
        onClick={() => {
        const nextLesson = course.lessons.find((lesson) => !lesson.isCompleted);
        if (nextLesson) {
          router.push(
          `/course?unit=${course.title.toLowerCase().replaceAll(' ', '-')}&lesson=${nextLesson.title}`
          );
        } else {
          console.log('All lessons are complete');
        }
        }}
      >
        Start the next lesson
      </Button>
      )}
    </div>
  );
}