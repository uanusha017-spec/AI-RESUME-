'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { LandingPage } from '@/src/components/LandingPage';
import { useResume } from '@/src/context/ResumeContext';

export default function HomePage() {
  const router = useRouter();
  const { setActiveTab } = useResume();

  return (
    <LandingPage
      onStartBuilding={() => {
        setActiveTab('builder');
        router.push('/builder');
      }}
      onOpenATS={() => {
        setActiveTab('ats-checker');
        router.push('/ats-checker');
      }}
      onOpenUploadResume={() => {}}
      onOpenCreditsModal={() => {}}
      onOpenAuth={() => router.push('/dashboard')}
      onOpenPayment={() => {}}
    />
  );
}
