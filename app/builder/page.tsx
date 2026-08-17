'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ResumeBuilder } from '@/src/components/ResumeBuilder/ResumeBuilder';
import { useResume } from '@/src/context/ResumeContext';

export default function BuilderPage() {
  const router = useRouter();
  const { setActiveTab } = useResume();

  return (
    <ResumeBuilder
      onOpenATS={() => {
        setActiveTab('ats-checker');
        router.push('/ats-checker');
      }}
      onOpenUploadResume={() => {}}
      onOpenCreditsModal={() => {}}
    />
  );
}
