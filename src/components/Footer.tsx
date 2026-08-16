import React from 'react';
import { Logo } from './Logo';
import { Shield, Sparkles, CheckCircle2, FileText, Bot, LogIn, LogOut, User } from 'lucide-react';
import { useResume } from '../context/ResumeContext';

export const Footer: React.FC = () => {
  const { setActiveTab, user, logout } = useResume();

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 text-sm py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8">
        
        {/* Col 1: Brand & Tagline */}
        <div className="sm:col-span-2 md:col-span-2 space-y-4">
          <Logo size="md" showText={true} className="brightness-125" />
          <p className="text-slate-400 max-w-sm text-xs sm:text-sm leading-relaxed">
            Build a resume that gets noticed. ResumeAI Pro helps professionals craft ATS-friendly, job-tailored resumes and cover letters with Google Gemini AI.
          </p>
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <Shield className="w-3.5 h-3.5 text-emerald-400" /> 100% Data Privacy
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" /> ATS Guaranteed
            </span>
          </div>
        </div>

        {/* Col 2: Core Tools */}
        <div>
          <h4 className="font-semibold text-slate-200 text-xs tracking-wider uppercase mb-3">AI Tools</h4>
          <ul className="space-y-2 text-xs">
            <li>
              <button onClick={() => setActiveTab('builder')} className="hover:text-white transition-colors cursor-pointer">
                AI Resume Builder
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('ats-checker')} className="hover:text-white transition-colors cursor-pointer">
                ATS Resume Score Checker
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('job-matcher')} className="hover:text-white transition-colors cursor-pointer">
                Job Description Matcher
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('cover-letters')} className="hover:text-white transition-colors cursor-pointer">
                AI Cover Letter Writer
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('interview-prep')} className="hover:text-white transition-colors cursor-pointer">
                Interview Prep Simulator
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('linkedin')} className="hover:text-white transition-colors cursor-pointer">
                LinkedIn Optimizer
              </button>
            </li>
          </ul>
        </div>

        {/* Col 3: Templates & Guides */}
        <div>
          <h4 className="font-semibold text-slate-200 text-xs tracking-wider uppercase mb-3">Templates & Guides</h4>
          <ul className="space-y-2 text-xs">
            <li>
              <button onClick={() => setActiveTab('templates')} className="hover:text-white transition-colors cursor-pointer">
                ATS Classic Format
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('templates')} className="hover:text-white transition-colors cursor-pointer">
                Modern SaaS Blue
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('templates')} className="hover:text-white transition-colors cursor-pointer">
                Tech & Developer CV
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('blog')} className="hover:text-white transition-colors cursor-pointer">
                Resume Writing Guides
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('compare')} className="hover:text-white transition-colors cursor-pointer">
                Compare Versions
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('admin')} className="hover:text-white transition-colors cursor-pointer">
                Admin Console
              </button>
            </li>
          </ul>
        </div>

        {/* Col 4: Account & Authentication */}
        <div>
          <h4 className="font-semibold text-slate-200 text-xs tracking-wider uppercase mb-3">Account & Access</h4>
          <ul className="space-y-2 text-xs">
            {user ? (
              <>
                <li className="text-slate-300 font-semibold flex items-center gap-1.5 py-0.5">
                  <User className="w-3 h-3 text-blue-400" />
                  <span className="truncate">{user.name}</span>
                </li>
                <li>
                  <button onClick={() => setActiveTab('dashboard')} className="hover:text-white transition-colors cursor-pointer">
                    My Resumes Dashboard
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('login')} className="hover:text-white transition-colors cursor-pointer">
                    Account Profile Details
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => logout()}
                    className="text-rose-400 hover:text-rose-300 transition-colors flex items-center gap-1.5 cursor-pointer font-semibold"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Log Out / Sign Out</span>
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <button
                    onClick={() => setActiveTab('login')}
                    className="hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer text-blue-400 font-semibold"
                  >
                    <LogIn className="w-3.5 h-3.5" />
                    <span>Sign In (Existing User)</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('login')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Create Free Account (+100 Credits)
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('login')}
                    className="hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>LinkedIn 1-Click Access</span>
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>

      </div>

      <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
        <p>© {new Date().getFullYear()} ResumeAI Pro. All rights reserved.</p>
        <p>Built with hksurya</p>
      </div>
    </footer>
  );
};
