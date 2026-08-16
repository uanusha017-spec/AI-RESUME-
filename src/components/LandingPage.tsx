import React, { useState } from 'react';
import { useResume } from '../context/ResumeContext';
import { TEMPLATES } from '../data/templates';
import { SAMPLE_RESUMES } from '../data/sampleResumes';
import {
  Sparkles,
  CheckCircle2,
  Zap,
  Shield,
  FileCheck,
  Briefcase,
  Target,
  ArrowRight,
  ChevronRight,
  Layers,
  Award,
  Bot,
  Download,
  Eye,
  Star,
  Users,
  Search
} from 'lucide-react';
import { ResumeRenderer } from './ResumeTemplates/ResumeRenderer';
import heroBannerImg from '../assets/images/hero_career_banner_1786886172807.jpg';

interface LandingPageProps {
  onStartBuilding: () => void;
  onOpenATS: () => void;
  onOpenUploadResume?: () => void;
  onOpenCreditsModal?: () => void;
  onOpenAuth?: () => void;
  onOpenPayment?: (
    planName: string,
    amountINR: number,
    credits: number,
    planTier?: 'Pro' | 'Premium',
    billingPeriod?: 'monthly' | 'annual'
  ) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onStartBuilding,
  onOpenATS,
  onOpenUploadResume,
  onOpenCreditsModal,
  onOpenAuth,
  onOpenPayment,
}) => {
  const { setActiveTab, loadSampleResume, createNewResume } = useResume();
  const [selectedDemoResume, setSelectedDemoResume] = useState(SAMPLE_RESUMES[0]);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [currency, setCurrency] = useState<'INR' | 'USD'>('INR');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  const stats = [
    { label: 'ATS Pass Rate', value: '99.4%' },
    { label: 'Resumes Generated', value: '180,000+' },
    { label: 'Average Interview Rate Lift', value: '3.4x' },
    { label: 'Time Saved per Resume', value: '4.5 Hours' },
  ];

  const features = [
    {
      icon: Target,
      title: 'Precision ATS Scoring',
      desc: 'Our engine parses keyword frequency, action verbs, and structural compliance used by Taleo, Greenhouse, and Workday.',
    },
    {
      icon: Sparkles,
      title: 'Google XYZ Bullet Points',
      desc: 'Transforms generic bullet points into quantifiable impact statements ("Accomplished X by doing Y resulting in Z").',
    },
    {
      icon: Zap,
      title: '1-Click Job Matcher',
      desc: 'Paste any job posting to immediately detect missing keywords and generate targeted, honest optimizations.',
    },
    {
      icon: Layers,
      title: '12 Tailored ATS Templates',
      desc: 'Expert-designed templates that pass rigorous ATS scanners and captivate executive hiring managers.',
    },
    {
      icon: Bot,
      title: 'AI Cover Letter & Interview Prep',
      desc: 'Generate tailored cover letters and practice realistic behavioral STAR mock interviews with live AI feedback.',
    },
    {
      icon: Shield,
      title: '100% Privacy & Zero Fabrication',
      desc: 'Your data is strictly private. Our AI prompts are strictly bounded never to fabricate fake credentials.',
    },
  ];

  const faqs = [
    {
      q: 'Will my resume pass Applicant Tracking Systems (ATS)?',
      a: 'Yes. Every template and formatting rule in ResumeAI Pro adheres strictly to ATS standards: single-layer text extraction, standardized headings, zero conflicting graphical elements, and optimized keyword density.',
    },
    {
      q: 'How does the AI optimize for job descriptions?',
      a: 'When you paste a target job description, our AI identifies required hard skills, soft skills, and keyword frequencies. It suggests honest rephrasing of your existing experience to highlight relevant achievements without ever inventing false facts.',
    },
    {
      q: 'Can I export in both PDF and Word (.DOCX)?',
      a: 'Yes! You can instantly export pixel-perfect high-resolution PDFs, formatted Microsoft Word (.DOCX) documents, or raw text suitable for online job boards.',
    },
    {
      q: 'Can I create multiple versions for different applications?',
      a: 'Absolutely. You can maintain unlimited tailored versions (e.g. "Full Stack Developer", "Engineering Manager", "Frontend Lead") and compare them side-by-side.',
    },
    {
      q: 'Is there a free tier to try?',
      a: 'Yes! You can build resumes, test the ATS score checker, and generate summaries completely free with starter AI credits.',
    },
  ];

  return (
    <div className="bg-slate-50 text-slate-900 overflow-hidden">
      
      {/* HERO SECTION */}
      <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-28 px-4 sm:px-6 lg:px-8 border-b border-slate-200 bg-gradient-to-b from-white via-blue-50/30 to-slate-50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Copy & Actions */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 border border-blue-200 text-blue-800 text-xs font-bold tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
              <span>Next-Gen AI Resume & Career Suite</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.1]">
              Build a Resume That <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Gets You Hired.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Create an ATS-friendly, job-specific resume in minutes with AI. Generate high-impact bullet points, score 90+ on ATS checkers, and land more interviews.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
              <button
                onClick={onStartBuilding}
                className="w-full sm:w-auto px-6 py-3.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-sm sm:text-base rounded-xl shadow-lg shadow-blue-600/20 hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Create Resume Free</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenUploadResume}
                className="w-full sm:w-auto px-5 py-3.5 bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-200 font-bold text-sm sm:text-base rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Upload Existing Resume</span>
              </button>

              <button
                onClick={onOpenATS}
                className="w-full sm:w-auto px-5 py-3.5 bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 font-semibold text-sm sm:text-base rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Target className="w-4 h-4 text-blue-600" />
                <span>Check ATS Score</span>
              </button>
            </div>

            {/* Micro proof badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-4 text-xs font-semibold text-slate-500">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>No Credit Card Required</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>100% ATS Compliant</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>PDF & DOCX Export</span>
              </div>
            </div>
          </div>

          {/* Right Column: Live Animated Resume Preview Card */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Floating ATS Badge */}
              <div className="absolute -top-4 -left-4 sm:-top-6 sm:-left-6 z-20 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-emerald-100 p-3.5 flex items-center gap-3 animate-in fade-in slide-in-from-left-4">
                <div className="w-11 h-11 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-black text-lg shadow-md">
                  96
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 flex items-center gap-1">
                    <span>ATS Compatible</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  </div>
                  <div className="text-[11px] text-slate-500">14/14 Target Keywords Matched</div>
                </div>
              </div>

              {/* Floating AI Improvement Badge */}
              <div className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 z-20 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-blue-100 p-3.5 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">AI Bullet Optimizer</div>
                  <div className="text-[11px] text-emerald-600 font-semibold">+35% Impact verbs added</div>
                </div>
              </div>

              {/* Sample Profile Selector Pills */}
              <div className="mb-3 flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                {SAMPLE_RESUMES.slice(0, 4).map((sample) => (
                  <button
                    key={sample.id}
                    onClick={() => setSelectedDemoResume(sample)}
                    className={`text-[11px] px-2.5 py-1 rounded-full font-medium whitespace-nowrap transition-colors cursor-pointer ${
                      selectedDemoResume.id === sample.id
                        ? 'bg-blue-600 text-white font-semibold'
                        : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {sample.personalInfo.fullName.split(' ')[0]} ({sample.targetRole.split(' ')[0]})
                  </button>
                ))}
              </div>

              {/* Scaled Preview Frame */}
              <div className="rounded-2xl border border-slate-200 shadow-2xl bg-white overflow-hidden max-h-[520px] overflow-y-auto p-4 sm:p-6 transition-all">
                <ResumeRenderer resume={selectedDemoResume} scale={0.9} previewMode={true} />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* STATS BANNER */}
      <section className="bg-slate-900 text-white py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((st, idx) => (
            <div key={idx} className="space-y-1">
              <div className="text-2xl sm:text-4xl font-black bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                {st.value}
              </div>
              <div className="text-xs sm:text-sm text-slate-400 font-medium">{st.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CORE FEATURES GRID */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-widest text-blue-600">Enterprise Grade AI Engine</h2>
          <p className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">
            Everything You Need to Win Top-Tier Interviews
          </p>
          <p className="text-slate-600 text-sm sm:text-base">
            From smart bullet point formulas to simulated interview prep, ResumeAI Pro empowers you at every stage.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all space-y-3 group"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">{feat.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{feat.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* TEMPLATES SHOWCASE SECTION */}
      <section className="py-20 bg-slate-100 border-y border-slate-200 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-10">
            <div className="space-y-2">
              <h2 className="text-xs font-bold uppercase tracking-widest text-blue-600">12 Battle-Tested Templates</h2>
              <p className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
                Designed for Recruiters and ATS Parsers
              </p>
            </div>
            <button
              onClick={() => setActiveTab('templates')}
              className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
            >
              <span>Explore all templates</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEMPLATES.slice(0, 4).map((tpl) => (
              <div
                key={tpl.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md hover:border-blue-400 transition-all flex flex-col justify-between p-5 space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700">
                      {tpl.category}
                    </span>
                    {tpl.isATS100 && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                        100% ATS
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold text-slate-900 text-base">{tpl.name}</h3>
                  <p className="text-slate-500 text-xs mt-1 line-clamp-2">{tpl.description}</p>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex gap-1.5">
                    {tpl.recommendedColors.map((c, i) => (
                      <span key={i} className="w-4 h-4 rounded-full border border-slate-200" style={{ backgroundColor: c }} />
                    ))}
                  </div>
                  <button
                    onClick={() => {
                      createNewResume(tpl.id);
                      setActiveTab('builder');
                    }}
                    className="text-xs font-semibold text-blue-600 hover:underline cursor-pointer"
                  >
                    Use Template →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <h2 className="text-xs font-bold uppercase tracking-widest text-blue-600">Real Results</h2>
          <p className="text-3xl font-black tracking-tight text-slate-900">
            Trusted by Job Seekers Landing Offers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              quote: "The ATS Score checker and Google XYZ bullet generator transformed my resume. I went from 0 callbacks to 4 interviews in 2 weeks, landing a Senior Engineer offer at a top fintech!",
              name: "Marcus Vance",
              role: "Senior Engineer at Stripe",
              rating: 5,
            },
            {
              quote: "Matching my resume to specific job descriptions saved me hours. The AI highlights exactly what keywords are missing without fabricating anything.",
              name: "Elena Rostova",
              role: "ICU Specialist at UW Medicine",
              rating: 5,
            },
            {
              quote: "The interactive interview simulator gave me the exact questions asked in my real final-round executive interview. Worth every penny.",
              name: "David Sterling",
              role: "Director of Product at Enterprise SaaS",
              rating: 5,
            },
          ].map((t, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="flex text-amber-400 gap-1">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-slate-700 text-sm italic leading-relaxed">"{t.quote}"</p>
              <div className="pt-2 border-t border-slate-100">
                <div className="font-bold text-slate-900 text-sm">{t.name}</div>
                <div className="text-xs text-slate-500">{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING PLANS */}
      <section className="py-20 bg-slate-100 border-t border-slate-200 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="max-w-2xl mx-auto mb-8 space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-widest text-blue-600">Transparent & Affordable Plans</h2>
            <p className="text-3xl font-black tracking-tight text-slate-900">
              Invest in Your Career Acceleration
            </p>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
              Choose the perfect plan tailored for your job search in India and global remote markets.
            </p>
          </div>

          {/* CURRENCY & BILLING SWITCHER CONTROLS */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
            {/* Currency Selector (Defaults to Indian Rupee INR) */}
            <div className="inline-flex rounded-xl bg-white p-1 border border-slate-300 shadow-xs">
              <button
                type="button"
                onClick={() => setCurrency('INR')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  currency === 'INR'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>🇮🇳 INR (₹)</span>
              </button>
              <button
                type="button"
                onClick={() => setCurrency('USD')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  currency === 'USD'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>🇺🇸 USD ($)</span>
              </button>
            </div>

            {/* Billing Cycle Toggle */}
            <div className="inline-flex rounded-xl bg-white p-1 border border-slate-300 shadow-xs">
              <button
                type="button"
                onClick={() => setBillingCycle('monthly')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  billingCycle === 'monthly'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Monthly
              </button>
              <button
                type="button"
                onClick={() => setBillingCycle('annual')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  billingCycle === 'annual'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>Annual</span>
                <span className="px-1.5 py-0.2 bg-emerald-100 text-emerald-800 text-[10px] font-black rounded uppercase">
                  Save 20%
                </span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto text-left">
            
            {/* Free Tier */}
            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <h3 className="font-bold text-slate-900 text-xl">Starter Free</h3>
                <p className="text-slate-500 text-xs">Essential tools to build and download your first resume.</p>
                <div className="text-3xl font-black text-slate-900">
                  {currency === 'INR' ? '₹0' : '$0'} <span className="text-xs font-normal text-slate-500">/ forever</span>
                </div>
                <ul className="space-y-2.5 text-xs text-slate-700">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> 1 Active Resume & Cover Letter</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Basic ATS Compatibility Check</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> PDF & Text Export</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> 10 Free AI Credits</li>
                </ul>
              </div>
              <button
                onClick={onStartBuilding}
                className="w-full py-2.5 px-4 rounded-xl border border-slate-300 font-semibold text-slate-700 hover:bg-slate-50 transition-colors text-sm cursor-pointer"
              >
                Get Started Free
              </button>
            </div>

            {/* Pro Tier (Featured) */}
            <div className="bg-slate-900 text-white rounded-2xl p-8 border-2 border-blue-500 shadow-xl flex flex-col justify-between space-y-6 relative">
              <div className="absolute -top-3.5 right-6 px-3 py-1 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-[11px] font-bold uppercase tracking-wider rounded-full shadow-sm">
                Most Popular in India
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-white text-xl">ResumeAI Pro</h3>
                  {billingCycle === 'annual' && (
                    <span className="px-2 py-0.5 bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-[10px] font-bold rounded">
                      20% Discount
                    </span>
                  )}
                </div>
                <p className="text-slate-400 text-xs">Full access to automated job matcher and interview coach.</p>
                
                <div className="space-y-1">
                  <div className="text-3xl font-black text-white">
                    {currency === 'INR'
                      ? (billingCycle === 'monthly' ? '₹499' : '₹399')
                      : (billingCycle === 'monthly' ? '$14' : '$10')}
                    <span className="text-xs font-normal text-slate-400"> / month</span>
                  </div>
                  {currency === 'INR' && billingCycle === 'annual' && (
                    <div className="text-[11px] text-slate-400">
                      Billed ₹4,788 annually (Save ₹1,200/yr)
                    </div>
                  )}
                </div>

                <ul className="space-y-2.5 text-xs text-slate-300">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" /> Unlimited Resumes & Versions</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" /> All 12 Premium ATS Templates</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" /> 1-Click Job Description Matcher</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" /> AI Cover Letter & LinkedIn Suite</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" /> 500 AI Monthly Credits</li>
                </ul>
              </div>
              <button
                onClick={() => {
                  const amt = billingCycle === 'monthly' ? 499 : 4788;
                  if (onOpenPayment) {
                    onOpenPayment(
                      `ResumeAI Pro (${billingCycle === 'monthly' ? 'Monthly' : 'Annual'})`,
                      amt,
                      500,
                      'Pro',
                      billingCycle
                    );
                  } else {
                    onStartBuilding();
                  }
                }}
                className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 font-bold text-white transition-colors text-sm shadow-md cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Upgrade to Pro ({currency === 'INR' ? (billingCycle === 'monthly' ? '₹499' : '₹399') : (billingCycle === 'monthly' ? '$14' : '$10')}/mo)</span>
              </button>
            </div>

            {/* Premium / Lifetime Tier */}
            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <h3 className="font-bold text-slate-900 text-xl">Executive Career</h3>
                <p className="text-slate-500 text-xs">For senior leaders seeking personalized AI coaching & deep research.</p>
                
                <div className="space-y-1">
                  <div className="text-3xl font-black text-slate-900">
                    {currency === 'INR'
                      ? (billingCycle === 'monthly' ? '₹1,299' : '₹999')
                      : (billingCycle === 'monthly' ? '$29' : '$22')}
                    <span className="text-xs font-normal text-slate-500"> / month</span>
                  </div>
                  {currency === 'INR' && billingCycle === 'annual' && (
                    <div className="text-[11px] text-slate-500">
                      Billed ₹11,988 annually (Save ₹3,600/yr)
                    </div>
                  )}
                </div>

                <ul className="space-y-2.5 text-xs text-slate-700">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Unlimited AI Credits & Generations</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Live AI Voice Mock Interviews</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Priority Processing SLA</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Salary Negotiation Assistant</li>
                </ul>
              </div>
              <button
                onClick={() => {
                  const amt = billingCycle === 'monthly' ? 1299 : 11988;
                  if (onOpenPayment) {
                    onOpenPayment(
                      `Executive Career (${billingCycle === 'monthly' ? 'Monthly' : 'Annual'})`,
                      amt,
                      1500,
                      'Premium',
                      billingCycle
                    );
                  } else {
                    onStartBuilding();
                  }
                }}
                className="w-full py-2.5 px-4 rounded-xl border border-slate-300 font-semibold text-slate-700 hover:bg-slate-50 transition-colors text-sm cursor-pointer"
              >
                Choose Executive Plan
              </button>
            </div>

          </div>

          {/* PAYMENT BADGES & PEACE OF MIND IN INDIA */}
          <div className="mt-10 max-w-4xl mx-auto p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
            <div className="flex items-center gap-2 text-slate-700 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Supported in India: <strong className="text-slate-900">UPI (GPay, PhonePe, Paytm), RuPay, Cards & NetBanking</strong></span>
            </div>
            <div className="flex items-center gap-3 text-slate-500 text-[11px]">
              <span>✓ GST Invoicing Available</span>
              <span>✓ 7-Day Money-Back Guarantee</span>
            </div>
          </div>

        </div>
      </section>

      {/* FAQ ACCORDION */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="text-center mb-12 space-y-2">
          <h2 className="text-xs font-bold uppercase tracking-widest text-blue-600">Frequently Asked Questions</h2>
          <p className="text-3xl font-black tracking-tight text-slate-900">
            Answers to Common Questions
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              <button
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="w-full px-6 py-4 text-left font-bold text-slate-900 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50 transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${activeFaq === idx ? 'rotate-90 text-blue-600' : 'text-slate-400'}`} />
              </button>
              {activeFaq === idx && (
                <div className="px-6 pb-5 pt-1 text-slate-600 text-sm leading-relaxed border-t border-slate-100">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* BOTTOM HERO BANNER IMAGE SECTION */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-slate-950 text-white text-center">
        <div className="absolute inset-0 z-0">
          <img
            src={heroBannerImg}
            alt="Resume builder workstation"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center opacity-30 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-blue-950/80" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-bold tracking-wide backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
            <span>Accelerate Your Career Today</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
            Ready to Build a Resume That Gets Noticed?
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Join thousands of professionals landing interviews at Google, Stripe, Amazon, and leading global employers.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={onStartBuilding}
              className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-bold text-base rounded-xl shadow-xl hover:shadow-blue-600/30 transition-all inline-flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Start Building with AI Now</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={onOpenATS}
              className="w-full sm:w-auto px-6 py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-base rounded-xl backdrop-blur-md transition-all inline-flex items-center justify-center gap-2 cursor-pointer"
            >
              <Target className="w-5 h-5 text-blue-400" />
              <span>Free ATS Audit</span>
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
