'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ATSChecker } from '@/src/components/ATSChecker';
import { useResume } from '@/src/context/ResumeContext';

export default function ATSCheckerPage() {
  const router = useRouter();
  const { setActiveTab } = useResume();

  return (
    <ATSChecker
      onNavigateToBuilder={() => {
        setActiveTab('builder');
        router.push('/builder');
      }}
    />
  );
}
