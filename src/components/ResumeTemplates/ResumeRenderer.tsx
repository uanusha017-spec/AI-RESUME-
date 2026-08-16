import React from 'react';
import { ResumeData } from '../../types/resume';
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Linkedin,
  Github,
  Award,
  BookOpen,
  Briefcase,
  GraduationCap,
  Sparkles,
  Code,
  CheckCircle2
} from 'lucide-react';

interface ResumeRendererProps {
  resume: ResumeData;
  scale?: number;
  previewMode?: boolean;
  isPrint?: boolean;
}

export const ResumeRenderer: React.FC<ResumeRendererProps> = ({
  resume,
  scale = 1,
  previewMode = false,
  isPrint = false,
}) => {
  const { styling, personalInfo, summary, experiences, education, skillCategories, skills, projects, certifications, achievements, languages, publications, awards, volunteer, references } = resume;
  const primaryColor = styling?.primaryColor || '#2563EB';
  const secondaryColor = styling?.secondaryColor || '#7C3AED';
  const fontFamily = styling?.fontFamily || 'Inter';
  const template = styling?.template || 'modern-blue';

  const fontClass = {
    'Inter': 'font-sans',
    'Poppins': 'font-sans font-[Poppins]',
    'Roboto': 'font-sans',
    'Merriweather': 'font-serif',
    'Playfair Display': 'font-serif',
    'Lora': 'font-serif',
    'Fira Code': 'font-mono',
    'Cinzel': 'font-serif',
  }[fontFamily] || 'font-sans';

  const marginClass = {
    narrow: 'p-6 sm:p-8',
    normal: 'p-8 sm:p-10',
    wide: 'p-10 sm:p-12',
  }[styling?.margins || 'normal'];

  const spacingClass = {
    tight: 'space-y-4',
    normal: 'space-y-6',
    relaxed: 'space-y-8',
  }[styling?.spacing || 'normal'];

  const fontSizeClass = {
    compact: 'text-xs leading-relaxed',
    normal: 'text-sm leading-normal',
    spacious: 'text-base leading-relaxed',
  }[styling?.fontSize || 'normal'];

  // Helper Section Title
  const SectionHeader = ({ title, icon: Icon }: { title: string; icon?: any }) => {
    if (template === 'ats-classic' || template === 'academic-cv' || template === 'research-cv') {
      return (
        <div className="border-b border-slate-300 pb-1 mb-3">
          <h2 className="text-sm sm:text-base font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
            {title}
          </h2>
        </div>
      );
    }

    if (template === 'ats-executive') {
      return (
        <div className="border-b-2 pb-1 mb-3 flex items-center justify-between" style={{ borderColor: primaryColor }}>
          <h2 className="text-sm sm:text-base font-serif font-bold tracking-wider uppercase" style={{ color: primaryColor }}>
            {title}
          </h2>
          <span className="h-1 w-8 rounded-full" style={{ backgroundColor: primaryColor }} />
        </div>
      );
    }

    if (template === 'modern-tech') {
      return (
        <div className="flex items-center gap-2 border-b border-slate-200 pb-1.5 mb-3 font-mono">
          <span className="text-xs font-bold px-2 py-0.5 rounded text-white" style={{ backgroundColor: primaryColor }}>
            # {title}
          </span>
          <span className="text-xs text-slate-400">// section</span>
        </div>
      );
    }

    return (
      <div className="flex items-center gap-2 border-b border-slate-200 pb-1.5 mb-3">
        {Icon && styling.showIcons && (
          <Icon className="w-4 h-4 shrink-0" style={{ color: primaryColor }} />
        )}
        <h2 className="text-sm sm:text-base font-bold tracking-tight uppercase" style={{ color: primaryColor }}>
          {title}
        </h2>
      </div>
    );
  };

  // Contacts block
  const ContactRow = ({ compact = false }: { compact?: boolean }) => (
    <div className={`flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-xs text-slate-600 max-w-full ${compact ? 'flex-col sm:flex-row' : ''}`}>
      {personalInfo.email && (
        <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-1 hover:text-blue-600 transition-colors break-all max-w-full">
          <Mail className="w-3.5 h-3.5 shrink-0 opacity-70" />
          <span className="break-all">{personalInfo.email}</span>
        </a>
      )}
      {personalInfo.phone && (
        <a href={`tel:${personalInfo.phone}`} className="flex items-center gap-1 hover:text-blue-600 transition-colors shrink-0">
          <Phone className="w-3.5 h-3.5 shrink-0 opacity-70" />
          <span>{personalInfo.phone}</span>
        </a>
      )}
      {personalInfo.location && (
        <div className="flex items-center gap-1 shrink-0">
          <MapPin className="w-3.5 h-3.5 shrink-0 opacity-70" />
          <span>{personalInfo.location}</span>
        </div>
      )}
      {personalInfo.linkedin && (
        <a href={`https://${personalInfo.linkedin.replace(/^https?:\/\//, '')}`} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-blue-600 transition-colors break-all max-w-full">
          <Linkedin className="w-3.5 h-3.5 shrink-0 opacity-70" />
          <span className="break-all">{personalInfo.linkedin.replace(/^https?:\/\/(www\.)?/, '')}</span>
        </a>
      )}
      {personalInfo.github && (
        <a href={`https://${personalInfo.github.replace(/^https?:\/\//, '')}`} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-blue-600 transition-colors break-all max-w-full">
          <Github className="w-3.5 h-3.5 shrink-0 opacity-70" />
          <span className="break-all">{personalInfo.github.replace(/^https?:\/\/(www\.)?/, '')}</span>
        </a>
      )}
      {personalInfo.website && (
        <a href={`https://${personalInfo.website.replace(/^https?:\/\//, '')}`} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-blue-600 transition-colors break-all max-w-full">
          <Globe className="w-3.5 h-3.5 shrink-0 opacity-70" />
          <span className="break-all">{personalInfo.website.replace(/^https?:\/\/(www\.)?/, '')}</span>
        </a>
      )}
    </div>
  );

  // Experience Block
  const ExperienceSection = () => (
    experiences && experiences.length > 0 ? (
      <div className="space-y-4">
        <SectionHeader title="Work Experience" icon={Briefcase} />
        <div className="space-y-4">
          {experiences.map((exp) => (
            <div key={exp.id} className="space-y-1.5">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                <div>
                  <span className="font-bold text-slate-900 text-sm sm:text-base">
                    {exp.jobTitle}
                  </span>
                  <span className="text-slate-600 font-medium text-xs sm:text-sm">
                    {' '}— {exp.company}
                  </span>
                  {exp.location && (
                    <span className="text-slate-500 text-xs font-normal">
                      , {exp.location}
                    </span>
                  )}
                </div>
                <div className="text-xs font-medium text-slate-500 shrink-0">
                  {exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate || 'Present'}
                </div>
              </div>

              {exp.technologies && exp.technologies.length > 0 && (
                <div className="flex flex-wrap gap-1 my-1">
                  {exp.technologies.map((t, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}

              {exp.highlights && exp.highlights.length > 0 && (
                <ul className="list-disc list-outside pl-4 space-y-1 text-slate-700 text-xs sm:text-sm">
                  {exp.highlights.map((h, i) => (
                    <li key={i} className="leading-normal">
                      {h}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    ) : null
  );

  // Education Block
  const EducationSection = () => (
    education && education.length > 0 ? (
      <div className="space-y-3">
        <SectionHeader title="Education" icon={GraduationCap} />
        <div className="space-y-3">
          {education.map((edu) => (
            <div key={edu.id} className="space-y-0.5">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                <div>
                  <span className="font-bold text-slate-900 text-xs sm:text-sm">
                    {edu.degree} in {edu.fieldOfStudy}
                  </span>
                  <span className="text-slate-600 text-xs">
                    {' '}— {edu.institution}
                  </span>
                  {edu.location && (
                    <span className="text-slate-500 text-xs">, {edu.location}</span>
                  )}
                </div>
                <span className="text-xs font-medium text-slate-500 shrink-0">
                  {edu.graduationDate}
                </span>
              </div>
              {edu.gpa && (
                <div className="text-xs text-slate-600">
                  <span className="font-semibold">GPA:</span> {edu.gpa} {edu.honors && `• ${edu.honors}`}
                </div>
              )}
              {edu.highlights && edu.highlights.length > 0 && (
                <div className="text-xs text-slate-600">
                  {edu.highlights.join('; ')}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    ) : null
  );

  // Skills Block
  const SkillsSection = ({ pills = true }: { pills?: boolean }) => (
    (skillCategories && skillCategories.length > 0) || (skills && skills.length > 0) ? (
      <div className="space-y-2">
        <SectionHeader title="Skills & Competencies" icon={Code} />
        {skillCategories && skillCategories.length > 0 ? (
          <div className="space-y-2 text-xs sm:text-sm">
            {skillCategories.map((cat, i) => (
              <div key={i} className="flex flex-col sm:flex-row sm:items-start gap-1">
                <span className="font-bold text-slate-800 shrink-0 min-w-[140px]">
                  {cat.category}:
                </span>
                {pills ? (
                  <div className="flex flex-wrap gap-1.5">
                    {cat.skills.map((s, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-2 py-0.5 rounded-md font-medium text-slate-800 bg-slate-100 border border-slate-200"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                ) : (
                  <span className="text-slate-700">{cat.skills.join(', ')}</span>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-wrap gap-1.5">
            {skills.map((s, idx) => (
              <span
                key={idx}
                className="text-xs px-2.5 py-1 rounded-md font-medium text-slate-800 bg-slate-100 border border-slate-200"
              >
                {s}
              </span>
            ))}
          </div>
        )}
      </div>
    ) : null
  );

  // Projects Block
  const ProjectsSection = () => (
    projects && projects.length > 0 ? (
      <div className="space-y-3">
        <SectionHeader title="Projects" icon={Sparkles} />
        <div className="space-y-3">
          {projects.map((proj) => (
            <div key={proj.id} className="space-y-1">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold text-slate-900 text-xs sm:text-sm">
                    {proj.name}
                  </span>
                  {proj.role && (
                    <span className="text-xs text-slate-500 font-medium">
                      ({proj.role})
                    </span>
                  )}
                  {proj.link && (
                    <a
                      href={proj.link}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-blue-600 hover:underline flex items-center gap-0.5"
                    >
                      [Live Demo]
                    </a>
                  )}
                  {proj.githubLink && (
                    <a
                      href={proj.githubLink}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-slate-600 hover:underline flex items-center gap-0.5"
                    >
                      [Code]
                    </a>
                  )}
                </div>
                {proj.startDate && (
                  <span className="text-xs text-slate-500">
                    {proj.startDate} {proj.endDate && `– ${proj.endDate}`}
                  </span>
                )}
              </div>

              {proj.technologies && proj.technologies.length > 0 && (
                <div className="text-xs text-slate-500">
                  <span className="font-medium text-slate-700">Tech: </span>
                  {proj.technologies.join(', ')}
                </div>
              )}

              {proj.highlights && proj.highlights.length > 0 && (
                <ul className="list-disc list-outside pl-4 space-y-0.5 text-xs sm:text-sm text-slate-700">
                  {proj.highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    ) : null
  );

  // Certifications Block
  const CertificationsSection = () => (
    certifications && certifications.length > 0 ? (
      <div className="space-y-2">
        <SectionHeader title="Certifications" icon={Award} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
          {certifications.map((cert) => (
            <div key={cert.id} className="flex items-start gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5 text-emerald-600" />
              <div>
                <div className="font-semibold text-slate-900">{cert.name}</div>
                <div className="text-slate-500 text-xs">
                  {cert.issuer} {cert.issueDate && `• ${cert.issueDate}`}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    ) : null
  );

  // Languages Block
  const LanguagesSection = () => (
    languages && languages.length > 0 ? (
      <div className="space-y-2">
        <SectionHeader title="Languages" icon={Globe} />
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs sm:text-sm">
          {languages.map((l) => (
            <span key={l.id} className="text-slate-800">
              <span className="font-semibold">{l.language}</span>{' '}
              <span className="text-slate-500">({l.proficiency})</span>
            </span>
          ))}
        </div>
      </div>
    ) : null
  );

  // Two Column Layout for 'modern-professional' & 'designer-split'
  if (template === 'modern-professional' || template === 'designer-split') {
    return (
      <div
        id="resume-document"
        className={`bg-white text-slate-800 shadow-xl transition-all ${fontClass} ${fontSizeClass} ${
          isPrint ? 'shadow-none w-full' : 'w-full max-w-[850px] mx-auto min-h-[1100px]'
        }`}
        style={{ transform: `scale(${scale})`, transformOrigin: 'top center' }}
      >
        {/* Top Header Card */}
        <div className="p-5 sm:p-8 md:p-10 border-b border-slate-200" style={{ backgroundColor: template === 'designer-split' ? '#0F172A' : '#F8FAFC' }}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className={`text-2xl sm:text-3xl font-black tracking-tight ${template === 'designer-split' ? 'text-white' : 'text-slate-900'}`}>
                {personalInfo.fullName || 'Your Name'}
              </h1>
              <p className="text-base sm:text-lg font-semibold mt-1" style={{ color: primaryColor }}>
                {personalInfo.jobTitle || 'Your Target Title'}
              </p>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-200/40">
            <ContactRow />
          </div>
        </div>

        {/* 2-Column Body */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 p-5 sm:p-8 md:p-10">
          {/* Main Col (7/12) */}
          <div className="md:col-span-8 space-y-6">
            {summary && (
              <div>
                <SectionHeader title="Professional Summary" icon={BookOpen} />
                <p className="text-slate-700 leading-relaxed text-xs sm:text-sm">
                  {summary}
                </p>
              </div>
            )}
            <ExperienceSection />
            <ProjectsSection />
          </div>

          {/* Sidebar Col (4/12) */}
          <div className="md:col-span-4 space-y-6 border-t md:border-t-0 md:border-l md:border-slate-200 md:pl-6">
            <SkillsSection pills={true} />
            <EducationSection />
            <CertificationsSection />
            <LanguagesSection />
          </div>
        </div>
      </div>
    );
  }

  // Modern Tech Template Layout
  if (template === 'modern-tech') {
    return (
      <div
        id="resume-document"
        className={`bg-white text-slate-800 shadow-xl transition-all ${fontClass} ${fontSizeClass} ${marginClass} ${
          isPrint ? 'shadow-none w-full' : 'w-full max-w-[850px] mx-auto min-h-[1100px]'
        }`}
        style={{ transform: `scale(${scale})`, transformOrigin: 'top center' }}
      >
        {/* Tech Header */}
        <div className="border-b-2 border-slate-900 pb-5 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="text-xs font-mono text-cyan-600 font-bold mb-1">// SYSTEM.RESUME</div>
              <h1 className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-slate-900">
                {personalInfo.fullName || 'Candidate Name'}
              </h1>
              <p className="text-sm sm:text-base font-mono font-semibold text-blue-600 mt-0.5">
                const role = "{personalInfo.jobTitle || 'Software Engineer'}";
              </p>
            </div>
          </div>
          <div className="mt-3">
            <ContactRow />
          </div>
        </div>

        <div className={spacingClass}>
          {summary && (
            <div>
              <SectionHeader title="Summary" />
              <p className="text-slate-700 font-mono text-xs sm:text-sm leading-relaxed bg-slate-50 p-3 rounded border border-slate-200">
                {summary}
              </p>
            </div>
          )}
          <SkillsSection pills={true} />
          <ExperienceSection />
          <ProjectsSection />
          <EducationSection />
          <CertificationsSection />
          <LanguagesSection />
        </div>
      </div>
    );
  }

  // Default Clean Single-Column Renderer (ATS Classic, ATS Modern, Modern Blue, ATS Executive, etc.)
  return (
    <div
      id="resume-document"
      className={`bg-white text-slate-800 shadow-xl transition-all ${fontClass} ${fontSizeClass} ${marginClass} ${
        isPrint ? 'shadow-none w-full' : 'w-full max-w-[850px] mx-auto min-h-[1100px]'
      }`}
      style={{ transform: `scale(${scale})`, transformOrigin: 'top center' }}
    >
      {/* Header */}
      <div className="text-center pb-5 mb-6 border-b border-slate-200 space-y-2">
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 uppercase">
          {personalInfo.fullName || 'Your Full Name'}
        </h1>
        <p className="text-sm sm:text-base font-semibold tracking-wide" style={{ color: primaryColor }}>
          {personalInfo.jobTitle || 'Target Job Title / Specialization'}
        </p>
        <div className="flex justify-center pt-1">
          <ContactRow />
        </div>
      </div>

      {/* Sections */}
      <div className={spacingClass}>
        {summary && (
          <div>
            <SectionHeader title="Professional Summary" icon={BookOpen} />
            <p className="text-slate-700 leading-relaxed text-xs sm:text-sm">
              {summary}
            </p>
          </div>
        )}

        <ExperienceSection />
        <SkillsSection pills={template === 'modern-blue' || template === 'ats-modern'} />
        <EducationSection />
        <ProjectsSection />
        <CertificationsSection />
        <LanguagesSection />

        {/* Optional Academic / Research / Awards */}
        {publications && publications.length > 0 && (
          <div>
            <SectionHeader title="Publications & Research" icon={BookOpen} />
            <div className="space-y-2">
              {publications.map((p) => (
                <div key={p.id} className="text-xs sm:text-sm">
                  <span className="font-bold text-slate-900">{p.title}</span>
                  <span className="text-slate-600"> — {p.publisher} ({p.date})</span>
                  {p.description && <p className="text-slate-700 text-xs mt-0.5">{p.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
