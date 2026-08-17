# ResumeAI Pro - Next.js 14/15 App Router Full-Stack Application

This project has been converted to the **Next.js 14/15 App Router** architecture with complete TypeScript support, Tailwind CSS, and full Gemini AI integration.

---

## 📁 Next.js Project Structure

```
├── app/
│   ├── layout.tsx                # Root layout with metadata, viewport & fonts
│   ├── providers.tsx             # 'use client' Provider wrapper with ResumeContext & Modals
│   ├── globals.css               # Global CSS & Tailwind layers
│   ├── page.tsx                  # Home / Landing Page
│   ├── builder/
│   │   └── page.tsx              # AI Resume Builder
│   ├── ats-checker/
│   │   └── page.tsx              # ATS Score Optimizer & Keywords Audit
│   ├── job-matcher/
│   │   └── page.tsx              # Job Description Matcher
│   ├── cover-letters/
│   │   └── page.tsx              # AI Cover Letter Generator
│   ├── interview-prep/
│   │   └── page.tsx              # STAR Method Interview Question Coach
│   ├── linkedin/
│   │   └── page.tsx              # LinkedIn Headline & About Optimizer
│   ├── career-coach/
│   │   └── page.tsx              # AI Career Coach & Strategic Advisor
│   ├── templates/
│   │   └── page.tsx              # ATS-Compliant Templates Gallery
│   ├── dashboard/
│   │   └── page.tsx              # Candidate Dashboard
│   └── api/
│       └── gemini/
│           └── route.ts          # Next.js Route Handler for Gemini AI actions
│
├── src/
│   ├── components/               # Full UI component library
│   ├── context/                  # Resume & AI state management
│   ├── data/                     # Sample resumes & templates config
│   ├── server/                   # Server-side Gemini AI logic
│   ├── services/                 # API client utilities
│   ├── types/                    # TypeScript interfaces
│   └── utils/                    # PDF/DOCX exporters and document parsers
│
├── next.config.mjs               # Next.js configuration
├── tsconfig.json                 # TypeScript path aliases (@/*)
└── package.json                  # Dependencies & scripts
```

---

## 🚀 Running with Next.js

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure Environment Variables (`.env.local`):**
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

3. **Start the Next.js dev server:**
   ```bash
   npx next dev -p 3000
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Build for Production:**
   ```bash
   npx next build
   npx next start
   ```

---

## 🌐 1-Click Deployment

### Deploy to Vercel:
1. Push this repository to GitHub.
2. Import the repo on [Vercel](https://vercel.com).
3. Set the Environment Variable `GEMINI_API_KEY`.
4. Deploy!
