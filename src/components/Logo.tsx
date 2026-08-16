import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ size = 'md', showText = true, className = '' }) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl',
  };

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      <div className={`relative ${iconSizes[size]} shrink-0 flex items-center justify-center`}>
        {/* Robot + Resume Mark SVG */}
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06B6D4" />
              <stop offset="50%" stopColor="#2563EB" />
              <stop offset="100%" stopColor="#7C3AED" />
            </linearGradient>
            <linearGradient id="cyanBlue" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#06B6D4" />
              <stop offset="100%" stopColor="#2563EB" />
            </linearGradient>
            <linearGradient id="botGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#E2E8F0" />
            </linearGradient>
          </defs>

          {/* Outer circle glow backdrop */}
          <circle cx="50" cy="50" r="46" fill="url(#bgGrad)" />

          {/* Resume Sheet */}
          <rect x="36" y="16" width="46" height="64" rx="6" fill="#FFFFFF" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.15))" />
          
          {/* Resume Header & Lines */}
          <circle cx="48" cy="28" r="5" fill="#2563EB" />
          <rect x="58" y="25" width="18" height="3" rx="1.5" fill="#94A3B8" />
          <rect x="58" y="30" width="12" height="2.5" rx="1.25" fill="#CBD5E1" />
          
          {/* Resume Bullet lines */}
          <rect x="44" y="40" width="30" height="2.5" rx="1.25" fill="#E2E8F0" />
          <rect x="44" y="46" width="32" height="2.5" rx="1.25" fill="#CBD5E1" />
          <rect x="44" y="52" width="26" height="2.5" rx="1.25" fill="#E2E8F0" />
          <rect x="44" y="58" width="30" height="2.5" rx="1.25" fill="#CBD5E1" />

          {/* Mini Checkmark Badge */}
          <circle cx="70" cy="68" r="8" fill="#10B981" />
          <path d="M66.5 68L69 70.5L73.5 65.5" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

          {/* Robot Helper */}
          {/* Antenna */}
          <path d="M28 26L25 21" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
          <circle cx="24" cy="20" r="3" fill="#06B6D4" />

          {/* Robot Head */}
          <rect x="15" y="26" width="26" height="22" rx="9" fill="url(#botGrad)" stroke="#2563EB" strokeWidth="1.5" />
          {/* Ears / Headphone knobs */}
          <rect x="12" y="32" width="4" height="10" rx="2" fill="#2563EB" />
          <rect x="39" y="32" width="4" height="10" rx="2" fill="#2563EB" />
          
          {/* Robot Face Screen */}
          <rect x="18" y="29" width="20" height="16" rx="6" fill="#0F172A" />
          {/* Smiling Eyes */}
          <path d="M21 36Q23 33 25 36" stroke="#06B6D4" strokeWidth="2" strokeLinecap="round" />
          <path d="M31 36Q33 33 35 36" stroke="#06B6D4" strokeWidth="2" strokeLinecap="round" />
          <path d="M26 40Q28 42 30 40" stroke="#06B6D4" strokeWidth="1.5" strokeLinecap="round" />

          {/* Robot Body */}
          <rect x="18" y="50" width="20" height="16" rx="6" fill="url(#botGrad)" stroke="#2563EB" strokeWidth="1.5" />
          {/* AI Badge on Chest */}
          <rect x="22" y="54" width="12" height="8" rx="3" fill="#2563EB" />
          <text x="28" y="60.5" fill="#FFFFFF" fontSize="5.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">AI</text>

          {/* Pointing Arm */}
          <path d="M34 54C38 52 42 50 45 46" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" />
          <path d="M34 54C38 52 42 50 45 46" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col justify-center leading-none">
          <div className="flex items-center gap-1.5">
            <span className={`font-black tracking-tight ${textSizes[size]} bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent`}>
              ResumeAI
            </span>
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-[10px] tracking-wider uppercase px-1.5 py-0.5 rounded-full">
              PRO
            </span>
          </div>
          <span className="text-[10px] font-semibold text-slate-500 tracking-wider uppercase mt-0.5">
            AI Resume Builder
          </span>
        </div>
      )}
    </div>
  );
};
