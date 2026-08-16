import React, { useState } from 'react';
import { useResume } from '../context/ResumeContext';
import { Logo } from './Logo';
import {
  Sparkles,
  CheckCircle2,
  Lock,
  Mail,
  User,
  Briefcase,
  ArrowRight,
  ShieldCheck,
  Zap,
  Star,
  Layers,
  LogOut,
  ArrowLeft,
  FileCheck,
  Eye,
  EyeOff
} from 'lucide-react';
import confetti from 'canvas-confetti';
import heroBannerImg from '../assets/images/hero_career_banner_1786886172807.jpg';

interface LoginPageProps {
  onNavigateToBuilder?: () => void;
  onNavigateToDashboard?: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  onNavigateToBuilder,
  onNavigateToDashboard,
}) => {
  const { user, login, logout, setActiveTab, addNotification } = useResume();

  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [targetRole, setTargetRole] = useState('Senior Software Engineer');
  const [showPassword, setShowPassword] = useState(false);
  const [isLinkedInConnecting, setIsLinkedInConnecting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Handle standard email auth
  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      addNotification('Please enter a valid email address.', 'warning');
      return;
    }
    if (!password || password.length < 4) {
      addNotification('Password must be at least 4 characters.', 'warning');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const displayName = name.trim() || email.split('@')[0];
      login(email, displayName, targetRole || 'Professional', 'email');
      
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.6 },
      });

      if (onNavigateToDashboard) {
        onNavigateToDashboard();
      } else {
        setActiveTab('dashboard');
      }
    }, 400);
  };

  // Handle LinkedIn OAuth
  const handleLinkedInAuth = (customName?: string, customRole?: string) => {
    setIsLinkedInConnecting(true);
    setTimeout(() => {
      setIsLinkedInConnecting(false);
      const displayName = customName || (name.trim() ? name.trim() : 'Sarah Chen');
      const userRole = customRole || (targetRole.trim() ? targetRole.trim() : 'Senior Full-Stack Engineer');
      const userEmail = email.trim() || `${displayName.toLowerCase().replace(/\s+/g, '.')}@example.com`;
      const linkedInUrl = `https://www.linkedin.com/in/${displayName.toLowerCase().replace(/\s+/g, '-')}`;

      login(userEmail, displayName, userRole, 'linkedin', linkedInUrl);

      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });

      if (onNavigateToDashboard) {
        onNavigateToDashboard();
      } else {
        setActiveTab('dashboard');
      }
    }, 600);
  };

  // Handle Logout
  const handleSignOut = () => {
    logout();
  };

  // If already logged in, show account management dashboard state
  if (user) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="max-w-xl w-full bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-6 animate-in zoom-in-95">
          
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center text-xl font-black shadow-sm">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-black text-slate-900">Signed In Successfully</h2>
                <p className="text-xs text-slate-500">{user.email}</p>
              </div>
            </div>
            {user.provider === 'linkedin' ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#0A66C2]/10 text-[#0A66C2] text-xs font-bold">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.6a1.65 1.65 0 1 0 0 3.3 1.65 1.65 0 0 0 0-3.3Z"/>
                </svg>
                LinkedIn Connected
              </span>
            ) : (
              <span className="px-3 py-1 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold">
                Email Account
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Account Name</span>
              <span className="font-bold text-slate-800 text-sm">{user.name}</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Target Role</span>
              <span className="font-bold text-slate-800 text-sm truncate block">{user.jobTitle || 'Professional'}</span>
            </div>
            <div className="p-3.5 rounded-xl bg-amber-50/50 border border-amber-100">
              <span className="text-amber-800 block text-[10px] uppercase font-bold">AI Credits</span>
              <span className="font-black text-amber-700 text-sm">{user.aiCredits} Available</span>
            </div>
            <div className="p-3.5 rounded-xl bg-emerald-50/50 border border-emerald-100">
              <span className="text-emerald-800 block text-[10px] uppercase font-bold">Account Tier</span>
              <span className="font-black text-emerald-700 text-sm">Pro Active</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={() => setActiveTab('dashboard')}
              className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Go to My Resumes Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={handleSignOut}
              className="py-3 px-5 border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-xl text-xs sm:text-sm font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <LogOut className="w-4 h-4 text-rose-600" />
              <span>Log Out</span>
            </button>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4 sm:p-6 lg:p-8 py-10">
      <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-12 bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in">
        
        {/* LEFT / HERO BRAND PANEL (5 COLS) */}
        <div className="relative overflow-hidden lg:col-span-5 bg-slate-950 p-6 sm:p-8 text-white flex flex-col justify-between space-y-6">
          <div className="absolute inset-0 z-0">
            <img
              src={heroBannerImg}
              alt="Career workspace"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center opacity-25 scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-950/95 to-blue-950/90" />
          </div>

          <div className="relative z-10 space-y-4">
            <Logo size="md" showText={true} className="brightness-125" />
            
            <div className="pt-4 space-y-2">
              <h2 className="text-xl sm:text-2xl font-black leading-snug">
                Land 3x More Interviews with AI Precision
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Log in to sync your saved resumes, target job descriptions, and unlock Google XYZ bullet optimizers.
              </p>
            </div>

            <div className="space-y-3 pt-2 text-xs">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-slate-200">Instant ATS Keyword & Score Audits</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-slate-200">1-Click LinkedIn Experience & Skill Import</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-slate-200">+100 Free AI Credits on Signup</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-slate-200">Export clean PDF & DOCX formats</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> 100% Encrypted & Private
            </span>
            <span>v2.5 ATS Engine</span>
          </div>
        </div>

        {/* RIGHT / AUTH FORM PANEL (7 COLS) */}
        <div className="lg:col-span-7 p-6 sm:p-8 sm:py-9 space-y-5 flex flex-col justify-center">
          
          {/* HEADER & TAB SWITCHER */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                {authMode === 'signin' ? 'Welcome Back' : 'Create Free Account'}
              </h3>
              <span className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-[11px] font-bold">
                {authMode === 'signin' ? 'Sign In' : 'Free Registration'}
              </span>
            </div>

            {/* TAB SELECTOR: SIGN IN vs SIGN UP */}
            <div className="flex rounded-xl bg-slate-100 p-1">
              <button
                type="button"
                onClick={() => setAuthMode('signin')}
                className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  authMode === 'signin'
                    ? 'bg-white text-blue-600 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Sign In (Existing Account)
              </button>
              <button
                type="button"
                onClick={() => setAuthMode('signup')}
                className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  authMode === 'signup'
                    ? 'bg-white text-blue-600 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Create Account (New User)
              </button>
            </div>
          </div>

          {/* LINKEDIN 1-CLICK AUTH */}
          <div className="space-y-2">
            <button
              type="button"
              disabled={isLinkedInConnecting}
              onClick={() => handleLinkedInAuth()}
              className="w-full py-3 px-4 bg-[#0A66C2] hover:bg-[#004182] active:bg-[#003366] text-white rounded-xl text-xs sm:text-sm font-bold shadow-sm transition-all flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-75 group"
            >
              <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.6a1.65 1.65 0 1 0 0 3.3 1.65 1.65 0 0 0 0-3.3Z"/>
              </svg>

              {isLinkedInConnecting ? (
                <span>Connecting with LinkedIn OAuth...</span>
              ) : authMode === 'signin' ? (
                <span>Sign In with LinkedIn</span>
              ) : (
                <span>Create Account with LinkedIn</span>
              )}
            </button>

            <div className="flex items-center justify-between text-[11px] text-slate-500 px-1">
              <span>✓ Official LinkedIn OAuth 2.0</span>
              <span>⚡ Instant 1-Click Access</span>
            </div>
          </div>

          {/* DIVIDER */}
          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t border-slate-200"></div>
            <span className="flex-shrink mx-3 text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
              Or Continue with Email
            </span>
            <div className="flex-grow border-t border-slate-200"></div>
          </div>

          {/* FORM */}
          <form onSubmit={handleEmailSubmit} className="space-y-3.5">
            {authMode === 'signup' && (
              <>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Your Full Name</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Alex Morgan"
                      className="w-full text-xs sm:text-sm pl-9.5 pr-3 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Target Job Title / Specialty</label>
                  <div className="relative">
                    <Briefcase className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      value={targetRole}
                      onChange={(e) => setTargetRole(e.target.value)}
                      placeholder="e.g. Senior Software Engineer"
                      className="w-full text-xs sm:text-sm pl-9.5 pr-3 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex.morgan@example.com"
                  className="w-full text-xs sm:text-sm pl-9.5 pr-3 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-slate-700">Password</label>
                {authMode === 'signin' && (
                  <button
                    type="button"
                    onClick={() => addNotification('Password reset link sent to email (Demo mode)', 'info')}
                    className="text-[11px] text-blue-600 hover:underline cursor-pointer"
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full text-xs sm:text-sm pl-9.5 pr-10 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:opacity-75 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              {isLoading ? (
                <span>Authenticating...</span>
              ) : authMode === 'signin' ? (
                <>
                  <span>Sign In to Existing Account</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              ) : (
                <>
                  <span>Create New Account (+100 Credits)</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* QUICK DEMO USERS */}
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
            <div className="text-[11px] font-bold text-slate-600 flex items-center justify-between">
              <span>Quick Test Demo Login:</span>
              <span className="text-[10px] text-slate-400 font-mono">1-Click</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleLinkedInAuth('Sarah Chen', 'Senior Full-Stack Engineer')}
                className="py-1.5 px-2 bg-white hover:bg-blue-50 border border-slate-200 rounded-lg text-[11px] font-semibold text-slate-700 flex items-center justify-center gap-1 cursor-pointer transition-colors"
              >
                <span>Sarah (Software Eng)</span>
              </button>
              <button
                type="button"
                onClick={() => handleLinkedInAuth('David Miller', 'Director of Product Management')}
                className="py-1.5 px-2 bg-white hover:bg-blue-50 border border-slate-200 rounded-lg text-[11px] font-semibold text-slate-700 flex items-center justify-center gap-1 cursor-pointer transition-colors"
              >
                <span>David (Product Dir)</span>
              </button>
            </div>
          </div>

          {/* BOTTOM TOGGLE */}
          <div className="text-center text-xs text-slate-500 pt-1">
            {authMode === 'signin' ? (
              <span>
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => setAuthMode('signup')}
                  className="text-blue-600 font-bold hover:underline cursor-pointer"
                >
                  Create account free
                </button>
              </span>
            ) : (
              <span>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => setAuthMode('signin')}
                  className="text-blue-600 font-bold hover:underline cursor-pointer"
                >
                  Sign in here
                </button>
              </span>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
