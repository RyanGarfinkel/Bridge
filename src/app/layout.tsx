'use client';

import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/app-sidebar'
import { useUser } from '@auth0/nextjs-auth0';
import { DataProvider } from '@/context/DataProvider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = useUser();

  return (

    <html lang="en">
      <head>
        <title>Bridgly</title>
        <link rel="icon" type="image/png" href="/icon.png" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <DataProvider>
          <SidebarProvider>
            { user && <AppSidebar />}
            { user && <SidebarTrigger />}
            {children}
          </SidebarProvider>
        </DataProvider>
      </body>
    </html>
  );
}
