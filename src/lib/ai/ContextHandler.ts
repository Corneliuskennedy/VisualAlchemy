/**
 * Context Handler
 * Handles context extraction and management for AI responses
 */

import { ConversationManager, ConversationContext } from './ConversationManager';

export interface ContextData {
  pageUrl: string;
  pageTitle: string;
  referrer?: string;
  userAgent?: string;
  language: 'en' | 'nl';
  timeOfDay: 'morning' | 'afternoon' | 'evening' | 'night';
  dayOfWeek: string;
  conversationHistory: string[];
  collectedData: ConversationContext['collectedData'];
  intent?: string;
}

export class ContextHandler {
  /**
   * Extract context from current page and conversation
   */
  static extractContext(
    conversationManager: ConversationManager,
    pageUrl: string = typeof window !== 'undefined' ? window.location.href : '',
    pageTitle: string = typeof window !== 'undefined' ? document.title : ''
  ): ContextData {
    const context = conversationManager.getContext();
    const now = new Date();
    const hour = now.getHours();

    let timeOfDay: 'morning' | 'afternoon' | 'evening' | 'night';
    if (hour >= 5 && hour < 12) {
      timeOfDay = 'morning';
    } else if (hour >= 12 && hour < 17) {
      timeOfDay = 'afternoon';
    } else if (hour >= 17 && hour < 22) {
      timeOfDay = 'evening';
    } else {
      timeOfDay = 'night';
    }

    const dayOfWeek = now.toLocaleDateString('en-US', { weekday: 'long' });

    return {
      pageUrl,
      pageTitle,
      referrer: typeof document !== 'undefined' ? document.referrer : undefined,
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : undefined,
      language: context.language,
      timeOfDay,
      dayOfWeek,
      conversationHistory: conversationManager.getRecentMessages(5).map(m => 
        `${m.role}: ${m.content}`
      ),
      collectedData: context.collectedData,
      intent: context.intent,
    };
  }

  /**
   * Build context prompt for AI
   */
  static buildContextPrompt(context: ContextData, conversationManager: ConversationManager): string {
    const { language, collectedData, intent, pageTitle, timeOfDay } = context;
    const isNL = language === 'nl';

    let prompt = isNL 
      ? 'Je bent een behulpzame AI-assistent voor Octomatic, een web development en business optimization bedrijf in Nederland.\n\n'
      : 'You are a helpful AI assistant for Octomatic, a web development and business optimization company in the Netherlands.\n\n';

    // Add company context
    prompt += isNL
      ? 'Octomatic helpt bedrijven met:\n'
      : 'Octomatic helps companies with:\n';
    prompt += isNL
      ? '- Het bouwen van nieuwe systemen en applicaties\n'
      : '- Building new systems and applications\n';
    prompt += isNL
      ? '- Het optimaliseren van bestaande bedrijfsprocessen\n'
      : '- Optimizing existing business processes\n';
    prompt += isNL
      ? '- Het creëren van content en marketing strategieën\n'
      : '- Creating content and marketing strategies\n';
    prompt += isNL
      ? '- Web development en technische consultancy\n\n'
      : '- Web development and technical consultancy\n\n';

    // Add time context
    if (timeOfDay === 'morning') {
      prompt += isNL ? 'Het is ochtend. Wees vriendelijk en energiek.\n\n' : 'It\'s morning. Be friendly and energetic.\n\n';
    } else if (timeOfDay === 'evening' || timeOfDay === 'night') {
      prompt += isNL ? 'Het is avond/nacht. Wees respectvol voor de tijd.\n\n' : 'It\'s evening/night. Be respectful of the time.\n\n';
    }

    // Add page context
    if (pageTitle) {
      prompt += isNL
        ? `De gebruiker is op de pagina: ${pageTitle}\n\n`
        : `The user is on the page: ${pageTitle}\n\n`;
    }

    // Add collected data
    if (collectedData.name) {
      prompt += isNL
        ? `De gebruiker heet: ${collectedData.name}\n`
        : `The user's name is: ${collectedData.name}\n`;
    }
    if (collectedData.goal) {
      prompt += isNL
        ? `Hun doel is: ${collectedData.goal}\n`
        : `Their goal is: ${collectedData.goal}\n`;
    }
    if (intent) {
      prompt += isNL
        ? `Gedetecteerde intentie: ${intent}\n`
        : `Detected intent: ${intent}\n`;
    }

    prompt += '\n';

    // Add conversation history
    const recentMessages = conversationManager.getRecentMessages(3);
    if (recentMessages.length > 0) {
      prompt += isNL ? 'Recente conversatie:\n' : 'Recent conversation:\n';
      recentMessages.forEach(msg => {
        prompt += `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}\n`;
      });
      prompt += '\n';
    }

    // Add instructions
    prompt += isNL
      ? 'Instructies:\n'
      : 'Instructions:\n';
    prompt += isNL
      ? '- Wees vriendelijk, professioneel en behulpzaam\n'
      : '- Be friendly, professional, and helpful\n';
    prompt += isNL
      ? '- Beantwoord vragen over Octomatic\'s diensten\n'
      : '- Answer questions about Octomatic\'s services\n';
    prompt += isNL
      ? '- Help met het verzamelen van informatie voor een offerte\n'
      : '- Help collect information for a quote\n';
    prompt += isNL
      ? '- Als de gebruiker klaar is, stel voor om het contactformulier in te vullen\n'
      : '- When the user is ready, suggest filling out the contact form\n';
    prompt += isNL
      ? '- Houd antwoorden kort en to the point (max 2-3 zinnen)\n'
      : '- Keep answers concise and to the point (max 2-3 sentences)\n';
    prompt += isNL
      ? '- Gebruik dezelfde taal als de gebruiker\n\n'
      : '- Use the same language as the user\n\n';

    return prompt;
  }

  /**
   * Detect intent from user message
   */
  static detectIntent(message: string, language: 'en' | 'nl'): { intent: string; confidence: number } {
    const lowerMessage = message.toLowerCase();
    const isNL = language === 'nl';

    // Intent keywords
    const intents = {
      greeting: {
        en: ['hello', 'hi', 'hey', 'good morning', 'good afternoon'],
        nl: ['hallo', 'hoi', 'goedemorgen', 'goedemiddag', 'goedenavond'],
      },
      pricing: {
        en: ['price', 'cost', 'pricing', 'how much', 'budget'],
        nl: ['prijs', 'kosten', 'prijzen', 'hoeveel', 'budget'],
      },
      services: {
        en: ['service', 'what do you do', 'what can you', 'help with'],
        nl: ['dienst', 'wat doen jullie', 'waarmee kunnen jullie', 'helpen met'],
      },
      booking: {
        en: ['book', 'schedule', 'meeting', 'consultation', 'contact'],
        nl: ['boeken', 'afspraak', 'meeting', 'consultatie', 'contact'],
      },
      technical: {
        en: ['technical', 'technology', 'stack', 'framework', 'api'],
        nl: ['technisch', 'technologie', 'stack', 'framework', 'api'],
      },
    };

    let bestMatch: { intent: string; confidence: number } = { intent: 'general', confidence: 0.3 };

    for (const [intent, keywords] of Object.entries(intents)) {
      const relevantKeywords = isNL ? keywords.nl : keywords.en;
      const matches = relevantKeywords.filter(keyword => lowerMessage.includes(keyword));
      
      if (matches.length > 0) {
        const confidence = Math.min(0.9, 0.4 + (matches.length * 0.15));
        if (confidence > bestMatch.confidence) {
          bestMatch = { intent, confidence };
        }
      }
    }

    return bestMatch;
  }

  /**
   * Extract entities from message (name, email, etc.)
   */
  static extractEntities(message: string): {
    name?: string;
    email?: string;
    phone?: string;
  } {
    const entities: { name?: string; email?: string; phone?: string } = {};

    // Extract email
    const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
    const emailMatch = message.match(emailRegex);
    if (emailMatch) {
      entities.email = emailMatch[0];
    }

    // Extract phone (simple pattern)
    const phoneRegex = /(\+?\d{1,3}[-.\s]?)?\(?\d{1,4}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9}/g;
    const phoneMatch = message.match(phoneRegex);
    if (phoneMatch) {
      entities.phone = phoneMatch[0];
    }

    // Extract name (simple heuristic - first capitalized word sequence)
    const namePattern = /(?:my name is|ik heet|mijn naam is|i'm|ik ben)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)/i;
    const nameMatch = message.match(namePattern);
    if (nameMatch) {
      entities.name = nameMatch[1];
    }

    return entities;
  }
}

