'use client';

import { Geist, Geist_Mono } from 'next/font/google';
import { useUser } from '@auth0/nextjs-auth0';
import { DataProvider } from '@/context/DataProvider';
import { CourseProvider } from '@/context/CourseProvider';
import './globals.css';
import Navbar from '@/components/Navbar';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {

  const { user } = useUser();

  return (
    <html lang="en">
      <head>
        <title>Bridgly</title>
        <link rel="icon" type="image/png" href="/icon.png" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <DataProvider>
          <CourseProvider>
              <div className='flex flex-col'>
                {
                  user && <Navbar />
                }
                { children }
              </div>
          </CourseProvider>
        </DataProvider>
      </body>
    </html>
  );
};

export default RootLayout;
