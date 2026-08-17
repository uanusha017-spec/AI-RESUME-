'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { TemplatesGallery } from '@/src/components/TemplatesGallery';
import { useResume } from '@/src/context/ResumeContext';

export default function TemplatesPage() {
  const router = useRouter();
  const { setActiveTab } = useResume();

  return (
    <TemplatesGallery
      onSelectTemplate={() => {
        setActiveTab('builder');
        router.push('/builder');
      }}
    />
  );
}
