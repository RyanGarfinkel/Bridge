'use client';

import { useUser } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Home = () => {
  const { user, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {

    if(isLoading)
      return;

    if(user)
      router.push('/dashboard');
  }, [user, isLoading, router]);

  return (
    <div className='flex flex-col items-center justify-center h-screen w-screen text-center font-sans gap-12 p-8'>
      <Image src='/icon.png' alt='Bridgly Logo' width={96} height={96} className='w-24 h-24' />
      <h1 className='text-7xl font-extrabold text-gray-800 m-0 leading-tight'>
        Welcome to <span className='text-blue-600'>Bridgly</span>
      </h1>
      <p className='text-2xl text-gray-700 max-w-3xl leading-relaxed'>
        Empowering students worldwide with our AI-powered college readiness program. Transition to university life with confidence and ease.
      </p>
      <div className='flex gap-8'>
        <Link
          href='/auth/login'
          className='text-xl sm:text-3xl px-6 sm:px-12 py-4 sm:py-6 bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 focus:ring-4 focus:ring-blue-300 rounded-full inline-block text-center'
        >
          Log In
        </Link>
        <Link
          href='/auth/login'
          className='text-xl sm:text-3xl px-6 sm:px-12 py-4 sm:py-6 border-2 border-blue-600 text-blue-600 shadow-lg hover:bg-blue-50 hover:shadow-xl transition-transform transform hover:scale-105 focus:ring-4 focus:ring-blue-300 rounded-full inline-block text-center'
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Home;
