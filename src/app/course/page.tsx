'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useData } from '@/context/DataProvider';
import { ICourse, ILesson } from '@/models/Course';

export default function StudyAndQuizPage() {
  const [currentPart, setCurrentPart] = useState(1); // State to track the current part (1 or 2)
  const [urlParam, setUrlParam] = useState<string | null>(null); // State to store the URL parameter
  const searchParams = useSearchParams(); // Hook to access URL parameters
  const {courses, completeLesson} = useData();

    const [course, setCourse] = useState<ICourse>();
    const [lesson, setLesson] = useState<ILesson>();

  useEffect(() => {

    const queryParams = new URLSearchParams(window.location.search);
    const courseName = queryParams.get("unit")?.replace(/-/g, ' ').replace(/^\w/, char => char.toUpperCase());
    const lessonName = queryParams.get("lesson")?.replace(/^\w/, char => char.toUpperCase());
    const courseObj = courses.find((course) => course.title === courseName);
    console.log(courseName)
    console.log(courses)
    console.log(courseObj)
    console.log(lessonName)
    setCourse(courseObj as ICourse);
    setLesson(courseObj?.lessons.find((lesson) => lesson.title.trim() === lessonName) as ILesson);
  }, []);

  useEffect(() => {
    // Get the "unit" parameter from the URL
    const lesson = searchParams ? searchParams.get('lesson') : null;
    setUrlParam(lesson ? lesson.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase()) : null); // Store the formatted parameter in state

  }, [searchParams]);

  const handleNext = () => {
    setCurrentPart(2); // Move to the second part
  };

  const handleAnswer = (answer: string) => {
    alert(`You selected: ${answer}`);
    // Add logic to handle the selected answer
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        width: '100vw',
        fontFamily: 'sans-serif',
        textAlign: 'center',
        gap: '20px',
        padding: '20px',
        boxSizing: 'border-box',
      }}
    >
      {currentPart === 1 && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px 20px',
            boxSizing: 'border-box',
            textAlign: 'center',
          }}
        >
          {/* Part 1: Notes and Lectures */}
          <h1 style={{ fontSize: '2.5rem', marginBottom: '20px' }}></h1>
          <p style={{ fontSize: '1.25rem', lineHeight: '1.8', maxWidth: '600px' }}>
            Welcome to the study section! On the next page there will be a short multiple-choice quiz.
          </p>
          <h2 style={{ fontSize: '2rem', marginBottom: '10px' }}>
            Course: {course?.title || 'Unknown Course'}
            <br />
            Lesson: {lesson?.title || 'Unknown Lesson'}
          </h2>
          <div
            style={{
              textAlign: 'left',
              maxWidth: '600px',
              margin: '0 auto',
              overflowY: 'auto',
              maxHeight: '60vh',
              padding: '10px',
              boxSizing: 'border-box',
            }}
          >
            {lesson?.content ? (
              <div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>Lesson Content:</h3>
                <p style={{ fontSize: '1.25rem', lineHeight: '1.8' }}>
                  {lesson.content.replace(/['"\\/]/g, '')}
                </p>
              </div>
            ) : (
              <p style={{ fontSize: '1.25rem', lineHeight: '1.8' }}>No content available for this lesson.</p>
            )}
          </div>
          <button
            onClick={handleNext}
            style={{
              marginTop: '20px',
              padding: '10px 20px',
              backgroundColor: '#007bff',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '1.25rem',
            }}
          >
            Next →
          </button>
        </div>
      )}

      {currentPart === 2 && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start', // Align content to the top
            overflowY: 'auto', // Enable scrolling
            height: '100%', // Take full height of the container
            padding: '10px',
            boxSizing: 'border-box',
            width: '100%',
            textAlign: 'center', // Center text content
          }}
        >
          {/* Part 2: Multiple Choice Quiz */}
          <h1 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>Quiz</h1>
          {lesson?.questions && lesson.questions.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%', maxWidth: '600px', alignItems: 'center' }}>
              {lesson.questions.map((question, index) => (
            <div key={index} style={{ marginBottom: '40px', textAlign: 'center', width: '100%' }}>
              <p style={{ fontSize: '1.5rem', marginBottom: '20px' }}>{question.question}</p>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                  gap: '15px',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {question.answers.map((option, optionIndex) => (
                  <button
                key={optionIndex}
                onClick={() => {
                  if (option.isCorrect) {
                    alert('Correct!');
                  } else {
                    alert('Wrong!');
                  }
                }}
                style={{
                  padding: '15px',
                  backgroundColor: '#f0f0f0',
                  border: '1px solid #ccc',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '1.25rem',
                  textAlign: 'center',
                }}
                  >
                {option.text}
                  </button>
                ))}

              </div>
            </div>
              ))}

            <button
            onClick={() => {
                // Mark the lesson as complete
                if (lesson) {
                    completeLesson(course!, lesson) // Update the isCompleted property
                    alert('Lesson marked as complete!');
                }
                // Navigate back to the template page with the unit parameter
                const unitParam = course?.title?.replace(/\s+/g, '-').toLowerCase(); // Format the course title for the URL
                window.location.href = `/template?unit=${unitParam}`; // Replace '/template' with the actual path to your template page
            }}
            style={{
                marginTop: '20px',
                padding: '10px 20px',
                backgroundColor: '#28a745',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '1.25rem',
            }}
            >
            Complete Lesson & Return to Unit
            </button>
            </div>
            
          ) : (
            <p style={{ fontSize: '1.25rem', lineHeight: '1.8', textAlign: 'center' }}>No questions available for this lesson.</p>
          )}
        </div>
      )}
    </div>
  );
}
