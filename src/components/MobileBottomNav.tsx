import React from 'react';
import { useResume } from '../context/ResumeContext';
import {
  Home,
  FileText,
  Target,
  Mail,
  User,
  Plus,
  Layers,
  Sparkles,
} from 'lucide-react';

interface MobileBottomNavProps {
  onOpenNewResume: () => void;
  onOpenQuickSheet: () => void;
  onOpenCreditsModal: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  onOpenNewResume,
  onOpenQuickSheet,
  onOpenCreditsModal,
}) => {
  const { activeTab, setActiveTab, aiCredits, user } = useResume();

  const handleTabClick = (tabId: string) => {
    // Haptic vibration feedback for mobile devices
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(12);
      } catch {
        // ignore if not supported
      }
    }
    setActiveTab(tabId);
  };

  const navItems = [
    { id: 'landing', label: 'Home', icon: Home },
    { id: 'builder', label: 'Builder', icon: FileText },
    // Center action will be rendered separately
    { id: 'ats-checker', label: 'ATS Audit', icon: Target },
    { id: 'cover-letters', label: 'Letters', icon: Mail },
    { id: 'dashboard', label: user ? 'Account' : 'Login', icon: User },
  ];

  return (
    <nav
      aria-label="Mobile Navigation Dock"
      className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-slate-200/90 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] pb-[env(safe-area-inset-bottom,0px)]"
    >
      <div className="max-w-md mx-auto px-3 h-16 flex items-center justify-around relative">
        
        {/* Tab 1: Home */}
        <button
          onClick={() => handleTabClick('landing')}
          className={`flex flex-col items-center justify-center flex-1 py-1 transition-all cursor-pointer ${
            activeTab === 'landing' ? 'text-blue-600 font-bold scale-105' : 'text-slate-500 hover:text-slate-800 font-medium'
          }`}
        >
          <Home className={`w-5 h-5 transition-transform ${activeTab === 'landing' ? 'stroke-[2.5]' : 'stroke-2'}`} />
          <span className="text-[10px] mt-0.5 tracking-tight">Home</span>
        </button>

        {/* Tab 2: Resume Builder */}
        <button
          onClick={() => handleTabClick('builder')}
          className={`flex flex-col items-center justify-center flex-1 py-1 transition-all cursor-pointer relative ${
            activeTab === 'builder' ? 'text-blue-600 font-bold scale-105' : 'text-slate-500 hover:text-slate-800 font-medium'
          }`}
        >
          <FileText className={`w-5 h-5 transition-transform ${activeTab === 'builder' ? 'stroke-[2.5]' : 'stroke-2'}`} />
          <span className="text-[10px] mt-0.5 tracking-tight">Builder</span>
        </button>

        {/* Center Floating Quick Action Button */}
        <div className="flex-1 flex items-center justify-center -mt-5">
          <button
            onClick={() => {
              if (typeof window !== 'undefined' && 'vibrate' in navigator) {
                navigator.vibrate(20);
              }
              onOpenQuickSheet();
            }}
            className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-600 via-indigo-600 to-blue-500 text-white shadow-lg shadow-blue-500/30 flex items-center justify-center active:scale-95 transition-transform cursor-pointer border-2 border-white focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-400"
            aria-label="Quick Action Menu"
            title="Create or Upload Resume"
          >
            <Plus className="w-6 h-6 stroke-[2.5]" />
          </button>
        </div>

        {/* Tab 3: ATS Score & Audit */}
        <button
          onClick={() => handleTabClick('ats-checker')}
          className={`flex flex-col items-center justify-center flex-1 py-1 transition-all cursor-pointer relative ${
            activeTab === 'ats-checker' || activeTab === 'job-matcher'
              ? 'text-blue-600 font-bold scale-105'
              : 'text-slate-500 hover:text-slate-800 font-medium'
          }`}
        >
          <Target className={`w-5 h-5 transition-transform ${activeTab === 'ats-checker' || activeTab === 'job-matcher' ? 'stroke-[2.5]' : 'stroke-2'}`} />
          <span className="text-[10px] mt-0.5 tracking-tight">ATS Audit</span>
        </button>

        {/* Tab 4: Dashboard / Account */}
        <button
          onClick={() => handleTabClick(user ? 'dashboard' : 'login')}
          className={`flex flex-col items-center justify-center flex-1 py-1 transition-all cursor-pointer relative ${
            activeTab === 'dashboard' || activeTab === 'login'
              ? 'text-blue-600 font-bold scale-105'
              : 'text-slate-500 hover:text-slate-800 font-medium'
          }`}
        >
          <User className={`w-5 h-5 transition-transform ${activeTab === 'dashboard' || activeTab === 'login' ? 'stroke-[2.5]' : 'stroke-2'}`} />
          <span className="text-[10px] mt-0.5 tracking-tight">
            {user ? 'Account' : 'Log In'}
          </span>
        </button>

      </div>
    </nav>
  );
};
