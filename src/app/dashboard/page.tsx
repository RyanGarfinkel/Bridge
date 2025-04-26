'use client';

import { Button } from '@/components/ui/button';
import { useData } from '@/context/DataProvider';

export default function Home() {
  const { user, courses } = useData();

  if (user)
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center', // Centers horizontally
          alignItems: 'center', // Centers vertically
          height: '100vh', // Full viewport height
          width: '100vw', // Full viewport width
          fontFamily: 'sans-serif',
          textAlign: 'center',
          flexDirection: 'column', // Stack text and buttons vertically
          gap: '20px', // Add spacing between elements
          margin: 0, // Ensure no margin
          padding: 0, // Ensure no padding
          boxSizing: 'border-box', // Consistent box model
        }}
      >
        <h1 style={{ fontSize: '3rem' }}>Welcome, {user.firstname + ' ' + user.lastname}.</h1>
        <h3 style={{ fontSize: '2rem' }}>Available Units:</h3>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column', // Stack buttons vertically
            gap: '10px', // Add spacing between buttons
          }}
        >
            <Button variant="outline" asChild>
            <a href="/template?unit=academic-life-in-college">Academic Life in College</a>
            </Button>
            <Button variant="outline" asChild>
            <a href="/template?unit=mental-health">Mental Health</a>
            </Button>
            <Button variant="outline" asChild>
            <a href="/template?unit=healthy-relationships">Healthy Relationships</a>
            </Button>
            <Button variant="outline" asChild>
            <a href="/template?unit=drinking-and-substance-use">Drinking and Substance Use</a>
            </Button>
            <Button variant="outline" asChild>
            <a href="/template?unit=financial-literacy">Financial Literacy</a>
            </Button>
        </div>
      </div>
    );

  return (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      width: '100vw',
      flexDirection: 'column',
      textAlign: 'center',
      fontFamily: 'sans-serif',
      gap: '20px',
      padding: '20px',
      boxSizing: 'border-box',
    }}
  >
    <h1 style={{ fontSize: '3rem', margin: 0 }}>Welcome to Bridgly 🌉</h1>
    <p style={{ fontSize: '1.5rem', maxWidth: '600px' }}>
    Our AI-powered college readiness training program is designed to help incoming university students transition smoothly into academic life, with lesson plans custom tailored to their interests and study style.
    </p>
    <Button variant="default" asChild>
      <a href="/auth/login" style={{ fontSize: '1.25rem', padding: '10px 20px' }}>
        Log In
      </a>
    </Button>
  </div>
  );
}
