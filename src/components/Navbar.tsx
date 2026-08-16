import React, { useState, useRef, useEffect } from 'react';
import { useResume } from '../context/ResumeContext';
import { Logo } from './Logo';
import {
  Sparkles,
  User,
  LogOut,
  ChevronDown,
  Menu,
  X,
  Plus,
  Upload,
  Gift,
  LayoutDashboard,
  LogIn,
  FileText,
  CheckCircle2,
  Briefcase,
  Layers,
  Mail,
  Compass
} from 'lucide-react';

interface NavbarProps {
  onOpenAuth: () => void;
  onOpenNewResume: () => void;
  onOpenUploadResume?: () => void;
  onOpenCreditsModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenAuth,
  onOpenNewResume,
  onOpenUploadResume,
  onOpenCreditsModal,
}) => {
  const { activeTab, setActiveTab, user, logout, aiCredits } = useResume();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Close user dropdown and mobile/tablet menu when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node) &&
        !(event.target as HTMLElement).closest('[data-mobile-toggle]')
      ) {
        setMobileMenuOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setUserMenuOpen(false);
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Close mobile/tablet menu on resize to desktop (1024px)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navItems = [
    { id: 'builder', label: 'Builder', icon: FileText, desc: 'Build & edit resume sections with AI' },
    { id: 'ats-checker', label: 'ATS Checker', icon: CheckCircle2, desc: 'Score keywords & compliance' },
    { id: 'job-matcher', label: 'Job Matcher', icon: Briefcase, desc: 'Compare against job descriptions' },
    { id: 'templates', label: 'Templates', icon: Layers, desc: 'ATS-certified formatting templates' },
    { id: 'cover-letters', label: 'Cover Letters', icon: Mail, desc: 'Craft targeted cover letters' },
  ];

  const handleSignOut = () => {
    setUserMenuOpen(false);
    setMobileMenuOpen(false);
    logout();
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2">
        
        {/* ZONE 1: BRAND TITLE */}
        <button
          onClick={() => {
            setActiveTab('landing');
            setMobileMenuOpen(false);
          }}
          className="flex items-center gap-2 text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-lg p-1 shrink-0"
        >
          <Logo size="sm" showText={true} />
        </button>

        {/* ZONE 2: DESKTOP NAV LINKS (Visible on lg 1024px+ screens) */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`px-3 py-1.5 rounded-xl text-xs xl:text-sm font-medium whitespace-nowrap transition-colors cursor-pointer ${
                activeTab === item.id
                  ? 'text-blue-600 bg-blue-50 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* ZONE 3: PRIMARY ACTIONS + AUTH + MOBILE/TABLET TOGGLE */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* AI Credits Interactive Pill */}
          <button
            onClick={onOpenCreditsModal}
            className="flex items-center gap-1 sm:gap-1.5 px-2 py-1.5 sm:px-2.5 sm:py-1.5 bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-900 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer group"
            title="Click to claim free AI credits"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600 group-hover:rotate-12 transition-transform shrink-0" />
            <span className="font-mono text-xs">{aiCredits}</span>
            <span className="hidden xl:inline text-amber-800">Credits</span>
            <span className="hidden sm:inline-block px-1.5 py-0.2 bg-amber-200 text-amber-950 text-[10px] font-black rounded uppercase">
              +Add
            </span>
          </button>

          {/* Upload Resume Button (Desktop & Tablet) */}
          <button
            onClick={onOpenUploadResume}
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 bg-white hover:bg-slate-50 border border-slate-300 hover:border-slate-400 text-slate-700 text-xs sm:text-sm font-semibold rounded-xl transition-all cursor-pointer shadow-xs whitespace-nowrap"
            title="Upload PDF, DOCX, TXT or JSON resume"
          >
            <Upload className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <span>Upload</span>
          </button>

          {/* Quick Create Resume */}
          <button
            onClick={onOpenNewResume}
            className="flex items-center gap-1 sm:gap-1.5 px-2.5 py-1.5 sm:px-3.5 sm:py-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-xs transition-all whitespace-nowrap cursor-pointer min-h-[36px]"
          >
            <Plus className="w-4 h-4 shrink-0" />
            <span className="hidden sm:inline">New Resume</span>
          </button>

          {/* Auth Button / Profile Menu (Desktop & Tablet) */}
          {user ? (
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-1.5 p-1 sm:px-2.5 sm:py-1.5 rounded-xl border border-slate-200 hover:border-slate-300 text-slate-700 text-xs sm:text-sm font-medium hover:bg-slate-50 transition-colors cursor-pointer min-h-[36px]"
                title="Account & Log Out"
              >
                <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center text-xs font-bold shadow-xs">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="hidden xl:inline font-bold text-xs max-w-[80px] truncate">{user.name.split(' ')[0]}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {/* USER PROFILE DROPDOWN MENU */}
              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-60 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-50 animate-in fade-in slide-in-from-top-2 space-y-1">
                  <div className="px-3 py-2.5 bg-slate-50 rounded-xl border border-slate-100 mb-1 space-y-1">
                    <div className="font-bold text-xs text-slate-900 truncate">{user.name}</div>
                    <div className="text-[11px] text-slate-500 truncate">{user.email}</div>
                    <div className="flex items-center gap-1.5 pt-1">
                      {user.provider === 'linkedin' ? (
                        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-[#0A66C2]/10 text-[#0A66C2] text-[10px] font-bold rounded">
                          <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 24 24">
                            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.6a1.65 1.65 0 1 0 0 3.3 1.65 1.65 0 0 0 0-3.3Z"/>
                          </svg>
                          LinkedIn
                        </span>
                      ) : (
                        <span className="px-1.5 py-0.5 bg-slate-200 text-slate-700 text-[10px] font-bold rounded">
                          Email
                        </span>
                      )}
                      <span className="px-1.5 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded">
                        Pro Tier
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setActiveTab('dashboard');
                      setUserMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 hover:text-slate-900 rounded-lg flex items-center gap-2 cursor-pointer transition-colors"
                  >
                    <LayoutDashboard className="w-3.5 h-3.5 text-blue-600" />
                    <span>My Resumes Dashboard</span>
                  </button>

                  <button
                    onClick={() => {
                      setActiveTab('login');
                      setUserMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 hover:text-slate-900 rounded-lg flex items-center gap-2 cursor-pointer transition-colors"
                  >
                    <User className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Account Profile</span>
                  </button>

                  <button
                    onClick={() => {
                      if (onOpenCreditsModal) onOpenCreditsModal();
                      setUserMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs font-semibold text-amber-900 bg-amber-50/70 hover:bg-amber-100 rounded-lg flex items-center justify-between cursor-pointer transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                      <span>Free Credits</span>
                    </span>
                    <span className="font-mono font-bold text-[11px]">{aiCredits}</span>
                  </button>

                  <div className="pt-1 border-t border-slate-100">
                    <button
                      onClick={handleSignOut}
                      className="w-full text-left px-3 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-lg flex items-center gap-2 cursor-pointer transition-colors"
                    >
                      <LogOut className="w-3.5 h-3.5 text-rose-600" />
                      <span>Log Out / Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-1 sm:gap-1.5">
              <button
                onClick={() => setActiveTab('login')}
                className="px-2.5 py-1.5 sm:px-3 sm:py-2 text-xs sm:text-sm font-semibold text-slate-700 hover:text-slate-900 border border-slate-200 hover:bg-slate-50 rounded-xl transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5"
              >
                <LogIn className="w-3.5 h-3.5 text-blue-600" />
                <span>Log In</span>
              </button>
            </div>
          )}

          {/* Mobile & Tablet Menu Toggle Button (Visible on < lg screens) */}
          <button
            data-mobile-toggle
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-700 hover:text-slate-900 hover:bg-slate-100 active:bg-slate-200 rounded-xl transition-colors cursor-pointer flex items-center justify-center min-w-[38px] min-h-[38px] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
            aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* MOBILE & TABLET DRAWER / FLYOUT */}
      {mobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="lg:hidden border-t border-slate-200 bg-white/98 backdrop-blur-md px-4 sm:px-6 py-4 space-y-4 animate-in slide-in-from-top-2 duration-200 shadow-2xl max-h-[calc(100vh-4rem)] overflow-y-auto"
        >
          {/* User Profile Header for Mobile / Tablet */}
          {user ? (
            <div className="p-3 sm:p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center text-sm font-black shadow-xs shrink-0">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <div className="text-xs sm:text-sm font-bold text-slate-900 truncate">{user.name}</div>
                  <div className="text-[11px] text-slate-500 truncate">{user.email}</div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="px-1.5 py-0.2 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded">
                      Pro Active
                    </span>
                    <span className="font-mono text-[11px] font-bold text-amber-700">
                      ⚡ {aiCredits} Credits
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={handleSignOut}
                className="px-3 py-2 bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer shrink-0 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Log Out</span>
              </button>
            </div>
          ) : (
            <div className="p-3 sm:p-4 bg-blue-50/80 border border-blue-200 rounded-2xl flex items-center justify-between gap-3">
              <div className="text-xs sm:text-sm text-blue-900 font-medium">
                Sign in to save multiple resumes, access ATS scores, and sync progress
              </div>
              <button
                onClick={() => {
                  setActiveTab('login');
                  setMobileMenuOpen(false);
                }}
                className="py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold rounded-xl shrink-0 shadow-xs cursor-pointer transition-all"
              >
                Log In / Register
              </button>
            </div>
          )}

          {/* Quick Actions Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            <button
              onClick={() => {
                if (onOpenUploadResume) onOpenUploadResume();
                setMobileMenuOpen(false);
              }}
              className="py-2.5 px-3 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-800 text-xs font-bold rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-colors border border-slate-200"
            >
              <Upload className="w-4 h-4 text-blue-600 shrink-0" />
              <span>Upload Resume</span>
            </button>

            <button
              onClick={() => {
                if (onOpenCreditsModal) onOpenCreditsModal();
                setMobileMenuOpen(false);
              }}
              className="py-2.5 px-3 bg-amber-50 hover:bg-amber-100 active:bg-amber-200 border border-amber-300 text-amber-900 text-xs font-bold rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              <Gift className="w-4 h-4 text-amber-600 shrink-0" />
              <span>+ Claim Credits</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('dashboard');
                setMobileMenuOpen(false);
              }}
              className="col-span-2 sm:col-span-1 py-2.5 px-3 bg-blue-50 hover:bg-blue-100 active:bg-blue-200 border border-blue-200 text-blue-800 text-xs font-bold rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              <LayoutDashboard className="w-4 h-4 text-blue-600 shrink-0" />
              <span>My Resumes</span>
            </button>
          </div>

          {/* Tablet & Mobile Navigation Links Grid */}
          <div className="pt-2 space-y-2 border-t border-slate-100">
            <div className="px-1 text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
              <span>Resume Tools & Features</span>
              <span className="hidden sm:inline text-[10px] text-slate-400 lowercase font-normal">tap to open</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {navItems.map((item) => {
                const ItemIcon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`text-left p-3 rounded-xl flex items-center justify-between transition-all cursor-pointer border ${
                      isActive
                        ? 'text-blue-700 bg-blue-50/90 font-bold border-blue-300 shadow-xs'
                        : 'text-slate-700 hover:bg-slate-50 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                        isActive ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'
                      }`}>
                        <ItemIcon className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs sm:text-sm font-bold truncate">{item.label}</div>
                        <div className="text-[10px] text-slate-400 truncate hidden sm:block">{item.desc}</div>
                      </div>
                    </div>
                    {isActive && (
                      <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bottom Info / Home link */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 px-1">
            <button
              onClick={() => {
                setActiveTab('landing');
                setMobileMenuOpen(false);
              }}
              className="hover:text-blue-600 font-medium py-1"
            >
              ← Back to Home
            </button>
            <span className="text-[10px] text-slate-400 font-mono">ResumeAI Pro • Tablet & Mobile Optimized</span>
          </div>

        </div>
      )}
    </header>
  );
};


