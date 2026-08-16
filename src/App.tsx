import React, { useState } from 'react';
import { ResumeProvider, useResume } from './context/ResumeContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LandingPage } from './components/LandingPage';
import { ResumeBuilder } from './components/ResumeBuilder/ResumeBuilder';
import { ATSChecker } from './components/ATSChecker';
import { Dashboard } from './components/Dashboard';
import { CoverLetterBuilder } from './components/CoverLetterBuilder';
import { InterviewPrep } from './components/InterviewPrep';
import { LinkedInOptimizer } from './components/LinkedInOptimizer';
import { CareerCoach } from './components/CareerCoach';
import { TemplatesGallery } from './components/TemplatesGallery';
import { GuidesTips } from './components/GuidesTips';
import { AdminDashboard } from './components/AdminDashboard';
import { LoginPage } from './components/LoginPage';
import { Modals } from './components/Modals';
import { UploadResumeModal } from './components/UploadResumeModal';
import { CreditsModal } from './components/CreditsModal';
import { PaymentModal } from './components/PaymentModal';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

const AppContent: React.FC = () => {
  const { activeTab, setActiveTab, notifications, removeNotification } = useResume();
  const [authOpen, setAuthOpen] = useState(false);
  const [newResumeOpen, setNewResumeOpen] = useState(false);
  const [uploadResumeOpen, setUploadResumeOpen] = useState(false);
  const [creditsModalOpen, setCreditsModalOpen] = useState(false);

  // Payment Gateway Modal State (Number: 9035066863)
  const [paymentModalState, setPaymentModalState] = useState<{
    isOpen: boolean;
    planName: string;
    amountINR: number;
    creditsAwarded: number;
    planTier?: 'Pro' | 'Premium';
    billingPeriod?: 'monthly' | 'annual';
  }>({
    isOpen: false,
    planName: 'ResumeAI Pro Career Acceleration Plan',
    amountINR: 499,
    creditsAwarded: 500,
    planTier: 'Pro',
    billingPeriod: 'monthly',
  });

  const handleOpenPayment = (
    planName = 'ResumeAI Pro Career Acceleration Plan',
    amountINR = 499,
    creditsAwarded = 500,
    planTier: 'Pro' | 'Premium' = 'Pro',
    billingPeriod: 'monthly' | 'annual' = 'monthly'
  ) => {
    setPaymentModalState({
      isOpen: true,
      planName,
      amountINR,
      creditsAwarded,
      planTier,
      billingPeriod,
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 selection:bg-blue-500 selection:text-white">
      {/* Navigation Top Bar */}
      <Navbar
        onOpenAuth={() => setActiveTab('login')}
        onOpenNewResume={() => setNewResumeOpen(true)}
        onOpenUploadResume={() => setUploadResumeOpen(true)}
        onOpenCreditsModal={() => setCreditsModalOpen(true)}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {activeTab === 'landing' && (
          <LandingPage
            onStartBuilding={() => setActiveTab('builder')}
            onOpenATS={() => setActiveTab('ats-checker')}
            onOpenUploadResume={() => setUploadResumeOpen(true)}
            onOpenCreditsModal={() => setCreditsModalOpen(true)}
            onOpenAuth={() => setActiveTab('login')}
            onOpenPayment={handleOpenPayment}
          />
        )}

        {activeTab === 'builder' && (
          <ResumeBuilder
            onOpenATS={() => setActiveTab('ats-checker')}
            onOpenUploadResume={() => setUploadResumeOpen(true)}
            onOpenCreditsModal={() => setCreditsModalOpen(true)}
          />
        )}

        {(activeTab === 'ats-checker' || activeTab === 'job-matcher') && (
          <ATSChecker onNavigateToBuilder={() => setActiveTab('builder')} />
        )}

        {activeTab === 'dashboard' && (
          <Dashboard
            onOpenBuilder={() => setActiveTab('builder')}
            onOpenATS={() => setActiveTab('ats-checker')}
            onOpenNewResumeModal={() => setNewResumeOpen(true)}
            onOpenUploadResume={() => setUploadResumeOpen(true)}
            onOpenCreditsModal={() => setCreditsModalOpen(true)}
            onOpenAuth={() => setActiveTab('login')}
          />
        )}

        {activeTab === 'templates' && (
          <TemplatesGallery onNavigateToBuilder={() => setActiveTab('builder')} />
        )}

        {activeTab === 'cover-letters' && <CoverLetterBuilder />}

        {activeTab === 'interview-prep' && <InterviewPrep />}

        {activeTab === 'linkedin' && <LinkedInOptimizer />}

        {activeTab === 'career-assistant' && <CareerCoach />}

        {activeTab === 'compare' && (
          <Dashboard
            onOpenBuilder={() => setActiveTab('builder')}
            onOpenATS={() => setActiveTab('ats-checker')}
            onOpenNewResumeModal={() => setNewResumeOpen(true)}
            onOpenUploadResume={() => setUploadResumeOpen(true)}
            onOpenCreditsModal={() => setCreditsModalOpen(true)}
            onOpenAuth={() => setActiveTab('login')}
          />
        )}

        {activeTab === 'blog' && <GuidesTips />}

        {activeTab === 'admin' && <AdminDashboard />}

        {(activeTab === 'login' || activeTab === 'auth' || activeTab === 'signin' || activeTab === 'signup') && (
          <LoginPage
            onNavigateToBuilder={() => setActiveTab('builder')}
            onNavigateToDashboard={() => setActiveTab('dashboard')}
          />
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Global Modals */}
      <Modals
        authOpen={authOpen}
        onCloseAuth={() => setAuthOpen(false)}
        newResumeOpen={newResumeOpen}
        onCloseNewResume={() => setNewResumeOpen(false)}
        onNavigateToBuilder={() => setActiveTab('builder')}
        onOpenAdmin={() => setActiveTab('admin')}
        onOpenUploadResume={() => setUploadResumeOpen(true)}
      />

      <UploadResumeModal
        isOpen={uploadResumeOpen}
        onClose={() => setUploadResumeOpen(false)}
        onSuccessNavigate={(tab) => setActiveTab(tab)}
      />

      <CreditsModal
        isOpen={creditsModalOpen}
        onClose={() => setCreditsModalOpen(false)}
        onOpenPayment={handleOpenPayment}
      />

      {/* Indian Payment Gateway Modal (Pay to 9035066863) */}
      <PaymentModal
        isOpen={paymentModalState.isOpen}
        onClose={() => setPaymentModalState((prev) => ({ ...prev, isOpen: false }))}
        planName={paymentModalState.planName}
        amountINR={paymentModalState.amountINR}
        creditsAwarded={paymentModalState.creditsAwarded}
        planTier={paymentModalState.planTier}
        billingPeriod={paymentModalState.billingPeriod}
      />

      {/* Notification Toast System */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
        {notifications.map((n) => (
          <div
            key={n.id}
            className={`pointer-events-auto p-4 rounded-xl shadow-lg border flex items-start justify-between gap-3 animate-in slide-in-from-bottom-2 fade-in duration-200 ${
              n.type === 'success'
                ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                : n.type === 'error'
                ? 'bg-rose-50 border-rose-200 text-rose-900'
                : n.type === 'warning'
                ? 'bg-amber-50 border-amber-200 text-amber-900'
                : 'bg-blue-50 border-blue-200 text-blue-900'
            }`}
          >
            <div className="flex items-center gap-2 text-sm font-medium">
              {n.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
              {n.type === 'error' && <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />}
              {n.type === 'warning' && <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />}
              {n.type === 'info' && <Info className="w-4 h-4 text-blue-600 shrink-0" />}
              <span>{n.message}</span>
            </div>
            <button
              onClick={() => removeNotification(n.id)}
              className="text-slate-400 hover:text-slate-600 cursor-pointer p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export function App() {
  return (
    <ResumeProvider>
      <AppContent />
    </ResumeProvider>
  );
}

export default App;
