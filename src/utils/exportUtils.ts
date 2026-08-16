import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ResumeData, CoverLetterData } from '../types/resume';

export async function exportResumeToPDF(resumeElementId = 'resume-document', filename = 'Resume.pdf'): Promise<boolean> {
  const element = document.getElementById(resumeElementId);
  if (!element) {
    console.error('Resume element not found for export');
    return false;
  }

  try {
    // Hide buttons or scroll bars during capture
    const canvas = await html2canvas(element, {
      scale: 2.5, // High resolution
      useCORS: true,
      logging: false,
      backgroundColor: '#FFFFFF',
      windowWidth: element.scrollWidth,
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    const ratio = imgWidth / imgHeight;
    const renderHeight = pdfWidth / ratio;

    let heightLeft = renderHeight;
    let position = 0;

    pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, renderHeight);
    heightLeft -= pdfHeight;

    // Multi-page handling if content overflows A4
    while (heightLeft > 0) {
      position = heightLeft - renderHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, renderHeight);
      heightLeft -= pdfHeight;
    }

    pdf.save(filename);
    return true;
  } catch (err) {
    console.error('Error generating PDF:', err);
    // Fallback to window print
    window.print();
    return true;
  }
}

export function exportResumeToDOCX(resume: ResumeData) {
  let docContent = `${resume.personalInfo.fullName}\n`;
  docContent += `${resume.personalInfo.jobTitle}\n`;
  docContent += `Email: ${resume.personalInfo.email} | Phone: ${resume.personalInfo.phone} | Location: ${resume.personalInfo.location}\n`;
  if (resume.personalInfo.linkedin) docContent += `LinkedIn: ${resume.personalInfo.linkedin}\n`;
  if (resume.personalInfo.website) docContent += `Website: ${resume.personalInfo.website}\n`;
  docContent += `\n=========================================\n`;
  docContent += `PROFESSIONAL SUMMARY\n`;
  docContent += `=========================================\n`;
  docContent += `${resume.summary}\n\n`;

  docContent += `=========================================\n`;
  docContent += `WORK EXPERIENCE\n`;
  docContent += `=========================================\n`;
  resume.experiences.forEach((exp) => {
    docContent += `\n${exp.jobTitle} - ${exp.company} (${exp.location})\n`;
    docContent += `${exp.startDate} - ${exp.isCurrent ? 'Present' : exp.endDate}\n`;
    if (exp.technologies && exp.technologies.length > 0) {
      docContent += `Technologies: ${exp.technologies.join(', ')}\n`;
    }
    exp.highlights.forEach((h) => {
      docContent += `• ${h}\n`;
    });
  });

  docContent += `\n=========================================\n`;
  docContent += `EDUCATION\n`;
  docContent += `=========================================\n`;
  resume.education.forEach((edu) => {
    docContent += `${edu.degree} in ${edu.fieldOfStudy} - ${edu.institution} (${edu.graduationDate})\n`;
    if (edu.gpa) docContent += `GPA: ${edu.gpa}\n`;
  });

  docContent += `\n=========================================\n`;
  docContent += `SKILLS\n`;
  docContent += `=========================================\n`;
  if (resume.skillCategories && resume.skillCategories.length > 0) {
    resume.skillCategories.forEach((cat) => {
      docContent += `${cat.category}: ${cat.skills.join(', ')}\n`;
    });
  } else {
    docContent += `${resume.skills.join(', ')}\n`;
  }

  if (resume.certifications && resume.certifications.length > 0) {
    docContent += `\n=========================================\n`;
    docContent += `CERTIFICATIONS\n`;
    docContent += `=========================================\n`;
    resume.certifications.forEach((c) => {
      docContent += `• ${c.name} - ${c.issuer} (${c.issueDate})\n`;
    });
  }

  const blob = new Blob([docContent], { type: 'application/msword;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${resume.personalInfo.fullName.replace(/\s+/g, '_')}_Resume.doc`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function exportCoverLetterToDOCX(cl: CoverLetterData) {
  let text = `${cl.signatureName}\n`;
  text += `${cl.email} | ${cl.phone}\n\n`;
  text += `${cl.date}\n\n`;
  text += `${cl.recipientName}\n`;
  text += `${cl.recipientTitle}\n`;
  text += `${cl.companyName}\n`;
  if (cl.companyAddress) text += `${cl.companyAddress}\n`;
  text += `\nRE: Application for ${cl.targetRole}\n\n`;
  text += `Dear ${cl.recipientName || 'Hiring Team'},\n\n`;
  cl.bodyParagraphs.forEach((p) => {
    text += `${p}\n\n`;
  });
  text += `Sincerely,\n\n${cl.signatureName}\n`;

  const blob = new Blob([text], { type: 'application/msword;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${cl.signatureName.replace(/\s+/g, '_')}_Cover_Letter.doc`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
