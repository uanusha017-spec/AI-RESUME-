'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Dashboard } from '@/src/components/Dashboard';
import { useResume } from '@/src/context/ResumeContext';

export default function DashboardPage() {
  const router = useRouter();
  const { setActiveTab } = useResume();

  return (
    <Dashboard
      onNavigateToBuilder={() => {
        setActiveTab('builder');
        router.push('/builder');
      }}
      onOpenNewResume={() => {
        setActiveTab('builder');
        router.push('/builder');
      }}
      onOpenUploadResume={() => {}}
      onOpenCreditsModal={() => {}}
    />
  );
}
