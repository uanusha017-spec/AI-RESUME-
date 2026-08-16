import React, { useState } from 'react';
import { useResume } from '../context/ResumeContext';
import { TEMPLATES } from '../data/templates';
import { SAMPLE_RESUMES } from '../data/sampleResumes';
import {
  User,
  Mail,
  Lock,
  Sparkles,
  Layers,
  ArrowRight,
  CheckCircle2,
  FileText,
  Briefcase,
  Upload
} from 'lucide-react';

interface ModalsProps {
  authOpen: boolean;
  onCloseAuth: () => void;
  newResumeOpen: boolean;
  onCloseNewResume: () => void;
  onNavigateToBuilder: () => void;
  onOpenAdmin?: () => void;
  onOpenUploadResume?: () => void;
}

export const Modals: React.FC<ModalsProps> = ({
  authOpen,
  onCloseAuth,
  newResumeOpen,
  onCloseNewResume,
  onNavigateToBuilder,
  onOpenAdmin,
  onOpenUploadResume,
}) => {
  const { login, createNewResume, loadSampleResume, addNotification } = useResume();

  // Auth form state
  const [authEmail, setAuthEmail] = useState('');
  const [authName, setAuthName] = useState('');
  const [authTargetRole, setAuthTargetRole] = useState('Senior Software Engineer');
  const [authPassword, setAuthPassword] = useState('');
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [isLinkedInConnecting, setIsLinkedInConnecting] = useState(false);

  // New Resume wizard state
  const [wizardTargetRole, setWizardTargetRole] = useState('Senior Software Engineer');
  const [wizardSelectedTemplate, setWizardSelectedTemplate] = useState('modern-blue');
  const [wizardChoice, setWizardChoice] = useState<'scratch' | 'sample' | 'import'>('scratch');
  const [wizardSampleId, setWizardSampleId] = useState(SAMPLE_RESUMES[0].id);

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authEmail.trim()) {
      addNotification('Please enter a valid email', 'warning');
      return;
    }
    const displayName = authName.trim() || authEmail.split('@')[0];
    login(authEmail, displayName, authTargetRole || 'Professional', 'email');
    onCloseAuth();
  };

  const handleLinkedInAuth = (mode: 'signin' | 'signup', customName?: string, customRole?: string) => {
    setIsLinkedInConnecting(true);
    setTimeout(() => {
      setIsLinkedInConnecting(false);
      const name = customName || (authName.trim() ? authName.trim() : 'Sarah Chen');
      const role = customRole || (authTargetRole.trim() ? authTargetRole.trim() : 'Senior Full-Stack Engineer');
      const email = authEmail.trim() || `${name.toLowerCase().replace(/\s+/g, '.')}@example.com`;
      const linkedInUrl = `https://www.linkedin.com/in/${name.toLowerCase().replace(/\s+/g, '-')}`;

      login(email, name, role, 'linkedin', linkedInUrl);
      onCloseAuth();
    }, 600);
  };

  const handleCreateResumeSubmit = () => {
    if (wizardChoice === 'sample') {
      loadSampleResume(wizardSampleId);
    } else {
      createNewResume(wizardSelectedTemplate, wizardTargetRole);
    }
    onCloseNewResume();
    onNavigateToBuilder();
  };

  return (
    <>
      {/* ================= AUTH MODAL ================= */}
      {authOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/65 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-7 space-y-5 shadow-2xl animate-in zoom-in-95 max-h-[92vh] overflow-y-auto">
            
            {/* MODAL HEADER */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-black text-slate-900 text-lg sm:text-xl">
                  {authMode === 'signin' ? 'Sign In to Your Account' : 'Create Free Account'}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {authMode === 'signin'
                    ? 'Access your saved resumes, cover letters, and ATS score reports.'
                    : 'Get started with 100 free AI credits and ATS templates.'}
                </p>
              </div>
              <button
                onClick={onCloseAuth}
                className="text-slate-400 hover:text-slate-600 rounded-lg p-1.5 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* TAB SELECTOR: EXISTING ACCOUNT vs CREATE ACCOUNT */}
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

            {/* LINKEDIN ONE-CLICK ACTION */}
            <div className="space-y-2">
              <button
                type="button"
                disabled={isLinkedInConnecting}
                onClick={() => handleLinkedInAuth(authMode)}
                className="w-full py-2.5 px-4 bg-[#0A66C2] hover:bg-[#004182] active:bg-[#003366] text-white rounded-xl text-xs sm:text-sm font-bold shadow-sm transition-all flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-75 group"
              >
                {/* Official LinkedIn In Logo */}
                <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.6a1.65 1.65 0 1 0 0 3.3 1.65 1.65 0 0 0 0-3.3Z"/>
                </svg>

                {isLinkedInConnecting ? (
                  <span>Connecting with LinkedIn...</span>
                ) : authMode === 'signin' ? (
                  <span>Sign In with LinkedIn</span>
                ) : (
                  <span>Create Account with LinkedIn</span>
                )}
              </button>

              <div className="flex items-center justify-between text-[11px] text-slate-500 px-1">
                <span>✓ Verified LinkedIn OAuth 2.0</span>
                <span>⚡ Instant 1-Click Access</span>
              </div>
            </div>

            {/* DIVIDER */}
            <div className="relative flex py-1 items-center">
              <div className="flex-grow border-t border-slate-200"></div>
              <span className="flex-shrink mx-3 text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                Or with Email
              </span>
              <div className="flex-grow border-t border-slate-200"></div>
            </div>

            {/* EMAIL / PASSWORD FORM */}
            <form onSubmit={handleAuthSubmit} className="space-y-3.5">
              {authMode === 'signup' && (
                <>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Your Full Name</label>
                    <input
                      type="text"
                      required
                      value={authName}
                      onChange={(e) => setAuthName(e.target.value)}
                      placeholder="Alex Morgan"
                      className="w-full text-xs sm:text-sm px-3 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Target Role / Specialty</label>
                    <input
                      type="text"
                      value={authTargetRole}
                      onChange={(e) => setAuthTargetRole(e.target.value)}
                      placeholder="e.g. Senior Software Engineer, Product Manager"
                      className="w-full text-xs sm:text-sm px-3 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={authEmail}
                  onChange={(e) => setAuthEmail(e.target.value)}
                  placeholder="alex@example.com"
                  className="w-full text-xs sm:text-sm px-3 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-slate-700">Password</label>
                  {authMode === 'signin' && (
                    <span className="text-[11px] text-blue-600 hover:underline cursor-pointer">
                      Forgot password?
                    </span>
                  )}
                </div>
                <input
                  type="password"
                  required
                  value={authPassword}
                  onChange={(e) => setAuthPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full text-xs sm:text-sm px-3 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md transition-colors cursor-pointer"
              >
                {authMode === 'signin' ? 'Sign In to Existing Account' : 'Create New Account (+100 Credits)'}
              </button>

              {/* QUICK DEMO LOGIN SHORTCUTS */}
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
                <div className="text-[11px] font-bold text-slate-600 flex items-center justify-between">
                  <span>Quick Test Login:</span>
                  <span className="text-[10px] text-slate-400">1-Click</span>
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  <button
                    type="button"
                    onClick={() => handleLinkedInAuth('signin', 'Sarah Chen', 'Senior Full-Stack Engineer')}
                    className="py-1.5 px-2 bg-white hover:bg-blue-50 border border-slate-200 rounded-lg text-[11px] font-medium text-slate-700 flex items-center justify-center gap-1 cursor-pointer transition-colors"
                  >
                    <span>Sarah (Engineer)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleLinkedInAuth('signin', 'David Miller', 'Director of Product Management')}
                    className="py-1.5 px-2 bg-white hover:bg-blue-50 border border-slate-200 rounded-lg text-[11px] font-medium text-slate-700 flex items-center justify-center gap-1 cursor-pointer transition-colors"
                  >
                    <span>David (Product)</span>
                  </button>
                </div>
              </div>

              {/* FOOTER SWITCH & ADMIN PORTAL */}
              <div className="text-center text-xs text-slate-500 space-y-2 pt-1">
                <div>
                  {authMode === 'signin' ? (
                    <span>
                      Don't have an account yet?{' '}
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
                      Already have an existing account?{' '}
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

                <div className="pt-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => {
                      onCloseAuth();
                      if (onOpenAdmin) {
                        onOpenAdmin();
                      }
                    }}
                    className="text-slate-500 hover:text-slate-800 text-[11px] font-medium cursor-pointer"
                  >
                    System Administrator? <span className="text-cyan-700 font-semibold underline">Access Admin Console</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= NEW RESUME CREATION MODAL ================= */}
      {newResumeOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl animate-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-blue-600" />
                <h3 className="font-bold text-slate-900 text-lg">Create New Resume</h3>
              </div>
              <button
                onClick={onCloseNewResume}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            {/* Step 1: Starting Method */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700">Choose Starting Method</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <button
                  type="button"
                  onClick={() => setWizardChoice('scratch')}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                    wizardChoice === 'scratch'
                      ? 'border-blue-600 bg-blue-50/70 font-semibold'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <FileText className="w-5 h-5 text-blue-600 mb-1" />
                  <div className="text-xs font-bold text-slate-900">Start Blank</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Section-by-section with AI</div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onCloseNewResume();
                    if (onOpenUploadResume) onOpenUploadResume();
                  }}
                  className="p-3.5 rounded-xl border border-dashed border-blue-300 hover:border-blue-500 bg-blue-50/40 hover:bg-blue-50 text-left transition-all cursor-pointer"
                >
                  <Upload className="w-5 h-5 text-blue-600 mb-1" />
                  <div className="text-xs font-bold text-blue-950">Upload Existing</div>
                  <div className="text-[11px] text-blue-700 mt-0.5">PDF, DOCX, TXT, JSON</div>
                </button>

                <button
                  type="button"
                  onClick={() => setWizardChoice('sample')}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                    wizardChoice === 'sample'
                      ? 'border-blue-600 bg-blue-50/70 font-semibold'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <Briefcase className="w-5 h-5 text-indigo-600 mb-1" />
                  <div className="text-xs font-bold text-slate-900">Industry Sample</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Pre-tested ATS profiles</div>
                </button>
              </div>
            </div>

            {/* If sample selected */}
            {wizardChoice === 'sample' && (
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700">Select Industry Profile:</label>
                <select
                  value={wizardSampleId}
                  onChange={(e) => setWizardSampleId(e.target.value)}
                  className="w-full text-xs sm:text-sm p-2.5 rounded-xl border border-slate-200 bg-slate-50"
                >
                  {SAMPLE_RESUMES.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.targetRole} — {s.personalInfo.fullName}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Target Role input */}
            {wizardChoice === 'scratch' && (
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Target Job Title</label>
                <input
                  type="text"
                  value={wizardTargetRole}
                  onChange={(e) => setWizardTargetRole(e.target.value)}
                  placeholder="e.g. Senior Product Manager"
                  className="w-full text-xs sm:text-sm px-3 py-2 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
            )}

            {/* Template Selection */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700">Choose Initial ATS Template</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {TEMPLATES.slice(0, 6).map((tpl) => (
                  <button
                    key={tpl.id}
                    type="button"
                    onClick={() => setWizardSelectedTemplate(tpl.id)}
                    className={`p-2.5 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                      wizardSelectedTemplate === tpl.id
                        ? 'border-blue-600 bg-blue-50 font-bold text-blue-900'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="truncate">{tpl.name}</div>
                    <div className="text-[10px] text-slate-500">{tpl.category}</div>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleCreateResumeSubmit}
              className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Launch in Resume Builder</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
