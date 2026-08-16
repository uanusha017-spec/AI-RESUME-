import React from 'react';
import heroBannerImg from '../assets/images/hero_career_banner_1786886172807.jpg';
import workspaceBannerImg from '../assets/images/workspace_banner_1786886207884.jpg';

export interface PageBannerProps {
  badgeText?: string;
  badgeIcon?: React.ReactNode;
  title: string;
  subtitle: string;
  imageVariant?: 'hero' | 'workspace' | 'custom';
  customImageSrc?: string;
  actions?: React.ReactNode;
  stats?: Array<{ label: string; value: string; icon?: React.ReactNode }>;
  compact?: boolean;
}

export const PageBanner: React.FC<PageBannerProps> = ({
  badgeText,
  badgeIcon,
  title,
  subtitle,
  imageVariant = 'hero',
  customImageSrc,
  actions,
  stats,
  compact = false,
}) => {
  const imgSrc =
    imageVariant === 'workspace'
      ? workspaceBannerImg
      : customImageSrc || heroBannerImg;

  return (
    <div className={`relative overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-800 bg-slate-950 text-white shadow-xl ${
      compact ? 'p-4 sm:p-6 md:p-8' : 'p-4 sm:p-8 lg:p-12'
    }`}>
      {/* Background Banner Image with Dark Multi-Gradient Overlay for Perfect Legibility */}
      <div className="absolute inset-0 z-0">
        <img
          src={imgSrc}
          alt="Banner background"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center opacity-35 scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-blue-950/75" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 max-w-4xl space-y-3 sm:space-y-4">
        {badgeText && (
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-[11px] sm:text-xs font-bold tracking-wide backdrop-blur-sm max-w-full truncate">
            {badgeIcon}
            <span className="truncate">{badgeText}</span>
          </div>
        )}

        <div className="space-y-1.5 sm:space-y-2">
          <h1 className="text-xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white leading-tight">
            {title}
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-slate-300 max-w-2xl leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Optional Stats or Highlights */}
        {stats && stats.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 pt-1 max-w-xl">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="px-2.5 py-2 sm:px-3.5 sm:py-2.5 rounded-xl bg-white/10 border border-white/10 backdrop-blur-md"
              >
                <div className="text-[11px] sm:text-xs text-slate-300 flex items-center gap-1 sm:gap-1.5 font-medium truncate">
                  {stat.icon}
                  <span className="truncate">{stat.label}</span>
                </div>
                <div className="text-sm sm:text-base md:text-lg font-black text-white font-mono mt-0.5">
                  {stat.value}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Actions CTA */}
        {actions && (
          <div className="pt-2 flex flex-wrap items-center gap-2 sm:gap-3">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
};
