import { CVData } from './CVParser';

export interface JobRecommendation {
  title: string;
  reason: string;
  matchScore: number;
}

export interface CVInsight {
  category: string;
  title: string;
  description: string;
  suggestion: string;
  priority: 'high' | 'medium' | 'low';
}

export interface EnhancementSuggestion {
  originalText: string;
  suggestion: string;
  reason: string;
  impact: string;
}

export class AIAnalyzer {
  static generateJobRecommendations(cvData: CVData, language: 'fr' | 'en'): JobRecommendation[] {
    const recommendations: JobRecommendation[] = [];
    
    // Quebec job market analysis based on skills and experience
    const quebecJobMarket = {
      'Marketing Manager': {
        keywords: ['marketing', 'digital marketing', 'social media', 'content creation', 'seo'],
        reason: language === 'fr' 
          ? 'Vos compétences en marketing digital et gestion de contenu correspondent parfaitement aux besoins du marché québécois.'
          : 'Your digital marketing and content management skills perfectly match Quebec market needs.'
      },
      'Digital Marketing Specialist': {
        keywords: ['digital marketing', 'social media', 'seo', 'analytics', 'content creation'],
        reason: language === 'fr'
          ? 'Le marché québécois recherche activement des spécialistes en marketing digital avec vos compétences.'
          : 'The Quebec market is actively seeking digital marketing specialists with your skills.'
      },
      'Project Manager': {
        keywords: ['project management', 'leadership', 'planning', 'agile', 'scrum'],
        reason: language === 'fr'
          ? 'Votre expérience en gestion de projet est très recherchée dans les entreprises québécoises.'
          : 'Your project management experience is highly sought after in Quebec companies.'
      },
      'Business Analyst': {
        keywords: ['analytics', 'data analysis', 'strategy', 'planning', 'excel'],
        reason: language === 'fr'
          ? 'Les entreprises québécoises ont besoin d\'analystes d\'affaires avec vos compétences analytiques.'
          : 'Quebec companies need business analysts with your analytical skills.'
      },
      'Content Creator': {
        keywords: ['content creation', 'social media', 'writing', 'communication', 'creativity'],
        reason: language === 'fr'
          ? 'Le secteur créatif québécois recherche des créateurs de contenu bilingues comme vous.'
          : 'The Quebec creative sector is seeking bilingual content creators like you.'
      }
    };

    // Calculate match scores and generate recommendations
    Object.entries(quebecJobMarket).forEach(([title, data]) => {
      const matchingSkills = cvData.skills.filter(skill => 
        data.keywords.some(keyword => skill.toLowerCase().includes(keyword.toLowerCase()))
      );
      
      if (matchingSkills.length > 0) {
        const matchScore = Math.min(100, (matchingSkills.length / data.keywords.length) * 100);
        recommendations.push({
          title,
          reason: data.reason,
          matchScore: Math.round(matchScore)
        });
      }
    });

    // Sort by match score and return top 5
    return recommendations
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 5);
  }

  static generateCVInsights(cvData: CVData, language: 'fr' | 'en'): CVInsight[] {
    const insights: CVInsight[] = [];

    // Analyze skills
    if (cvData.skills.length < 5) {
      insights.push({
        category: 'skills',
        title: language === 'fr' ? 'Compétences limitées' : 'Limited Skills',
        description: language === 'fr' 
          ? 'Votre CV mentionne seulement ' + cvData.skills.length + ' compétences spécifiques.'
          : 'Your CV mentions only ' + cvData.skills.length + ' specific skills.',
        suggestion: language === 'fr'
          ? 'Ajoutez plus de compétences techniques et soft skills pertinentes pour le marché québécois.'
          : 'Add more technical and soft skills relevant to the Quebec market.',
        priority: 'high'
      });
    }

    // Analyze languages
    if (!cvData.languages.includes('french') && !cvData.languages.includes('english')) {
      insights.push({
        category: 'languages',
        title: language === 'fr' ? 'Langues non spécifiées' : 'Languages Not Specified',
        description: language === 'fr'
          ? 'Aucune compétence linguistique n\'est mentionnée dans votre CV.'
          : 'No language skills are mentioned in your CV.',
        suggestion: language === 'fr'
          ? 'Spécifiez clairement vos compétences en français et en anglais avec votre niveau de maîtrise.'
          : 'Clearly specify your French and English skills with your proficiency level.',
        priority: 'high'
      });
    }

    // Analyze experience
    if (cvData.experience.length === 0) {
      insights.push({
        category: 'experience',
        title: language === 'fr' ? 'Expérience professionnelle manquante' : 'Missing Professional Experience',
        description: language === 'fr'
          ? 'Aucune expérience professionnelle n\'a été détectée dans votre CV.'
          : 'No professional experience was detected in your CV.',
        suggestion: language === 'fr'
          ? 'Ajoutez vos expériences professionnelles avec des descriptions détaillées et des réalisations quantifiées.'
          : 'Add your professional experiences with detailed descriptions and quantified achievements.',
        priority: 'high'
      });
    }

    // Analyze education
    if (cvData.education.length === 0) {
      insights.push({
        category: 'education',
        title: language === 'fr' ? 'Formation académique manquante' : 'Missing Academic Background',
        description: language === 'fr'
          ? 'Aucune formation académique n\'a été détectée dans votre CV.'
          : 'No academic background was detected in your CV.',
        suggestion: language === 'fr'
          ? 'Incluez votre formation académique avec les diplômes obtenus et les institutions fréquentées.'
          : 'Include your academic background with degrees obtained and institutions attended.',
        priority: 'medium'
      });
    }

    return insights;
  }

  static generateEnhancementSuggestions(cvData: CVData, selectedText: string, language: 'fr' | 'en'): EnhancementSuggestion {
    const lowerText = selectedText.toLowerCase();
    
    // Common enhancement patterns
    if (lowerText.includes('responsible for') || lowerText.includes('responsable de')) {
      return {
        originalText: selectedText,
        suggestion: language === 'fr'
          ? 'Remplacez "responsable de" par des verbes d\'action plus forts comme "dirigé", "géré", "développé"'
          : 'Replace "responsible for" with stronger action verbs like "led", "managed", "developed"',
        reason: language === 'fr'
          ? 'Les verbes d\'action sont plus impactants et montrent mieux vos réalisations.'
          : 'Action verbs are more impactful and better showcase your achievements.',
        impact: language === 'fr' ? 'Élevé' : 'High'
      };
    }

    if (lowerText.includes('helped') || lowerText.includes('aidé')) {
      return {
        originalText: selectedText,
        suggestion: language === 'fr'
          ? 'Quantifiez votre impact avec des chiffres concrets (ex: "augmenté les ventes de 25%")'
          : 'Quantify your impact with concrete numbers (e.g., "increased sales by 25%")',
        reason: language === 'fr'
          ? 'Les employeurs québécois recherchent des résultats mesurables et quantifiables.'
          : 'Quebec employers look for measurable and quantifiable results.',
        impact: language === 'fr' ? 'Élevé' : 'High'
      };
    }

    if (lowerText.includes('worked on') || lowerText.includes('travaillé sur')) {
      return {
        originalText: selectedText,
        suggestion: language === 'fr'
          ? 'Spécifiez votre rôle exact et les technologies utilisées'
          : 'Specify your exact role and technologies used',
        reason: language === 'fr'
          ? 'Plus de détails techniques montrent votre expertise spécifique.'
          : 'More technical details show your specific expertise.',
        impact: language === 'fr' ? 'Moyen' : 'Medium'
      };
    }

    // Default suggestion
    return {
      originalText: selectedText,
      suggestion: language === 'fr'
        ? 'Ajoutez des chiffres concrets et des résultats mesurables pour renforcer cette affirmation'
        : 'Add concrete numbers and measurable results to strengthen this statement',
      reason: language === 'fr'
        ? 'Les employeurs québécois privilégient les candidats qui peuvent démontrer leur impact quantifiable.'
        : 'Quebec employers prefer candidates who can demonstrate their quantifiable impact.',
      impact: language === 'fr' ? 'Moyen' : 'Medium'
    };
  }

  static generateQuebecSpecificInsights(cvData: CVData, language: 'fr' | 'en'): CVInsight[] {
    const insights: CVInsight[] = [];

    // Check for Quebec-specific keywords
    const quebecKeywords = ['quebec', 'québec', 'montreal', 'montréal', 'canada', 'canadian'];
    const hasQuebecExperience = quebecKeywords.some(keyword => 
      cvData.text.toLowerCase().includes(keyword)
    );

    if (!hasQuebecExperience) {
      insights.push({
        category: 'quebec',
        title: language === 'fr' ? 'Expérience québécoise manquante' : 'Missing Quebec Experience',
        description: language === 'fr'
          ? 'Aucune expérience au Québec ou au Canada n\'est mentionnée.'
          : 'No experience in Quebec or Canada is mentioned.',
        suggestion: language === 'fr'
          ? 'Si vous avez de l\'expérience au Québec, mentionnez-la. Sinon, mettez l\'accent sur votre adaptabilité et votre intérêt pour le marché québécois.'
          : 'If you have experience in Quebec, mention it. Otherwise, emphasize your adaptability and interest in the Quebec market.',
        priority: 'medium'
      });
    }

    // Check for French language skills
    if (!cvData.languages.includes('french')) {
      insights.push({
        category: 'french',
        title: language === 'fr' ? 'Compétences en français' : 'French Language Skills',
        description: language === 'fr'
          ? 'Le français est essentiel pour la plupart des emplois au Québec.'
          : 'French is essential for most jobs in Quebec.',
        suggestion: language === 'fr'
          ? 'Indiquez votre niveau de français et vos efforts pour l\'améliorer.'
          : 'Indicate your French level and efforts to improve it.',
        priority: 'high'
      });
    }

    return insights;
  }
}
