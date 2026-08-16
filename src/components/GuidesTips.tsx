import React from 'react';
import { BookOpen, CheckCircle2, Target, Zap, Shield, Sparkles } from 'lucide-react';

export const GuidesTips: React.FC = () => {
  const guides = [
    {
      title: 'The Google XYZ Resume Bullet Formula',
      category: 'Resume Writing',
      desc: 'Learn how Laszlo Bock (former SVP of People Operations at Google) advises writing impact statements: "Accomplished [X] as measured by [Y], by doing [Z]".',
      tips: [
        'Start with an active power verb (Spearheaded, Engineered, Architected).',
        'Quantify results using percentages, dollar revenue, or hours saved.',
        'Detail the specific methodologies or technologies you utilized.',
      ],
    },
    {
      title: 'How Applicant Tracking Systems (ATS) Actually Work in 2025',
      category: 'ATS Optimization',
      desc: 'Understand how Taleo, Greenhouse, and Workday extract resume text, map fields to relational candidate tables, and rank applicant scores.',
      tips: [
        'Avoid nested tables, text boxes, and floating header graphics.',
        'Use standard section headings like "Work Experience", "Education", and "Skills".',
        'Match exact keyword spellings found in the job description.',
      ],
    },
    {
      title: 'Mastering the Behavioral STAR Interview Technique',
      category: 'Interview Prep',
      desc: 'How to structure compelling, concise answers to behavioral questions that demonstrate high agency and emotional intelligence.',
      tips: [
        'Situation: Set the context in 2 sentences max.',
        'Task: State the core hurdle or objective.',
        'Action: Focus 70% of your answer on what YOU specifically engineered or led.',
        'Result: Deliver the quantifiable impact.',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* HEADER */}
        <div className="border-b border-slate-200 pb-6 space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold mb-2">
            <BookOpen className="w-3.5 h-3.5 text-blue-600" />
            <span>Career Strategy & ATS Playbook</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            Guides & Proven Playbooks
          </h1>
          <p className="text-sm text-slate-600">
            Actionable guides from recruiters and hiring managers at Google, Meta, and Stripe.
          </p>
        </div>

        {/* GUIDES LIST */}
        <div className="space-y-6">
          {guides.map((g, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-50 text-blue-700">
                  {g.category}
                </span>
              </div>
              <h2 className="text-xl font-bold text-slate-900">{g.title}</h2>
              <p className="text-sm text-slate-600 leading-relaxed">{g.desc}</p>
              
              <div className="pt-2 border-t border-slate-100 space-y-2">
                <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">Key Takeaways:</div>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                  {g.tips.map((t, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
