import { TemplateId } from '../types/resume';

export interface TemplateDefinition {
  id: TemplateId;
  name: string;
  category: 'ATS Clean' | 'Modern SaaS' | 'Creative & Tech' | 'Academic / CV';
  description: string;
  isPopular?: boolean;
  isATS100?: boolean;
  recommendedFont: string;
  recommendedColors: string[];
  layout: 'single-column' | 'two-column-left' | 'two-column-right' | 'sidebar' | 'header-card';
}

export const TEMPLATES: TemplateDefinition[] = [
  {
    id: 'ats-classic',
    name: 'ATS Classic Clean',
    category: 'ATS Clean',
    description: 'Single-column traditional layout optimized for 100% readability by Taleo, Workday, and Greenhouse.',
    isPopular: true,
    isATS100: true,
    recommendedFont: 'Merriweather',
    recommendedColors: ['#0F172A', '#1E3A8A', '#111827'],
    layout: 'single-column'
  },
  {
    id: 'ats-professional',
    name: 'ATS Professional Grid',
    category: 'ATS Clean',
    description: 'High-density structured layout with crisp horizontal dividers and bold role headers.',
    isATS100: true,
    recommendedFont: 'Inter',
    recommendedColors: ['#2563EB', '#0F172A', '#0284C7'],
    layout: 'single-column'
  },
  {
    id: 'ats-modern',
    name: 'ATS Modern Minimal',
    category: 'ATS Clean',
    description: 'Contemporary sans-serif aesthetic that passes all ATS parsers while looking stunning to human recruiters.',
    isPopular: true,
    isATS100: true,
    recommendedFont: 'Poppins',
    recommendedColors: ['#2563EB', '#7C3AED', '#0F172A'],
    layout: 'single-column'
  },
  {
    id: 'ats-executive',
    name: 'ATS Executive Prestige',
    category: 'ATS Clean',
    description: 'Refined serif typography with subtle borders suited for Directors, VPs, and C-Suite executives.',
    isATS100: true,
    recommendedFont: 'Playfair Display',
    recommendedColors: ['#1E293B', '#334155', '#475569'],
    layout: 'single-column'
  },
  {
    id: 'modern-blue',
    name: 'Modern SaaS Blue',
    category: 'Modern SaaS',
    description: 'Our flagship template featuring polished accent pill tags, colored section headers, and high scannability.',
    isPopular: true,
    isATS100: true,
    recommendedFont: 'Inter',
    recommendedColors: ['#2563EB', '#7C3AED', '#0284C7', '#06B6D4'],
    layout: 'single-column'
  },
  {
    id: 'modern-minimal',
    name: 'Modern Swiss Minimal',
    category: 'Modern SaaS',
    description: 'Understated elegance inspired by Swiss graphic design with generous typographic rhythm.',
    recommendedFont: 'Inter',
    recommendedColors: ['#0F172A', '#2563EB', '#059669'],
    layout: 'single-column'
  },
  {
    id: 'modern-professional',
    name: 'Modern Executive Dual',
    category: 'Modern SaaS',
    description: 'Balanced two-column layout with left sidebar for quick stats, skills, education, and languages.',
    isPopular: true,
    recommendedFont: 'Inter',
    recommendedColors: ['#0284C7', '#2563EB', '#0F172A'],
    layout: 'two-column-left'
  },
  {
    id: 'modern-tech',
    name: 'Modern Tech & Developer',
    category: 'Creative & Tech',
    description: 'Engineered for developers, engineers, and product builders with technology tags and GitHub links.',
    isPopular: true,
    recommendedFont: 'Fira Code',
    recommendedColors: ['#06B6D4', '#2563EB', '#7C3AED'],
    layout: 'two-column-right'
  },
  {
    id: 'creative-portfolio',
    name: 'Creative Brand & Design',
    category: 'Creative & Tech',
    description: 'Vibrant header banner with accent badges and project portfolio highlights for creatives.',
    recommendedFont: 'Poppins',
    recommendedColors: ['#7C3AED', '#EC4899', '#2563EB'],
    layout: 'header-card'
  },
  {
    id: 'designer-split',
    name: 'Designer Split Column',
    category: 'Creative & Tech',
    description: 'Asymmetric modern split with colored background panel for personal info & contact details.',
    recommendedFont: 'Inter',
    recommendedColors: ['#0F172A', '#2563EB', '#7C3AED'],
    layout: 'sidebar'
  },
  {
    id: 'academic-cv',
    name: 'Academic Curriculum Vitae',
    category: 'Academic / CV',
    description: 'Multi-page expansive academic layout with dedicated sections for publications, honors, and research.',
    recommendedFont: 'Lora',
    recommendedColors: ['#1E293B', '#334155'],
    layout: 'single-column'
  },
  {
    id: 'research-cv',
    name: 'Research & Science Scholar',
    category: 'Academic / CV',
    description: 'Clean formal layout emphasizing research experience, grants, patents, and academic citations.',
    recommendedFont: 'Merriweather',
    recommendedColors: ['#0F172A', '#1E3A8A'],
    layout: 'single-column'
  }
];

export const FONT_OPTIONS = [
  { name: 'Inter (Modern Sans)', value: 'Inter' },
  { name: 'Poppins (Clean Geometric)', value: 'Poppins' },
  { name: 'Roboto (Neutral Sans)', value: 'Roboto' },
  { name: 'Merriweather (Classic Serif)', value: 'Merriweather' },
  { name: 'Playfair Display (Executive Serif)', value: 'Playfair Display' },
  { name: 'Lora (Editorial Serif)', value: 'Lora' },
  { name: 'Fira Code (Tech Monospace)', value: 'Fira Code' },
  { name: 'Cinzel (Formal Classic)', value: 'Cinzel' },
];

export const COLOR_PALETTES = [
  { name: 'ResumeAI Blue', primary: '#2563EB', secondary: '#7C3AED' },
  { name: 'Deep Indigo', primary: '#4F46E5', secondary: '#06B6D4' },
  { name: 'Cyber Cyan', primary: '#0891B2', secondary: '#2563EB' },
  { name: 'Slate Executive', primary: '#0F172A', secondary: '#475569' },
  { name: 'Emerald Forest', primary: '#059669', secondary: '#10B981' },
  { name: 'Ruby Prestige', primary: '#BE123C', secondary: '#FB7185' },
  { name: 'Royal Violet', primary: '#7C3AED', secondary: '#C084FC' },
  { name: 'Charcoal Minimal', primary: '#18181B', secondary: '#71717A' },
];
