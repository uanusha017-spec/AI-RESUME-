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

  // Close user dropdown when clicking outside
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
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navItems = [
    { id: 'builder', label: 'Builder', icon: FileText },
    { id: 'ats-checker', label: 'ATS Checker', icon: CheckCircle2 },
    { id: 'job-matcher', label: 'Job Matcher', icon: Briefcase },
    { id: 'templates', label: 'Templates', icon: Layers },
    { id: 'cover-letters', label: 'Cover Letters', icon: Mail },
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

        {/* ZONE 2: DESKTOP NAV LINKS (hidden on mobile/tablet) */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors cursor-pointer ${
                activeTab === item.id
                  ? 'text-blue-600 bg-blue-50 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* ZONE 3: PRIMARY ACTIONS + AUTH + MOBILE TOGGLE */}
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

          {/* Auth Button / Profile Menu (Desktop) */}
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
                <span className="hidden lg:inline font-bold text-xs max-w-[80px] truncate">{user.name.split(' ')[0]}</span>
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

          {/* Mobile Menu Toggle Button */}
          <button
            data-mobile-toggle
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-700 hover:text-slate-900 hover:bg-slate-100 active:bg-slate-200 rounded-xl transition-colors cursor-pointer flex items-center justify-center min-w-[38px] min-h-[38px] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
            aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* MOBILE DRAWER / FLYOUT */}
      {mobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="md:hidden border-t border-slate-200 bg-white/98 backdrop-blur-md px-4 py-4 space-y-3 animate-in slide-in-from-top-2 duration-200 shadow-xl max-h-[calc(100vh-4rem)] overflow-y-auto"
        >
          {/* Mobile User Profile Header */}
          {user ? (
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center text-sm font-black shadow-xs shrink-0">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold text-slate-900 truncate">{user.name}</div>
                  <div className="text-[10px] text-slate-500 truncate">{user.email}</div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="px-1.5 py-0.2 bg-emerald-100 text-emerald-800 text-[9px] font-bold rounded">
                      Pro Active
                    </span>
                    <span className="font-mono text-[10px] font-bold text-amber-700">
                      ⚡ {aiCredits} Credits
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={handleSignOut}
                className="px-2.5 py-1.5 bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 text-xs font-bold rounded-xl flex items-center gap-1 cursor-pointer shrink-0 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Log Out</span>
              </button>
            </div>
          ) : (
            <div className="p-3 bg-blue-50/70 border border-blue-100 rounded-2xl flex items-center justify-between gap-2">
              <div className="text-xs text-blue-900 font-medium">
                Sign in to save multiple resumes & track ATS scores
              </div>
              <button
                onClick={() => {
                  setActiveTab('login');
                  setMobileMenuOpen(false);
                }}
                className="py-2 px-3.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shrink-0 shadow-xs cursor-pointer transition-all"
              >
                Log In
              </button>
            </div>
          )}

          {/* Quick Actions Grid for Mobile */}
          <div className="grid grid-cols-2 gap-2 pt-1">
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
          </div>

          {/* Navigation Links List */}
          <div className="pt-2 space-y-1 border-t border-slate-100">
            <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Navigation & Tools
            </div>

            <button
              onClick={() => {
                setActiveTab('dashboard');
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2.5 text-xs sm:text-sm font-semibold rounded-xl flex items-center gap-3 transition-colors cursor-pointer ${
                activeTab === 'dashboard'
                  ? 'text-blue-700 bg-blue-50 font-bold border border-blue-100'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <LayoutDashboard className="w-4 h-4 text-blue-600 shrink-0" />
              <span>My Resumes Dashboard</span>
            </button>

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
                  className={`w-full text-left px-3 py-2.5 text-xs sm:text-sm font-semibold rounded-xl flex items-center justify-between transition-colors cursor-pointer ${
                    isActive
                      ? 'text-blue-700 bg-blue-50 font-bold border border-blue-100'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <ItemIcon className={`w-4 h-4 shrink-0 ${isActive ? 'text-blue-600' : 'text-slate-500'}`} />
                    <span>{item.label}</span>
                  </span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                  )}
                </button>
              );
            })}
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
              Home & Features
            </button>
            <span className="text-[10px] text-slate-400 font-mono">ResumeAI Pro v2.5</span>
          </div>

        </div>
      )}
    </header>
  );
};

