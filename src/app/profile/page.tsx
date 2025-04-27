'use client';

import { Button } from '@/components/ui/button';
import { useData } from '@/context/DataProvider';
import { useUser } from '@auth0/nextjs-auth0';
import Link from 'next/link';
import Image from 'next/image';

export default function UserProfile() {
  const { user, isLoading } = useData(); // Assuming `surveyCompleted` is part of your context
  const { user: auth0User } = useUser();

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen w-screen font-sans text-center">
        <h1 className="text-3xl">Loading...</h1>
      </div>
    );

  if (user)
    return (
      <div className="flex justify-center items-center h-screen w-screen font-sans text-center flex-col gap-5 m-0 p-0 box-border">
        {/* Profile Picture */}
        <img
          src={auth0User?.picture || '/default-profile.png'}
          onError={(e) => {
            e.currentTarget.src = '/default-profile.png'; // Fallback image
          }}
          className="rounded-full w-36 h-36 object-cover"
          alt={`${user.firstname}'s profile`}
          width={144} // Optional: Sets the width
          height={144} // Optional: Sets the height
        />

        {/* User Title */}
        <h1 className="text-2xl font-bold">Hello, {user.firstname}.</h1>

        {/* Survey Button */}
        <Button variant="outline" asChild>
          <Link href="/survey">{user.hasCompletedSurvey ? 'Redo Survey' : 'Complete Survey'}</Link>
        </Button>
      </div>
    );

  return (
    <div className='flex justify-center items-center h-screen w-screen font-sans text-center'>
        <h1 style={{ fontSize: '3rem' }}>Loading...</h1>
      </div>
  );
}
