'use client';

import { useUser } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function Home() {
  const { user, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [user, router]);

  if (isLoading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  // While the redirect happens, you can show a tiny loading indicator
  if (user) {
    return (
      <div>
        <p>Redirecting to dashboard...</p>
      </div>
    );
  }

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
        Log In/sign up
      </a>
    </Button>
  </div>
  );
}
