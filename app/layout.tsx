import React from 'react';
import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'ResumeAI Pro - AI Resume Builder & ATS Score Optimizer',
  description: 'Build ATS-friendly, job-tailored resumes and cover letters in minutes with intelligent AI generation and STAR method coaching.',
  keywords: ['Resume Builder', 'ATS Resume', 'AI Resume Maker', 'Job Matcher', 'Cover Letter Generator'],
  authors: [{ name: 'ResumeAI Studio' }],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
  themeColor: '#2563EB',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full bg-slate-50">
      <body className="h-full antialiased font-sans text-slate-900 bg-slate-50 selection:bg-blue-600 selection:text-white">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
