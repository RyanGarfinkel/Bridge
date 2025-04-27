'use client';

import { Button } from '@/components/ui/button';
import { useData } from '@/context/DataProvider';
import { useUser } from '@auth0/nextjs-auth0';
import Link from 'next/link';
import Image from 'next/image';

export default function UserProfile() {
  const { user, isLoading } = useData();
  const { user: auth0User } = useUser();

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen w-screen font-sans text-center">
        <h1 className="text-3xl">Loading...</h1>
      </div>
    );

  if (user)
    console.log(user);

  if (user)
    return (
      <div className="flex justify-center items-center h-screen w-screen font-sans text-center flex-col gap-5 m-0 p-0 box-border">
        {/* Profile Picture */}
        <Image
          src={auth0User?.picture || '/default-profile.png'}
          onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) =>
          {
            e.currentTarget.src = '/default-profile.png';
          } }
          className="rounded-full w-36 h-36 object-cover" alt={''}        />

        {/* User Title */}
        <h1 className="text-2xl font-bold">Hello, {user.firstname}.</h1>

        {/* Survey Button */}
        <Button variant="outline" asChild>
          <Link href="/survey">
            {user.hasCompletedSurvey ? 'Redo Survey' : 'Complete Survey'}
          </Link>
        </Button>
      </div>
    );

  return (
    <div className='flex justify-center items-center h-screen w-screen font-sans text-center'>
        <h1 style={{ fontSize: '3rem' }}>Loading...</h1>
      </div>
  );
}
