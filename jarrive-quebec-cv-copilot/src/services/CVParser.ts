import * as pdfParse from 'pdf-parse';
import * as mammoth from 'mammoth';

export interface CVData {
  text: string;
  skills: string[];
  experience: string[];
  education: string[];
  languages: string[];
  certifications: string[];
  summary: string;
}

export class CVParser {
  static async parseFile(file: File): Promise<CVData> {
    const fileType = file.type;
    let text = '';

    try {
      if (fileType === 'application/pdf') {
        const arrayBuffer = await file.arrayBuffer();
        const pdfData = await pdfParse(Buffer.from(arrayBuffer));
        text = pdfData.text;
      } else if (fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        const arrayBuffer = await file.arrayBuffer();
        const result = await mammoth.extractRawText({ arrayBuffer });
        text = result.value;
      } else {
        throw new Error('Unsupported file type');
      }

      return this.analyzeCVText(text);
    } catch (error) {
      console.error('Error parsing CV:', error);
      throw new Error('Failed to parse CV file');
    }
  }

  private static analyzeCVText(text: string): CVData {
    const lines = text.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    
    // Extract skills (common skill keywords)
    const skillKeywords = [
      'javascript', 'python', 'java', 'react', 'node.js', 'sql', 'html', 'css', 'git',
      'marketing', 'digital marketing', 'social media', 'content creation', 'seo',
      'project management', 'leadership', 'communication', 'analytics', 'data analysis',
      'customer service', 'sales', 'business development', 'strategy', 'planning',
      'french', 'english', 'spanish', 'arabic', 'mandarin', 'german', 'italian',
      'photoshop', 'illustrator', 'figma', 'sketch', 'canva', 'wordpress', 'shopify',
      'excel', 'powerpoint', 'word', 'outlook', 'teams', 'slack', 'zoom', 'trello',
      'agile', 'scrum', 'lean', 'six sigma', 'quality assurance', 'testing',
      'machine learning', 'ai', 'artificial intelligence', 'data science', 'statistics'
    ];

    const skills = skillKeywords.filter(skill => 
      text.toLowerCase().includes(skill.toLowerCase())
    );

    // Extract experience (look for job titles and company names)
    const experience = this.extractExperience(text);
    
    // Extract education
    const education = this.extractEducation(text);
    
    // Extract languages
    const languages = this.extractLanguages(text);
    
    // Extract certifications
    const certifications = this.extractCertifications(text);
    
    // Generate summary
    const summary = this.generateSummary(text, skills, experience);

    return {
      text,
      skills,
      experience,
      education,
      languages,
      certifications,
      summary
    };
  }

  private static extractExperience(text: string): string[] {
    const experienceKeywords = [
      'experience', 'work experience', 'professional experience', 'employment',
      'worked at', 'employed at', 'position', 'role', 'job', 'career'
    ];
    
    const lines = text.split('\n');
    const experience: string[] = [];
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].toLowerCase();
      if (experienceKeywords.some(keyword => line.includes(keyword))) {
        // Look for the next few lines as potential experience entries
        for (let j = i + 1; j < Math.min(i + 10, lines.length); j++) {
          if (lines[j].trim() && !lines[j].toLowerCase().includes('education')) {
            experience.push(lines[j].trim());
          }
        }
        break;
      }
    }
    
    return experience.slice(0, 5); // Limit to 5 most recent experiences
  }

  private static extractEducation(text: string): string[] {
    const educationKeywords = [
      'education', 'academic', 'degree', 'bachelor', 'master', 'phd', 'diploma',
      'university', 'college', 'school', 'institution', 'graduated', 'graduation'
    ];
    
    const lines = text.split('\n');
    const education: string[] = [];
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].toLowerCase();
      if (educationKeywords.some(keyword => line.includes(keyword))) {
        // Look for the next few lines as potential education entries
        for (let j = i + 1; j < Math.min(i + 8, lines.length); j++) {
          if (lines[j].trim() && !lines[j].toLowerCase().includes('experience')) {
            education.push(lines[j].trim());
          }
        }
        break;
      }
    }
    
    return education.slice(0, 3); // Limit to 3 most recent education entries
  }

  private static extractLanguages(text: string): string[] {
    const languageKeywords = [
      'french', 'english', 'spanish', 'arabic', 'mandarin', 'german', 'italian',
      'portuguese', 'russian', 'japanese', 'korean', 'hindi', 'bengali', 'urdu'
    ];
    
    return languageKeywords.filter(lang => 
      text.toLowerCase().includes(lang.toLowerCase())
    );
  }

  private static extractCertifications(text: string): string[] {
    const certificationKeywords = [
      'certification', 'certified', 'certificate', 'license', 'accreditation',
      'pmp', 'scrum', 'agile', 'six sigma', 'lean', 'iso', 'aws', 'azure',
      'google', 'microsoft', 'adobe', 'cisco', 'comptia'
    ];
    
    const lines = text.split('\n');
    const certifications: string[] = [];
    
    for (const line of lines) {
      const lowerLine = line.toLowerCase();
      if (certificationKeywords.some(keyword => lowerLine.includes(keyword))) {
        certifications.push(line.trim());
      }
    }
    
    return certifications.slice(0, 5); // Limit to 5 certifications
  }

  private static generateSummary(text: string, skills: string[], experience: string[]): string {
    const yearsOfExperience = this.extractYearsOfExperience(text);
    const mainSkills = skills.slice(0, 5).join(', ');
    
    return `Professional with ${yearsOfExperience} years of experience specializing in ${mainSkills}. Strong background in ${experience.length > 0 ? experience[0] : 'various professional roles'}.`;
  }

  private static extractYearsOfExperience(text: string): string {
    const experiencePatterns = [
      /(\d+)\s*years?\s*of\s*experience/gi,
      /(\d+)\s*years?\s*in\s*the\s*field/gi,
      /experience:\s*(\d+)\s*years?/gi
    ];
    
    for (const pattern of experiencePatterns) {
      const match = text.match(pattern);
      if (match) {
        return match[1];
      }
    }
    
    // Default to a range if no specific years found
    return '3-5';
  }
}
