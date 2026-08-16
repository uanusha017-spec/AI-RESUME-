import { ResumeData } from '../types/resume';

export const SAMPLE_RESUMES: ResumeData[] = [
  {
    id: 'sample-software-engineer',
    title: 'Senior Full Stack Engineer',
    targetRole: 'Senior Full Stack Software Engineer',
    targetIndustry: 'Technology & SaaS',
    lastModified: new Date().toISOString(),
    createdAt: new Date(Date.now() - 86400000 * 10).toISOString(),
    atsScore: 94,
    personalInfo: {
      fullName: 'Alex Morgan',
      jobTitle: 'Senior Full Stack Engineer',
      email: 'alex.morgan@example.com',
      phone: '+1 (555) 234-5678',
      location: 'San Francisco, CA',
      linkedin: 'linkedin.com/in/alex-morgan-tech',
      github: 'github.com/alexmorgan-dev',
      website: 'alexmorgan.dev',
    },
    summary: 'High-impact Senior Full Stack Engineer with 6+ years of experience architecting cloud-native distributed microservices and modern React frontends. Proven track record of scaling platforms to 2M+ active users, reducing cloud compute latency by 42%, and mentoring engineering teams.',
    experiences: [
      {
        id: 'exp-1',
        jobTitle: 'Senior Software Engineer',
        company: 'CloudScale Technologies',
        location: 'San Francisco, CA',
        startDate: '2023-01',
        endDate: '',
        isCurrent: true,
        technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker', 'AWS ECS', 'GraphQL'],
        highlights: [
          'Spearheaded the redesign of core customer analytics dashboard in React 19 and TypeScript, reducing initial load latency by 58% for 450k daily active users.',
          'Architected an event-driven ingestion pipeline handling 15,000 requests/sec with Node.js and AWS SQS, maintaining 99.99% system uptime SLA.',
          'Optimized PostgreSQL query indexing and caching layer with Redis, reducing database CPU load by 35% and saving $24,000 in monthly AWS infrastructure costs.',
          'Mentored 6 junior and mid-level software engineers through structured pair programming, leading to a 30% increase in team pull-request velocity.'
        ]
      },
      {
        id: 'exp-2',
        jobTitle: 'Full Stack Software Engineer',
        company: 'Nexus Digital Labs',
        location: 'Austin, TX',
        startDate: '2020-06',
        endDate: '2022-12',
        isCurrent: false,
        technologies: ['React', 'Next.js', 'Python/Django', 'PostgreSQL', 'GCP', 'Tailwind CSS'],
        highlights: [
          'Engineered and launched an automated billing and subscription microservice supporting Stripe webhook integration, processing $1.8M in ARR transactions.',
          'Collaborated closely with product and UX teams to build accessible, WCAG AA compliant design system components adopted across 4 client applications.',
          'Implemented end-to-end CI/CD testing pipelines with GitHub Actions and Playwright, cutting production regression bug rates by 44%.'
        ]
      }
    ],
    education: [
      {
        id: 'edu-1',
        degree: 'Bachelor of Science',
        fieldOfStudy: 'Computer Science',
        institution: 'University of California, Berkeley',
        location: 'Berkeley, CA',
        graduationDate: '2020-05',
        gpa: '3.85 / 4.0',
        honors: 'Dean\'s Honors List (4 consecutive semesters)',
        highlights: ['Coursework: Distributed Systems, Database Systems, Algorithms, Computer Architecture']
      }
    ],
    skillCategories: [
      {
        category: 'Languages & Frameworks',
        skills: ['TypeScript', 'JavaScript (ES6+)', 'Python', 'React', 'Next.js', 'Node.js', 'Express', 'Tailwind CSS', 'GraphQL']
      },
      {
        category: 'Databases & Cloud',
        skills: ['PostgreSQL', 'MongoDB', 'Redis', 'AWS (ECS, SQS, S3, RDS)', 'Docker', 'Kubernetes', 'CI/CD']
      },
      {
        category: 'Engineering Practices',
        skills: ['Microservices Architecture', 'System Design', 'REST APIs', 'Agile / Scrum', 'Test-Driven Development (TDD)', 'Performance Optimization']
      }
    ],
    skills: ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'AWS', 'Docker', 'GraphQL', 'Python', 'Redis', 'CI/CD'],
    projects: [
      {
        id: 'proj-1',
        name: 'DevFlow - Real-Time Code Collaboration Platform',
        role: 'Creator & Lead Architect',
        link: 'https://devflow-collab.io',
        githubLink: 'https://github.com/alexmorgan-dev/devflow',
        startDate: '2023-03',
        endDate: '2023-09',
        technologies: ['React', 'TypeScript', 'WebSockets', 'WebRTC', 'Go'],
        highlights: [
          'Built sub-50ms peer-to-peer live code editing using Operational Transformation algorithms and WebSockets.',
          'Achieved 12,000+ GitHub stars and featured on Hacker News front page with 80k unique visits.'
        ]
      }
    ],
    certifications: [
      {
        id: 'cert-1',
        name: 'AWS Certified Solutions Architect – Associate',
        issuer: 'Amazon Web Services',
        issueDate: '2023-08',
        credentialUrl: 'https://aws.amazon.com/verification'
      }
    ],
    achievements: [
      {
        id: 'ach-1',
        title: 'CloudScale Annual Innovation Award',
        organization: 'CloudScale Technologies',
        date: '2024-01',
        description: 'Awarded to top 1% engineers for designing fault-tolerant cross-region failover architecture.'
      }
    ],
    languages: [
      { id: 'lang-1', language: 'English', proficiency: 'Native' },
      { id: 'lang-2', language: 'Spanish', proficiency: 'Professional' }
    ],
    volunteer: [],
    publications: [],
    awards: [],
    references: [],
    styling: {
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
      sectionOrder: ['summary', 'experiences', 'skills', 'education', 'projects', 'certifications', 'achievements', 'languages']
    }
  },
  {
    id: 'sample-marketing-director',
    title: 'Growth Marketing Director',
    targetRole: 'Director of Growth Marketing',
    targetIndustry: 'B2B SaaS & Enterprise',
    lastModified: new Date().toISOString(),
    createdAt: new Date(Date.now() - 86400000 * 15).toISOString(),
    atsScore: 92,
    personalInfo: {
      fullName: 'Sarah Jenkins',
      jobTitle: 'Director of Growth & Performance Marketing',
      email: 'sarah.jenkins@marketingpro.com',
      phone: '+1 (555) 789-0123',
      location: 'New York, NY',
      linkedin: 'linkedin.com/in/sarahjenkins-growth',
      website: 'sarahgrowth.com'
    },
    summary: 'Results-driven Growth Marketing Leader with 8+ years scaling B2B SaaS revenue from $5M to $35M ARR. Expert in omnichannel demand generation, product-led growth (PLG) funnels, enterprise ABM campaigns, and multi-touch attribution modeling with a demonstrated record of reducing CAC by 34%.',
    experiences: [
      {
        id: 'exp-m1',
        jobTitle: 'Director of Demand Generation',
        company: 'Vanguard Enterprise Software',
        location: 'New York, NY',
        startDate: '2022-04',
        endDate: '',
        isCurrent: true,
        technologies: ['HubSpot', 'Salesforce', 'Google Ads', 'LinkedIn Campaign Manager', 'Marketo', 'Segment'],
        highlights: [
          'Led an 8-person growth team managing a $3.2M annual digital marketing budget, driving 140% year-over-year pipeline growth.',
          'Instituted an Account-Based Marketing (ABM) framework targeting Fortune 500 accounts, resulting in $6.4M in closed-won enterprise contracts.',
          'Revamped lead scoring and automated nurture workflows across HubSpot and Salesforce, elevating MQL-to-SQL conversion rate from 14% to 26%.',
          'Decreased blended customer acquisition cost (CAC) by 34% while increasing average contract value (ACV) by 22% through keyword intent targeting.'
        ]
      },
      {
        id: 'exp-m2',
        jobTitle: 'Senior Growth Marketing Manager',
        company: 'AppFlow Technologies',
        location: 'Boston, MA',
        startDate: '2019-03',
        endDate: '2022-03',
        isCurrent: false,
        technologies: ['Google Analytics 4', 'A/B Testing', 'Optimizely', 'Meta Ads', 'Tableau'],
        highlights: [
          'Scaled organic search acquisition by 180% in 18 months through strategic technical SEO and high-intent comparison landing pages.',
          'Conducted over 60 multivariate landing page experiments, unlocking a 4.2% lift in website demo request conversion.'
        ]
      }
    ],
    education: [
      {
        id: 'edu-m1',
        degree: 'Bachelor of Science in Business Administration',
        fieldOfStudy: 'Marketing & Analytics',
        institution: 'New York University (Stern School of Business)',
        location: 'New York, NY',
        graduationDate: '2018-05',
        gpa: '3.90 / 4.0'
      }
    ],
    skillCategories: [
      {
        category: 'Growth & Strategy',
        skills: ['Demand Generation', 'Account-Based Marketing (ABM)', 'PLG Funnel Optimization', 'CAC/LTV Modeling', 'Attribution Modeling']
      },
      {
        category: 'Digital Channels & Tools',
        skills: ['HubSpot CRM', 'Salesforce', 'Google Ads', 'LinkedIn Ads', 'Google Analytics 4', 'Tableau', 'Looker', 'SEO/SEM']
      }
    ],
    skills: ['Demand Generation', 'ABM', 'HubSpot', 'Salesforce', 'Google Ads', 'Paid Media', 'SEO', 'Data Analytics', 'Team Leadership'],
    projects: [],
    certifications: [
      {
        id: 'cert-m1',
        name: 'HubSpot Inbound Marketing & Revenue Operations Certified',
        issuer: 'HubSpot Academy',
        issueDate: '2023-04'
      },
      {
        id: 'cert-m2',
        name: 'Google Ads Search & Measurement Professional',
        issuer: 'Google',
        issueDate: '2023-11'
      }
    ],
    achievements: [],
    languages: [
      { id: 'lang-m1', language: 'English', proficiency: 'Native' },
      { id: 'lang-m2', language: 'French', proficiency: 'Fluent' }
    ],
    volunteer: [],
    publications: [],
    awards: [],
    references: [],
    styling: {
      template: 'ats-modern',
      primaryColor: '#7C3AED',
      secondaryColor: '#2563EB',
      textColor: '#0F172A',
      backgroundColor: '#FFFFFF',
      fontFamily: 'Poppins',
      fontSize: 'normal',
      spacing: 'normal',
      margins: 'normal',
      showPhoto: false,
      showIcons: true,
      showDividers: true,
      sectionOrder: ['summary', 'experiences', 'skills', 'education', 'certifications', 'languages']
    }
  },
  {
    id: 'sample-senior-accountant',
    title: 'Senior Financial Accountant (CPA)',
    targetRole: 'Senior Financial Accountant / Accounting Manager',
    targetIndustry: 'Corporate Finance & Accounting',
    lastModified: new Date().toISOString(),
    createdAt: new Date(Date.now() - 86400000 * 20).toISOString(),
    atsScore: 96,
    personalInfo: {
      fullName: 'Marcus Vance, CPA',
      jobTitle: 'Senior Financial Accountant',
      email: 'marcus.vance.cpa@example.com',
      phone: '+1 (555) 456-7890',
      location: 'Chicago, IL',
      linkedin: 'linkedin.com/in/marcusvance-cpa'
    },
    summary: 'Detail-oriented, certified public accountant (CPA) with 7+ years of experience leading month-end close cycles, GAAP financial reporting, SOX 404 compliance, and enterprise ERP migrations. Proven expertise in reducing month-end close turnaround by 4 business days and resolving $12M+ in balance sheet variance discrepancies.',
    experiences: [
      {
        id: 'exp-a1',
        jobTitle: 'Senior Accountant',
        company: 'Horizon Global Logistics Corp',
        location: 'Chicago, IL',
        startDate: '2021-08',
        endDate: '',
        isCurrent: true,
        technologies: ['NetSuite', 'Oracle ERP', 'QuickBooks Enterprise', 'Excel (VBA/Power Query)', 'BlackLine'],
        highlights: [
          'Spearheaded month-end and year-end closing processes for 4 operational subsidiaries, accelerating reporting cadence from 10 days down to 6 days.',
          'Reconciled complex multi-currency bank accounts, prepaid assets, and intercompany transactions totaling $45M+ with zero audit findings.',
          'Assisted external Big 4 auditors with PBC schedules, technical GAAP memos, and internal control walkthroughs under SOX Section 404.',
          'Automated repetitive journal entry reconciliation using Excel Power Query and Python scripts, reclaiming 18 monthly staff hours.'
        ]
      },
      {
        id: 'exp-a2',
        jobTitle: 'Staff Accountant',
        company: 'Deloitte & Touche LLP',
        location: 'Chicago, IL',
        startDate: '2018-09',
        endDate: '2021-07',
        isCurrent: false,
        technologies: ['SAP', 'CaseWare', 'Audit Analytics', 'Excel'],
        highlights: [
          'Performed financial statement substantive testing and variance analysis for mid-market manufacturing and commercial clients.',
          'Audited revenue recognition policies under ASC 606 and lease liabilities under ASC 842 for compliance.'
        ]
      }
    ],
    education: [
      {
        id: 'edu-a1',
        degree: 'Master of Science in Accountancy',
        fieldOfStudy: 'Financial Reporting & Audit',
        institution: 'University of Illinois at Urbana-Champaign',
        location: 'Champaign, IL',
        graduationDate: '2018-05',
        gpa: '3.94 / 4.0'
      },
      {
        id: 'edu-a2',
        degree: 'Bachelor of Science in Finance',
        fieldOfStudy: 'Corporate Finance',
        institution: 'University of Illinois at Urbana-Champaign',
        location: 'Champaign, IL',
        graduationDate: '2017-05',
        gpa: '3.88 / 4.0'
      }
    ],
    skillCategories: [
      {
        category: 'Accounting & Compliance',
        skills: ['US GAAP', 'SOX 404 Compliance', 'ASC 606 & ASC 842', 'Month-End Close', 'Financial Statement Preparation', 'General Ledger Reconciliation']
      },
      {
        category: 'Software & Systems',
        skills: ['NetSuite ERP', 'Oracle Financials', 'SAP', 'BlackLine', 'Advanced Excel (VBA, Power Pivot, VLOOKUP)', 'QuickBooks']
      }
    ],
    skills: ['US GAAP', 'Financial Modeling', 'NetSuite', 'SOX 404', 'Month-End Close', 'General Ledger', 'Tax Compliance', 'Auditing'],
    projects: [],
    certifications: [
      {
        id: 'cert-a1',
        name: 'Certified Public Accountant (CPA) – Illinois Board of Examiners',
        issuer: 'AICPA / ILBOE',
        issueDate: '2019-06'
      }
    ],
    achievements: [],
    languages: [
      { id: 'lang-a1', language: 'English', proficiency: 'Native' }
    ],
    volunteer: [],
    publications: [],
    awards: [],
    references: [],
    styling: {
      template: 'ats-classic',
      primaryColor: '#0F172A',
      secondaryColor: '#2563EB',
      textColor: '#0F172A',
      backgroundColor: '#FFFFFF',
      fontFamily: 'Merriweather',
      fontSize: 'normal',
      spacing: 'normal',
      margins: 'normal',
      showPhoto: false,
      showIcons: false,
      showDividers: true,
      sectionOrder: ['summary', 'experiences', 'education', 'skills', 'certifications']
    }
  },
  {
    id: 'sample-registered-nurse',
    title: 'Registered Nurse (BSN, RN)',
    targetRole: 'ICU / Critical Care Registered Nurse',
    targetIndustry: 'Healthcare & Nursing',
    lastModified: new Date().toISOString(),
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    atsScore: 93,
    personalInfo: {
      fullName: 'Elena Rostova, BSN, RN, CCRN',
      jobTitle: 'Critical Care Registered Nurse',
      email: 'elena.rostova.rn@example.com',
      phone: '+1 (555) 345-6789',
      location: 'Seattle, WA',
      linkedin: 'linkedin.com/in/elena-rostova-rn'
    },
    summary: 'Dedicated and compassionate Critical Care Registered Nurse with 5+ years of clinical experience in high-acuity Level I Trauma Center Intensive Care Units. Proven expertise in invasive hemodynamic monitoring, mechanical ventilation management, CRRT, and patient advocacy with a 100% medication safety record.',
    experiences: [
      {
        id: 'exp-n1',
        jobTitle: 'Intensive Care Unit (ICU) Registered Nurse',
        company: 'Harborview Medical Center',
        location: 'Seattle, WA',
        startDate: '2021-02',
        endDate: '',
        isCurrent: true,
        technologies: ['Epic EHR', 'Alaris Infusion Pumps', 'Philips Monitoring', 'Prismaflex CRRT'],
        highlights: [
          'Provided direct bedside critical care nursing to 2:1 and 1:1 ratio critically ill adult patients suffering from multi-organ failure, ARDS, septic shock, and neuro trauma.',
          'Titrated complex continuous vasoactive infusions (Levophed, Vasopressin, Epinephrine) based on invasive arterial line and central venous pressure hemodynamics.',
          'Collaborated with interdisciplinary teams of intensivists, respiratory therapists, and clinical pharmacists during rapid response and Code Blue resuscitations.',
          'Served as Unit Preceptor, training 12 newly licensed BSN residency nurses on ICU protocols, EHR documentation, and central line care bundles.'
        ]
      }
    ],
    education: [
      {
        id: 'edu-n1',
        degree: 'Bachelor of Science in Nursing (BSN)',
        fieldOfStudy: 'Nursing Practice',
        institution: 'University of Washington School of Nursing',
        location: 'Seattle, WA',
        graduationDate: '2020-06',
        gpa: '3.88 / 4.0'
      }
    ],
    skillCategories: [
      {
        category: 'Clinical Competencies',
        skills: ['Critical Care Nursing', 'Hemodynamic Monitoring (A-Line, CVP)', 'Mechanical Ventilation', 'CRRT Operation', 'Code Blue & ACLS Protocols', 'Wound & Trauma Care']
      },
      {
        category: 'Certifications & Healthcare Systems',
        skills: ['BLS / ACLS / PALS', 'CCRN Certified', 'Epic EHR Systems', 'Medication Administration Safety', 'Patient Advocacy']
      }
    ],
    skills: ['Critical Care', 'ACLS', 'BLS', 'CCRN', 'Hemodynamic Monitoring', 'Epic EHR', 'Patient Advocacy', 'Ventilator Management'],
    projects: [],
    certifications: [
      {
        id: 'cert-n1',
        name: 'Critical Care Registered Nurse (CCRN)',
        issuer: 'American Association of Critical-Care Nurses (AACN)',
        issueDate: '2022-05'
      },
      {
        id: 'cert-n2',
        name: 'Advanced Cardiovascular Life Support (ACLS)',
        issuer: 'American Heart Association',
        issueDate: '2023-01'
      }
    ],
    achievements: [],
    languages: [
      { id: 'lang-n1', language: 'English', proficiency: 'Native' },
      { id: 'lang-n2', language: 'Russian', proficiency: 'Native' }
    ],
    volunteer: [],
    publications: [],
    awards: [],
    references: [],
    styling: {
      template: 'modern-professional',
      primaryColor: '#0284C7',
      textColor: '#0F172A',
      backgroundColor: '#FFFFFF',
      fontFamily: 'Inter',
      fontSize: 'normal',
      spacing: 'normal',
      margins: 'normal',
      showPhoto: false,
      showIcons: true,
      showDividers: true,
      sectionOrder: ['summary', 'experiences', 'skills', 'certifications', 'education', 'languages']
    }
  },
  {
    id: 'sample-mba-graduate',
    title: 'MBA Product & Strategy Consultant',
    targetRole: 'Senior Strategy & Operations Manager / Product Strategy',
    targetIndustry: 'Management Consulting & FinTech',
    lastModified: new Date().toISOString(),
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    atsScore: 95,
    personalInfo: {
      fullName: 'David K. Sterling',
      jobTitle: 'Strategy & Operations Lead | MBA',
      email: 'david.sterling.mba@example.com',
      phone: '+1 (555) 901-2345',
      location: 'San Francisco, CA',
      linkedin: 'linkedin.com/in/davidksterling'
    },
    summary: 'Strategic problem solver and Harvard MBA graduate with 6+ years driving corporate strategy, cross-functional Go-To-Market execution, and digital transformation for global enterprises. Led cost restructuring programs yielding $48M in run-rate EBITDA savings.',
    experiences: [
      {
        id: 'exp-mba1',
        jobTitle: 'Engagement Manager / Strategy Consultant',
        company: 'McKinsey & Company',
        location: 'San Francisco, CA',
        startDate: '2022-07',
        endDate: '',
        isCurrent: true,
        technologies: ['Financial Modeling', 'Tableau', 'SQL', 'Executive Storyboarding'],
        highlights: [
          'Led cross-functional client teams of 12 on multi-million dollar post-merger integration initiatives for Tier-1 FinTech and payments leaders.',
          'Formulated new subscription pricing tiers and pricing elasticity models that unlocked $18M incremental annual revenue in year one.',
          'Authored C-suite strategic memos and board presentations for Fortune 100 CEOs and executives.'
        ]
      }
    ],
    education: [
      {
        id: 'edu-mba1',
        degree: 'Master of Business Administration (MBA)',
        fieldOfStudy: 'General Management & Technology Strategy',
        institution: 'Harvard Business School',
        location: 'Boston, MA',
        graduationDate: '2022-05',
        honors: 'First-Year Honors'
      }
    ],
    skillCategories: [
      {
        category: 'Core Competencies',
        skills: ['Corporate Strategy', 'Financial Modeling', 'GTM Execution', 'Mergers & Acquisitions (M&A)', 'Executive Presentation', 'Cost Optimization']
      }
    ],
    skills: ['Corporate Strategy', 'Financial Modeling', 'GTM Strategy', 'Executive Communication', 'Tableau', 'M&A', 'Operations'],
    projects: [],
    certifications: [],
    achievements: [],
    languages: [{ id: 'lang-m1', language: 'English', proficiency: 'Native' }],
    volunteer: [],
    publications: [],
    awards: [],
    references: [],
    styling: {
      template: 'ats-executive',
      primaryColor: '#1E293B',
      textColor: '#0F172A',
      backgroundColor: '#FFFFFF',
      fontFamily: 'Playfair Display',
      fontSize: 'normal',
      spacing: 'relaxed',
      margins: 'normal',
      showPhoto: false,
      showIcons: false,
      showDividers: true,
      sectionOrder: ['summary', 'experiences', 'education', 'skills']
    }
  },
  {
    id: 'sample-fresh-graduate',
    title: 'Entry Level Software Developer',
    targetRole: 'Junior / Associate Software Engineer',
    targetIndustry: 'Technology',
    lastModified: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    atsScore: 91,
    personalInfo: {
      fullName: 'Priya Sharma',
      jobTitle: 'Computer Science Graduate & Software Developer',
      email: 'priya.sharma.dev@example.com',
      phone: '+1 (555) 678-9012',
      location: 'Austin, TX',
      linkedin: 'linkedin.com/in/priya-sharma-tech',
      github: 'github.com/priyasharma-code'
    },
    summary: 'Eager and driven Computer Science honors graduate with strong foundations in data structures, algorithms, React, and Python. Completed 2 engineering internships delivering production features, and built 4 full-stack open-source applications.',
    experiences: [
      {
        id: 'exp-f1',
        jobTitle: 'Software Engineering Intern',
        company: 'Krypton Interactive',
        location: 'Austin, TX',
        startDate: '2024-05',
        endDate: '2024-08',
        isCurrent: false,
        technologies: ['React', 'JavaScript', 'Node.js', 'Jest'],
        highlights: [
          'Developed reusable UI components for user settings page, increasing test coverage from 68% to 91% using Jest and React Testing Library.',
          'Identified and fixed 14 critical frontend bugs prior to Q3 major feature launch.'
        ]
      }
    ],
    education: [
      {
        id: 'edu-f1',
        degree: 'Bachelor of Science in Computer Science',
        fieldOfStudy: 'Computer Science',
        institution: 'University of Texas at Austin',
        location: 'Austin, TX',
        graduationDate: '2025-05',
        gpa: '3.92 / 4.0',
        honors: 'Summa Cum Laude, President\'s Award for Academic Excellence'
      }
    ],
    skillCategories: [
      {
        category: 'Programming & Web',
        skills: ['Python', 'Java', 'JavaScript (ES6+)', 'TypeScript', 'React', 'HTML5/CSS3', 'Node.js', 'SQL']
      },
      {
        category: 'Developer Tools',
        skills: ['Git / GitHub', 'VS Code', 'Linux / Bash', 'Postman', 'Docker Basics', 'Agile / Scrum']
      }
    ],
    skills: ['Python', 'Java', 'React', 'TypeScript', 'JavaScript', 'Git', 'SQL', 'Data Structures', 'Algorithms'],
    projects: [
      {
        id: 'proj-f1',
        name: 'UniRent - Student Housing & Sublease Platform',
        role: 'Full Stack Developer',
        link: 'https://unirent-app.io',
        githubLink: 'https://github.com/priyasharma-code/unirent',
        technologies: ['React', 'Node.js', 'Express', 'MongoDB'],
        highlights: [
          'Built responsive web app serving 1,400+ campus students with interactive map search and chat.',
          'Integrated JWT authentication and Google OAuth 2.0 with rate-limited express middleware.'
        ]
      }
    ],
    certifications: [],
    achievements: [],
    languages: [
      { id: 'lang-f1', language: 'English', proficiency: 'Native' },
      { id: 'lang-f2', language: 'Hindi', proficiency: 'Native' }
    ],
    volunteer: [],
    publications: [],
    awards: [],
    references: [],
    styling: {
      template: 'modern-tech',
      primaryColor: '#06B6D4',
      secondaryColor: '#2563EB',
      textColor: '#0F172A',
      backgroundColor: '#FFFFFF',
      fontFamily: 'Fira Code',
      fontSize: 'normal',
      spacing: 'normal',
      margins: 'normal',
      showPhoto: false,
      showIcons: true,
      showDividers: true,
      sectionOrder: ['summary', 'education', 'skills', 'projects', 'experiences', 'languages']
    }
  }
];
