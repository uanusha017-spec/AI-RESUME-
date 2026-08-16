import React, { createContext, useContext, useState, useEffect } from 'react';
import { CoverLetterData, ResumeData, UserProfile } from '../types/resume';
import { SAMPLE_RESUMES } from '../data/sampleResumes';

interface NotificationToast {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  message: string;
  timestamp: number;
}

interface ResumeContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  resumes: ResumeData[];
  currentResume: ResumeData;
  coverLetters: CoverLetterData[];
  currentCoverLetter: CoverLetterData | null;
  activeTab: string;
  notifications: NotificationToast[];
  aiCredits: number;
  useCredit: (amount?: number) => boolean;
  addCredit: (amount: number) => void;
  upgradePlan: (plan: 'Free' | 'Pro' | 'Premium', additionalCredits?: number) => void;
  importResume: (data: Partial<ResumeData>, customTitle?: string) => ResumeData;
  setActiveTab: (tab: string) => void;
  setCurrentResume: (resume: ResumeData) => void;
  updateCurrentResume: (updater: Partial<ResumeData> | ((prev: ResumeData) => ResumeData)) => void;
  saveResume: (resume: ResumeData) => void;
  deleteResume: (id: string) => void;
  duplicateResume: (id: string) => void;
  createNewResume: (templateId?: string, targetRole?: string) => ResumeData;
  loadSampleResume: (sampleId: string) => void;
  saveCoverLetter: (cl: CoverLetterData) => void;
  deleteCoverLetter: (id: string) => void;
  setCurrentCoverLetter: (cl: CoverLetterData | null) => void;
  login: (email: string, name?: string, jobTitle?: string, provider?: 'email' | 'linkedin', linkedInUrl?: string) => void;
  logout: () => void;
  addNotification: (message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  removeNotification: (id: string) => void;
  // History Undo/Redo
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY_RESUMES = 'resumeai_pro_resumes_v2';
const LOCAL_STORAGE_KEY_USER = 'resumeai_pro_user_v2';
const LOCAL_STORAGE_KEY_CLS = 'resumeai_pro_cover_letters_v2';

export const ResumeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Resumes list state
  const [resumes, setResumes] = useState<ResumeData[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY_RESUMES);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse resumes', e);
      }
    }
    return SAMPLE_RESUMES;
  });

  // Current active resume
  const [currentResume, setCurrentResumeState] = useState<ResumeData>(() => {
    return resumes[0] || SAMPLE_RESUMES[0];
  });

  // Undo / Redo stacks
  const [history, setHistory] = useState<ResumeData[]>([currentResume]);
  const [historyIndex, setHistoryIndex] = useState<number>(0);

  // Cover letters
  const [coverLetters, setCoverLetters] = useState<CoverLetterData[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY_CLS);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse cover letters', e);
      }
    }
    return [
      {
        id: 'cl-sample-1',
        title: 'Senior Software Engineer Cover Letter',
        recipientName: 'Engineering Hiring Team',
        recipientTitle: 'Director of Engineering',
        companyName: 'Stripe',
        companyAddress: 'San Francisco, CA',
        targetRole: 'Senior Full Stack Software Engineer',
        date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        tone: 'Professional',
        bodyParagraphs: [
          'I am writing to express my strong enthusiasm for the Senior Full Stack Software Engineer position at Stripe. Having engineered high-throughput distributed microservices and modern React applications scaling to 2M+ active users, I have long admired Stripe’s relentless focus on developer experience and economic infrastructure.',
          'In my recent role at CloudScale Technologies, I spearheaded the architectural redesign of our core analytics dashboard using React and TypeScript, reducing initial load latency by 58%. Additionally, I designed an event-driven AWS SQS queue handling 15,000 requests/sec with a 99.99% uptime SLA. I take pride in crafting maintainable, typed, and resilient systems.',
          'I would love the opportunity to bring my technical rigor and collaborative spirit to Stripe. Thank you for your consideration, and I look forward to the possibility of discussing how my experience can support your team’s upcoming roadmap.',
        ],
        signatureName: 'Alex Morgan',
        email: 'alex.morgan@example.com',
        phone: '+1 (555) 234-5678',
        lastModified: new Date().toISOString(),
      },
    ];
  });

  const [currentCoverLetter, setCurrentCoverLetter] = useState<CoverLetterData | null>(coverLetters[0] || null);

  // User Profile
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY_USER);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse user', e);
      }
    }
    return {
      id: 'demo-user-1',
      name: 'Alex Morgan',
      email: 'alex.morgan@example.com',
      jobTitle: 'Senior Full Stack Engineer',
      experienceYears: 6,
      industry: 'Technology & SaaS',
      preferredRole: 'Senior Full Stack Engineer',
      aiCredits: 100,
      plan: 'Pro',
      theme: 'light',
    };
  });

  // Navigation tab
  const [activeTab, setActiveTab] = useState<string>('landing');

  // Notifications
  const [notifications, setNotifications] = useState<NotificationToast[]>([]);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_RESUMES, JSON.stringify(resumes));
  }, [resumes]);

  useEffect(() => {
    if (user) {
      localStorage.setItem(LOCAL_STORAGE_KEY_USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(LOCAL_STORAGE_KEY_USER);
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_CLS, JSON.stringify(coverLetters));
  }, [coverLetters]);

  const addNotification = (message: string, type: 'success' | 'info' | 'warning' | 'error' = 'success') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setNotifications((prev) => [...prev, { id, message, type, timestamp: Date.now() }]);
    setTimeout(() => {
      removeNotification(id);
    }, 4000);
  };

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const useCredit = (amount = 1): boolean => {
    if (!user) return false;
    if (user.aiCredits < amount) {
      addNotification('You are out of AI credits. Upgrade to Pro for unlimited generation!', 'warning');
      return false;
    }
    setUser((prev) => (prev ? { ...prev, aiCredits: prev.aiCredits - amount } : null));
    return true;
  };

  const addCredit = (amount: number) => {
    setUser((prev) => (prev ? { ...prev, aiCredits: prev.aiCredits + amount } : null));
  };

  const upgradePlan = (plan: 'Free' | 'Pro' | 'Premium', additionalCredits = 500) => {
    setUser((prev) => {
      if (prev) {
        return {
          ...prev,
          plan,
          aiCredits: prev.aiCredits + additionalCredits,
        };
      }
      return {
        id: 'user-' + Date.now(),
        name: 'Pro Candidate',
        email: 'candidate@example.com',
        jobTitle: 'Professional',
        experienceYears: 5,
        industry: 'Technology & Business',
        preferredRole: 'Professional',
        aiCredits: additionalCredits,
        plan,
        theme: 'light',
        provider: 'email',
      };
    });
    addNotification(`🎉 Successfully upgraded to ${plan} Plan (+${additionalCredits} AI Credits added)!`, 'success');
  };

  const setCurrentResume = (resume: ResumeData) => {
    setCurrentResumeState(resume);
    setHistory([resume]);
    setHistoryIndex(0);
  };

  const updateCurrentResume = (updater: Partial<ResumeData> | ((prev: ResumeData) => ResumeData)) => {
    setCurrentResumeState((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : { ...prev, ...updater, lastModified: new Date().toISOString() };
      
      // Update in resumes array
      setResumes((all) => all.map((r) => (r.id === next.id ? next : r)));

      // Add to history
      setHistory((oldHist) => {
        const newHist = oldHist.slice(0, historyIndex + 1);
        return [...newHist, next].slice(-30); // keep last 30 states
      });
      setHistoryIndex((idx) => Math.min(idx + 1, 29));

      return next;
    });
  };

  const undo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      const targetState = history[newIndex];
      setHistoryIndex(newIndex);
      setCurrentResumeState(targetState);
      setResumes((all) => all.map((r) => (r.id === targetState.id ? targetState : r)));
      addNotification('Undid last change', 'info');
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      const targetState = history[newIndex];
      setHistoryIndex(newIndex);
      setCurrentResumeState(targetState);
      setResumes((all) => all.map((r) => (r.id === targetState.id ? targetState : r)));
      addNotification('Redid change', 'info');
    }
  };

  const saveResume = (resume: ResumeData) => {
    setResumes((prev) => {
      const exists = prev.some((r) => r.id === resume.id);
      if (exists) {
        return prev.map((r) => (r.id === resume.id ? resume : r));
      }
      return [resume, ...prev];
    });
    setCurrentResume(resume);
    addNotification('Resume saved successfully!', 'success');
  };

  const deleteResume = (id: string) => {
    setResumes((prev) => {
      const filtered = prev.filter((r) => r.id !== id);
      if (filtered.length === 0) {
        const defaultOne = SAMPLE_RESUMES[0];
        setCurrentResume(defaultOne);
        return [defaultOne];
      }
      if (currentResume.id === id) {
        setCurrentResume(filtered[0]);
      }
      return filtered;
    });
    addNotification('Resume deleted', 'info');
  };

  const duplicateResume = (id: string) => {
    const source = resumes.find((r) => r.id === id) || currentResume;
    const newCopy: ResumeData = {
      ...JSON.parse(JSON.stringify(source)),
      id: 'resume-' + Date.now(),
      title: `${source.title} (Copy)`,
      lastModified: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };
    setResumes((prev) => [newCopy, ...prev]);
    setCurrentResume(newCopy);
    addNotification('Resume duplicated! Switched to copy.', 'success');
  };

  const createNewResume = (templateId = 'modern-blue', targetRole = 'Software Engineer'): ResumeData => {
    const newResume: ResumeData = {
      id: 'resume-' + Date.now(),
      title: `${targetRole || 'Professional'} Resume`,
      targetRole: targetRole || 'Professional',
      targetIndustry: 'Technology',
      lastModified: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      atsScore: 78,
      personalInfo: {
        fullName: user?.name || 'Your Full Name',
        jobTitle: targetRole || 'Target Job Title',
        email: user?.email || 'your.email@example.com',
        phone: '+1 (555) 000-0000',
        location: 'City, State',
        linkedin: 'linkedin.com/in/yourprofile',
        website: 'yourwebsite.com',
      },
      summary: 'Results-oriented professional with proven background in project execution, problem solving, and cross-functional leadership.',
      experiences: [
        {
          id: 'exp-new-1',
          jobTitle: targetRole || 'Lead Specialist',
          company: 'Current or Previous Company',
          location: 'City, State',
          startDate: '2023-01',
          endDate: '',
          isCurrent: true,
          technologies: ['Key Tools', 'Best Practices'],
          highlights: [
            'Led cross-functional initiatives resulting in a [20%] increase in overall project delivery efficiency.',
            'Collaborated with key stakeholders to establish standardized workflows, saving [10+ hours] weekly.',
            'Spearheaded performance optimization efforts across core deliverables.',
          ],
        },
      ],
      education: [
        {
          id: 'edu-new-1',
          degree: 'Bachelor of Science',
          fieldOfStudy: 'Your Major / Field',
          institution: 'University Name',
          location: 'City, State',
          graduationDate: '2022-05',
          gpa: '3.8',
        },
      ],
      skillCategories: [
        {
          category: 'Core Competencies',
          skills: ['Strategic Planning', 'Leadership', 'Project Management', 'Problem Solving'],
        },
        {
          category: 'Technical & Tools',
          skills: ['Industry Software', 'Analytics', 'Data Management'],
        },
      ],
      skills: ['Strategic Planning', 'Leadership', 'Project Management', 'Problem Solving', 'Data Analytics'],
      projects: [],
      certifications: [],
      achievements: [],
      languages: [{ id: 'lang-1', language: 'English', proficiency: 'Native' }],
      volunteer: [],
      publications: [],
      awards: [],
      references: [],
      styling: {
        template: templateId as any,
        primaryColor: '#2563EB',
        secondaryColor: '#7C3AED',
        textColor: '#0F172A',
        backgroundColor: '#FFFFFF',
        fontFamily: 'Inter',
        fontSize: 'normal',
        spacing: 'normal',
        margins: 'normal',
        showPhoto: false,
        showIcons: true,
        showDividers: true,
        sectionOrder: ['summary', 'experiences', 'skills', 'education', 'certifications', 'languages'],
      },
    };

    setResumes((prev) => [newResume, ...prev]);
    setCurrentResume(newResume);
    addNotification('New resume created!', 'success');
    return newResume;
  };

  const loadSampleResume = (sampleId: string) => {
    const found = SAMPLE_RESUMES.find((s) => s.id === sampleId);
    if (found) {
      const cloned: ResumeData = {
        ...JSON.parse(JSON.stringify(found)),
        id: 'resume-' + Date.now(),
        lastModified: new Date().toISOString(),
      };
      setResumes((prev) => [cloned, ...prev]);
      setCurrentResume(cloned);
      addNotification(`Loaded sample resume: ${cloned.title}`, 'success');
    }
  };

  const saveCoverLetter = (cl: CoverLetterData) => {
    setCoverLetters((prev) => {
      const exists = prev.some((c) => c.id === cl.id);
      if (exists) {
        return prev.map((c) => (c.id === cl.id ? cl : c));
      }
      return [cl, ...prev];
    });
    setCurrentCoverLetter(cl);
    addNotification('Cover letter saved!', 'success');
  };

  const deleteCoverLetter = (id: string) => {
    setCoverLetters((prev) => {
      const filtered = prev.filter((c) => c.id !== id);
      if (currentCoverLetter?.id === id) {
        setCurrentCoverLetter(filtered[0] || null);
      }
      return filtered;
    });
    addNotification('Cover letter deleted', 'info');
  };

  const importResume = (parsedData: Partial<ResumeData>, customTitle?: string): ResumeData => {
    const role = parsedData.targetRole || parsedData.personalInfo?.jobTitle || 'Imported Candidate';
    const newResume: ResumeData = {
      id: 'resume-' + Date.now(),
      title: customTitle || `${parsedData.personalInfo?.fullName || 'Imported'} Resume`,
      targetRole: role,
      targetIndustry: parsedData.targetIndustry || 'Technology',
      lastModified: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      atsScore: parsedData.atsScore || 85,
      personalInfo: {
        fullName: parsedData.personalInfo?.fullName || 'Imported Candidate',
        jobTitle: parsedData.personalInfo?.jobTitle || role,
        email: parsedData.personalInfo?.email || 'email@example.com',
        phone: parsedData.personalInfo?.phone || '+1 (555) 000-0000',
        location: parsedData.personalInfo?.location || 'City, State',
        linkedin: parsedData.personalInfo?.linkedin || '',
        github: parsedData.personalInfo?.github || '',
        website: parsedData.personalInfo?.website || '',
      },
      summary:
        parsedData.summary ||
        'Experienced professional with demonstrated background in project execution, problem solving, and cross-functional leadership.',
      experiences:
        parsedData.experiences && parsedData.experiences.length > 0
          ? parsedData.experiences.map((e, idx) => ({
              ...e,
              id: e.id || `exp-imp-${Date.now()}-${idx}`,
            }))
          : [
              {
                id: 'exp-imp-1',
                jobTitle: role,
                company: 'Key Organization',
                location: 'City, State',
                startDate: '2022-01',
                endDate: 'Present',
                isCurrent: true,
                technologies: ['Key Tools', 'Core Skills'],
                highlights: [
                  'Spearheaded key initiatives driving measurable operational efficiency and team delivery.',
                  'Collaborated across cross-functional teams to streamline workflows and improve project outcomes.',
                ],
              },
            ],
      education:
        parsedData.education && parsedData.education.length > 0
          ? parsedData.education.map((edu, idx) => ({
              ...edu,
              id: edu.id || `edu-imp-${Date.now()}-${idx}`,
            }))
          : [
              {
                id: 'edu-imp-1',
                degree: 'Bachelor of Science / Arts',
                fieldOfStudy: 'Academic Field',
                institution: 'University / College',
                location: 'City, State',
                graduationDate: '2021',
              },
            ],
      skillCategories: parsedData.skillCategories || [
        {
          category: 'Core Competencies',
          skills: parsedData.skills?.slice(0, 4) || ['Problem Solving', 'Strategic Execution', 'Leadership'],
        },
      ],
      skills: parsedData.skills && parsedData.skills.length > 0
        ? parsedData.skills
        : ['Problem Solving', 'Strategic Execution', 'Leadership', 'Communication', 'Project Management'],
      projects: parsedData.projects || [],
      certifications: parsedData.certifications || [],
      achievements: parsedData.achievements || [],
      languages: parsedData.languages || [{ id: 'lang-1', language: 'English', proficiency: 'Fluent' }],
      volunteer: parsedData.volunteer || [],
      publications: parsedData.publications || [],
      awards: parsedData.awards || [],
      references: parsedData.references || [],
      styling: parsedData.styling || {
        template: 'modern-blue',
        primaryColor: '#2563EB',
        secondaryColor: '#7C3AED',
        textColor: '#0F172A',
        backgroundColor: '#FFFFFF',
        fontFamily: 'Inter',
        fontSize: 'normal',
        spacing: 'normal',
        margins: 'normal',
        showPhoto: false,
        showIcons: true,
        showDividers: true,
        sectionOrder: ['summary', 'experiences', 'skills', 'education', 'certifications', 'languages'],
      },
    };

    setResumes((prev) => [newResume, ...prev]);
    setCurrentResume(newResume);
    addNotification('Resume successfully imported and parsed!', 'success');
    return newResume;
  };

  const login = (
    email: string,
    name = 'User',
    jobTitle = 'Professional',
    provider: 'email' | 'linkedin' = 'email',
    linkedInUrl?: string
  ) => {
    setUser({
      id: 'user-' + Date.now(),
      name,
      email,
      jobTitle: jobTitle || 'Professional',
      experienceYears: 5,
      industry: 'Technology & SaaS',
      preferredRole: jobTitle || 'Senior Software Engineer',
      aiCredits: 100,
      plan: 'Pro',
      theme: 'light',
      provider,
      linkedInUrl: linkedInUrl || (provider === 'linkedin' ? `https://linkedin.com/in/${name.toLowerCase().replace(/\s+/g, '-')}` : undefined),
    });

    if (provider === 'linkedin') {
      addNotification(`Connected via LinkedIn as ${name}!`, 'success');
    } else {
      addNotification(`Welcome back, ${name}!`, 'success');
    }
  };

  const logout = () => {
    setUser(null);
    addNotification('Signed out successfully', 'info');
  };

  return (
    <ResumeContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        resumes,
        currentResume,
        coverLetters,
        currentCoverLetter,
        activeTab,
        notifications,
        aiCredits: user?.aiCredits ?? 0,
        useCredit,
        addCredit,
        upgradePlan,
        setActiveTab,
        setCurrentResume,
        updateCurrentResume,
        saveResume,
        deleteResume,
        duplicateResume,
        createNewResume,
        importResume,
        loadSampleResume,
        saveCoverLetter,
        deleteCoverLetter,
        setCurrentCoverLetter,
        login,
        logout,
        addNotification,
        removeNotification,
        undo,
        redo,
        canUndo: historyIndex > 0,
        canRedo: historyIndex < history.length - 1,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
};
