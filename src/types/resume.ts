export type TemplateId = 
  | 'ats-classic'
  | 'ats-professional'
  | 'ats-modern'
  | 'ats-executive'
  | 'modern-blue'
  | 'modern-minimal'
  | 'modern-professional'
  | 'modern-tech'
  | 'creative-portfolio'
  | 'designer-split'
  | 'academic-cv'
  | 'research-cv';

export type FontOption = 'Inter' | 'Roboto' | 'Merriweather' | 'Playfair Display' | 'Fira Code' | 'Lora' | 'Poppins' | 'Cinzel';

export interface ResumeStyling {
  template: TemplateId;
  primaryColor: string;
  secondaryColor?: string;
  textColor: string;
  backgroundColor: string;
  fontFamily: FontOption;
  fontSize: 'compact' | 'normal' | 'spacious';
  spacing: 'tight' | 'normal' | 'relaxed';
  margins: 'narrow' | 'normal' | 'wide';
  showPhoto: boolean;
  photoUrl?: string;
  showIcons: boolean;
  showDividers: boolean;
  sectionOrder: string[];
}

export interface PersonalInfo {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  website?: string;
  linkedin?: string;
  github?: string;
  portfolio?: string;
  profilePhoto?: string;
}

export interface WorkExperience {
  id: string;
  jobTitle: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  highlights: string[];
  technologies?: string[];
}

export interface Education {
  id: string;
  degree: string;
  fieldOfStudy: string;
  institution: string;
  location: string;
  graduationDate: string;
  gpa?: string;
  honors?: string;
  highlights?: string[];
}

export interface SkillCategory {
  category: string; // e.g. "Technical Skills", "Soft Skills", "Tools & Frameworks"
  skills: string[];
}

export interface Project {
  id: string;
  name: string;
  role?: string;
  link?: string;
  githubLink?: string;
  startDate?: string;
  endDate?: string;
  highlights: string[];
  technologies: string[];
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialUrl?: string;
  credentialId?: string;
}

export interface Achievement {
  id: string;
  title: string;
  organization?: string;
  date?: string;
  description: string;
}

export interface LanguageItem {
  id: string;
  language: string;
  proficiency: 'Native' | 'Fluent' | 'Professional' | 'Intermediate' | 'Basic';
}

export interface VolunteerExperience {
  id: string;
  role: string;
  organization: string;
  startDate: string;
  endDate?: string;
  isCurrent?: boolean;
  highlights: string[];
}

export interface Publication {
  id: string;
  title: string;
  publisher: string;
  date: string;
  url?: string;
  description: string;
}

export interface AwardItem {
  id: string;
  title: string;
  awarder: string;
  date: string;
  summary: string;
}

export interface ReferenceItem {
  id: string;
  name: string;
  role: string;
  company: string;
  email: string;
  phone?: string;
}

export interface ResumeData {
  id: string;
  title: string;
  targetRole: string;
  targetIndustry?: string;
  lastModified: string;
  createdAt: string;
  atsScore: number;
  personalInfo: PersonalInfo;
  summary: string;
  experiences: WorkExperience[];
  education: Education[];
  skillCategories: SkillCategory[];
  skills: string[]; // flat list for fast indexing
  projects: Project[];
  certifications: Certification[];
  achievements: Achievement[];
  languages: LanguageItem[];
  volunteer: VolunteerExperience[];
  publications: Publication[];
  awards: AwardItem[];
  references: ReferenceItem[];
  styling: ResumeStyling;
  isShared?: boolean;
  shareId?: string;
  versionLabel?: string;
}

export interface ATSAnalysisResult {
  score: number;
  breakdown: {
    keywordMatch: number;
    experienceImpact: number;
    formattingStructure: number;
    grammarClarity: number;
    skillsCoverage: number;
  };
  matchedKeywords: string[];
  missingKeywords: string[];
  strengths: string[];
  criticalIssues: string[];
  actionableRecommendations: string[];
  quantifiableMetricsCount: number;
  actionVerbsCount: number;
  wordCount: number;
  readingTimeMinutes: number;
}

export interface JobMatchAnalysis {
  jobTitle: string;
  matchPercentage: number;
  requiredSkillsMatched: string[];
  requiredSkillsMissing: string[];
  recommendedImprovements: string[];
  optimizedSummarySuggestion?: string;
  optimizedBulletPoints?: {
    experienceId: string;
    original: string;
    suggested: string;
    reason: string;
  }[];
}

export interface CoverLetterData {
  id: string;
  title: string;
  recipientName: string;
  recipientTitle: string;
  companyName: string;
  companyAddress?: string;
  targetRole: string;
  date: string;
  tone: 'Professional' | 'Executive' | 'Confident' | 'Concise' | 'Creative' | 'Career-Change';
  bodyParagraphs: string[];
  signatureName: string;
  email: string;
  phone: string;
  lastModified: string;
}

export interface InterviewQuestion {
  id: string;
  type: 'Behavioral' | 'Technical' | 'Situational' | 'Resume-Specific' | 'HR';
  question: string;
  contextOrReason?: string;
  suggestedFramework?: string; // e.g. STAR method
  sampleAnswerGuidance?: string;
}

export interface LinkedInOptimization {
  headlines: string[];
  aboutSection: string;
  topSkillsToFeature: string[];
  featuredItemsIdeas: string[];
  experienceBulletUpgrades: { role: string; bullet: string }[];
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  jobTitle: string;
  experienceYears: number;
  industry: string;
  preferredRole: string;
  aiCredits: number;
  plan: 'Free' | 'Pro' | 'Premium';
  theme: 'light' | 'dark' | 'system';
  provider?: 'linkedin' | 'email';
  linkedInUrl?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  summary: string;
  category: 'ATS Secrets' | 'Resume Tips' | 'Interview Mastery' | 'Career Growth' | 'LinkedIn';
  readTime: string;
  date: string;
  author: string;
  content: string;
}
