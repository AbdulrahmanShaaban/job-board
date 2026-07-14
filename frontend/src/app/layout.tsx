import type { Metadata } from 'next';
import QueryProvider from '@/providers/QueryProvider';
import Navbar from '@/components/features/Navbar';
import './globals.css';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta-sans',
});

export const metadata: Metadata = {
  title: 'JobBoard - Find Your Dream Job',
  description: 'Browse and apply for jobs from top companies',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className={`${inter.variable} ${plusJakartaSans.variable} font-body-md bg-background text-on-background min-h-screen antialiased flex flex-col`}>
        <QueryProvider>
          <Navbar />
          <main className="flex-grow flex flex-col w-full px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto py-stack-lg gap-16">
            {children}
          </main>
        </QueryProvider>
      </body>
    </html>
  );
}
