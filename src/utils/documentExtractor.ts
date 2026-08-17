import mammoth from 'mammoth';
import * as pdfjsLib from 'pdfjs-dist';

// Initialize PDF.js worker safely
try {
  if (typeof window !== 'undefined' && pdfjsLib.GlobalWorkerOptions) {
    pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version || '4.10.38'}/pdf.worker.min.mjs`;
  }
} catch (e) {
  console.warn('PDF Worker setup note:', e);
}

/**
 * Clean and sanitize extracted text (remove binary artifacts, normalize newlines)
 */
export function sanitizeResumeText(text: string): string {
  if (!text) return '';

  // Check if string contains raw zip binary headers like "PK \x03\x04" or "[Content_Types].xml"
  if (text.includes('[Content_Types].xml') || text.startsWith('PK\x03\x04') || text.startsWith('PK ')) {
    // Attempt to clean out XML tags if present
    const xmlStripped = text
      .replace(/<[^>]+>/g, ' ')
      .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x9F]/g, ' ')
      .replace(/\s+/g, ' ');
    if (xmlStripped.length > 50) {
      return xmlStripped.trim();
    }
  }

  // Normalize line endings and whitespace
  return text
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, '') // remove ASCII control codes
    .replace(/[ \t]+/g, ' ')
    .replace(/\n\s*\n\s*\n/g, '\n\n')
    .trim();
}

/**
 * Extract text from DOCX using Mammoth
 */
export async function extractTextFromDocx(arrayBuffer: ArrayBuffer): Promise<string> {
  try {
    const result = await mammoth.extractRawText({ arrayBuffer });
    const text = result.value || '';
    if (text.trim().length > 20) {
      return sanitizeResumeText(text);
    }
  } catch (err) {
    console.warn('Mammoth extraction fallback needed:', err);
  }

  // Fallback: extract text from XML elements in the array buffer
  return extractXmlFromDocxBuffer(arrayBuffer);
}

/**
 * Fallback to extract text from XML inside a DOCX binary buffer
 */
function extractXmlFromDocxBuffer(buffer: ArrayBuffer): string {
  try {
    const uint8 = new Uint8Array(buffer);
    const decoder = new TextDecoder('utf-8', { fatal: false });
    const raw = decoder.decode(uint8);

    // Look for <w:t>...</w:t> tags commonly used in Word docx XML
    const wtMatches = raw.match(/<w:t[^>]*>([^<]+)<\/w:t>/g);
    if (wtMatches && wtMatches.length > 0) {
      const extracted = wtMatches
        .map((m) => m.replace(/<[^>]+>/g, ''))
        .join(' ');
      if (extracted.trim().length > 30) {
        return sanitizeResumeText(extracted);
      }
    }

    // Secondary fallback: Extract printable ASCII strings
    let text = '';
    for (let i = 0; i < uint8.length; i++) {
      const c = uint8[i];
      if ((c >= 32 && c <= 126) || c === 10 || c === 13 || c === 9) {
        text += String.fromCharCode(c);
      } else if (text.length > 0 && text[text.length - 1] !== ' ') {
        text += ' ';
      }
    }
    // Clean out zip file structure strings
    text = text.replace(/\[Content_Types\]\.xml/g, '')
      .replace(/_rels\/\.rels/g, '')
      .replace(/word\/[a-zA-Z0-9._/]+/g, '');

    return sanitizeResumeText(text);
  } catch (e) {
    console.error('Fallback DOCX extraction error:', e);
    return '';
  }
}

/**
 * Extract text from PDF using PDF.js
 */
export async function extractTextFromPdf(arrayBuffer: ArrayBuffer): Promise<string> {
  try {
    const data = new Uint8Array(arrayBuffer);
    const loadingTask = pdfjsLib.getDocument({
      data,
      useSystemFonts: true,
      disableFontFace: true,
    });

    const pdf = await loadingTask.promise;
    let fullText = '';

    for (let i = 1; i <= pdf.numPages; i++) {
      try {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageStrings = textContent.items
          .map((item: any) => (item.str !== undefined ? item.str : ''))
          .join(' ');
        fullText += pageStrings + '\n\n';
      } catch (pageErr) {
        console.warn(`Error reading PDF page ${i}:`, pageErr);
      }
    }

    if (fullText.trim().length > 20) {
      return sanitizeResumeText(fullText);
    }
  } catch (err) {
    console.warn('PDF.js standard parse error, attempting stream parser:', err);
  }

  // Fallback: extract ASCII tokens from PDF stream
  return extractTextFromPdfStreamFallback(arrayBuffer);
}

/**
 * Fallback parser for PDF stream
 */
function extractTextFromPdfStreamFallback(buffer: ArrayBuffer): string {
  try {
    const uint8 = new Uint8Array(buffer);
    const decoder = new TextDecoder('latin1');
    const raw = decoder.decode(uint8);

    // Look for text operators like (Some Text) Tj or [(Some) (Text)] TJ
    const lines: string[] = [];
    const tjMatches = raw.match(/\(([^)]+)\)\s*Tj/g);
    if (tjMatches) {
      for (const m of tjMatches) {
        const cleaned = m.replace(/^\(/, '').replace(/\)\s*Tj$/, '').trim();
        if (cleaned.length > 0) lines.push(cleaned);
      }
    }

    if (lines.length > 5) {
      return sanitizeResumeText(lines.join(' '));
    }

    // General printable text extraction
    let text = '';
    for (let i = 0; i < uint8.length; i++) {
      const c = uint8[i];
      if ((c >= 32 && c <= 126) || c === 10 || c === 13) {
        text += String.fromCharCode(c);
      } else if (text.length > 0 && text[text.length - 1] !== ' ') {
        text += ' ';
      }
    }
    return sanitizeResumeText(text.replace(/%PDF-\d\.\d/g, '').substring(0, 10000));
  } catch (e) {
    console.error('PDF stream fallback error:', e);
    return '';
  }
}

/**
 * Universal file text extractor for Resume files (DOCX, PDF, TXT, MD, JSON)
 */
export async function extractResumeFileContent(file: File): Promise<{
  text: string;
  isJson: boolean;
  jsonData?: any;
  filename: string;
}> {
  const ext = file.name.toLowerCase();
  const filename = file.name;

  // 1. JSON
  if (ext.endsWith('.json')) {
    try {
      const raw = await file.text();
      const parsed = JSON.parse(raw);
      return { text: raw, isJson: true, jsonData: parsed, filename };
    } catch {
      const raw = await file.text();
      return { text: sanitizeResumeText(raw), isJson: false, filename };
    }
  }

  // 2. TXT or Markdown
  if (ext.endsWith('.txt') || ext.endsWith('.md')) {
    const raw = await file.text();
    return { text: sanitizeResumeText(raw), isJson: false, filename };
  }

  // 3. Word Document (.docx, .doc)
  if (ext.endsWith('.docx') || ext.endsWith('.doc')) {
    const arrayBuffer = await file.arrayBuffer();
    const text = await extractTextFromDocx(arrayBuffer);
    return { text, isJson: false, filename };
  }

  // 4. PDF Document (.pdf)
  if (ext.endsWith('.pdf')) {
    const arrayBuffer = await file.arrayBuffer();
    const text = await extractTextFromPdf(arrayBuffer);
    return { text, isJson: false, filename };
  }

  // 5. Fallback for other text formats
  try {
    const arrayBuffer = await file.arrayBuffer();
    // Check magic bytes for ZIP (PK\x03\x04 -> docx)
    const header = new Uint8Array(arrayBuffer.slice(0, 4));
    if (header[0] === 0x50 && header[1] === 0x4b) {
      const text = await extractTextFromDocx(arrayBuffer);
      return { text, isJson: false, filename };
    }
    // Check for PDF (%PDF)
    if (header[0] === 0x25 && header[1] === 0x50 && header[2] === 0x44 && header[3] === 0x46) {
      const text = await extractTextFromPdf(arrayBuffer);
      return { text, isJson: false, filename };
    }

    const raw = await file.text();
    return { text: sanitizeResumeText(raw), isJson: false, filename };
  } catch (err) {
    console.error('File read error:', err);
    return { text: '', isJson: false, filename };
  }
}
