import { NextRequest, NextResponse } from 'next/server';
import {
  handleGenerateSummary,
  handleGenerateBullets,
  handleATSScore,
  handleJobMatch,
  handleCoverLetter,
  handleInterviewPrep,
  handleLinkedInOptimize,
  handleCareerAssistant,
  handleParseResume,
} from '@/src/server/geminiServer';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, payload } = body;

    if (!action) {
      return NextResponse.json({ error: 'Missing action parameter' }, { status: 400 });
    }

    let result;
    switch (action) {
      case 'summary':
        result = await handleGenerateSummary(payload);
        break;
      case 'bullets':
        result = await handleGenerateBullets(payload);
        break;
      case 'ats-score':
        result = await handleATSScore(payload);
        break;
      case 'job-match':
        result = await handleJobMatch(payload);
        break;
      case 'cover-letter':
        result = await handleCoverLetter(payload);
        break;
      case 'interview-prep':
        result = await handleInterviewPrep(payload);
        break;
      case 'linkedin-audit':
      case 'linkedin-optimize':
        result = await handleLinkedInOptimize(payload);
        break;
      case 'career-coach':
      case 'career-assistant':
        result = await handleCareerAssistant(payload);
        break;
      case 'parse-resume':
        result = await handleParseResume(payload);
        break;
      default:
        return NextResponse.json({ error: `Unsupported action: ${action}` }, { status: 400 });
    }

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Next.js API route error:', error);
    return NextResponse.json(
      { error: error?.message || 'Internal server error in Next.js API route' },
      { status: 500 }
    );
  }
}
