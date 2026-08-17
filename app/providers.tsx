'use client';

import React, { useState } from 'react';
import { ResumeProvider, useResume } from '@/src/context/ResumeContext';
import { Navbar } from '@/src/components/Navbar';
import { MobileBottomNav } from '@/src/components/MobileBottomNav';
import { Footer } from '@/src/components/Footer';
import { MobileAppInstallModal } from '@/src/components/MobileAppInstallModal';
import { UploadResumeModal } from '@/src/components/UploadResumeModal';
import { CreditsModal } from '@/src/components/CreditsModal';
import { PaymentModal } from '@/src/components/PaymentModal';

function AppLayoutShell({ children }: { children: React.ReactNode }) {
  const { isMobileAppMode } = useResume();
  const [installModalOpen, setInstallModalOpen] = useState(false);
  const [uploadResumeOpen, setUploadResumeOpen] = useState(false);
  const [creditsModalOpen, setCreditsModalOpen] = useState(false);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({ planName: 'Pro Tier', amount: 19, currency: 'USD' });

  return (
    <div className="min-h-screen min-h-[100dvh] bg-slate-50 flex flex-col font-sans text-slate-900">
      <Navbar
        onOpenAuth={() => {}}
        onOpenNewResume={() => {}}
        onOpenUploadResume={() => setUploadResumeOpen(true)}
        onOpenCreditsModal={() => setCreditsModalOpen(true)}
        onOpenInstallModal={() => setInstallModalOpen(true)}
      />

      <main className="flex-1 pb-[calc(5rem+env(safe-area-inset-bottom,0px))] lg:pb-0">
        {children}
      </main>

      {!isMobileAppMode && <Footer />}

      <MobileBottomNav />

      {/* Global Modals */}
      <MobileAppInstallModal
        isOpen={installModalOpen}
        onClose={() => setInstallModalOpen(false)}
      />

      <UploadResumeModal
        isOpen={uploadResumeOpen}
        onClose={() => setUploadResumeOpen(false)}
      />

      <CreditsModal
        isOpen={creditsModalOpen}
        onClose={() => setCreditsModalOpen(false)}
        onOpenPayment={(plan, amount, curr) => {
          setPaymentDetails({ planName: plan, amount, currency: curr });
          setCreditsModalOpen(false);
          setPaymentModalOpen(true);
        }}
      />

      <PaymentModal
        isOpen={paymentModalOpen}
        onClose={() => setPaymentModalOpen(false)}
        planName={paymentDetails.planName}
        amount={paymentDetails.amount}
        currency={paymentDetails.currency}
      />
    </div>
  );
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ResumeProvider>
      <AppLayoutShell>{children}</AppLayoutShell>
    </ResumeProvider>
  );
}
