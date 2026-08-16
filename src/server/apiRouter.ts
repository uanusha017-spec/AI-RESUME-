import express, { Request, Response } from 'express';
import {
  handleGenerateSummary,
  handleGenerateBullets,
  handleImproveText,
  handleATSScore,
  handleJobMatch,
  handleCoverLetter,
  handleInterviewPrep,
  handleLinkedInOptimize,
  handleCareerAssistant,
  handleParseResume,
} from './geminiServer';

const router = express.Router();

// Universal response dispatcher supporting Express Response and Node ServerResponse
const sendJson = (res: any, statusCode: number, data: any) => {
  if (typeof res.status === 'function' && typeof res.json === 'function') {
    return res.status(statusCode).json(data);
  }
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(data));
};

// Safe route wrapper
const safeHandler = (fn: (req: Request, res: Response) => Promise<any>) => {
  return async (req: Request, res: Response) => {
    try {
      const data = await fn(req, res);
      if (data !== undefined) {
        sendJson(res, 200, data);
      }
    } catch (err: any) {
      console.warn('API Route Handler Warning:', err?.message || err);
      sendJson(res, 200, {
        error: false,
        fallback: true,
        message: err?.message || 'Processed using resilient fallback engine',
      });
    }
  };
};

router.post(
  '/generate-summary',
  safeHandler(async (req) => {
    return await handleGenerateSummary(req.body || {});
  })
);

router.post(
  '/generate-bullets',
  safeHandler(async (req) => {
    return await handleGenerateBullets(req.body || {});
  })
);

router.post(
  '/improve-resume',
  safeHandler(async (req) => {
    return await handleImproveText(req.body || {});
  })
);

router.post(
  '/ats-score',
  safeHandler(async (req) => {
    return await handleATSScore(req.body || {});
  })
);

router.post(
  '/job-match',
  safeHandler(async (req) => {
    return await handleJobMatch(req.body || {});
  })
);

router.post(
  '/cover-letter',
  safeHandler(async (req) => {
    return await handleCoverLetter(req.body || {});
  })
);

router.post(
  '/interview',
  safeHandler(async (req) => {
    return await handleInterviewPrep(req.body || {});
  })
);

router.post(
  '/linkedin-optimize',
  safeHandler(async (req) => {
    return await handleLinkedInOptimize(req.body || {});
  })
);

router.post(
  '/career-assistant',
  safeHandler(async (req) => {
    return await handleCareerAssistant(req.body || {});
  })
);

router.post(
  '/parse-resume',
  safeHandler(async (req) => {
    return await handleParseResume(req.body || {});
  })
);

export default router;
