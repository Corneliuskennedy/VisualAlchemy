/**
 * Conversation Manager
 * Manages conversation state, history, and context for AI chatbot
 */

export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  metadata?: {
    intent?: string;
    confidence?: number;
    suggestedActions?: string[];
  };
}

export interface ConversationContext {
  userId?: string;
  sessionId: string;
  language: 'en' | 'nl';
  messages: Message[];
  intent?: string;
  collectedData: {
    name?: string;
    email?: string;
    companyName?: string;
    goal?: string;
    message?: string;
  };
  startedAt: Date;
  lastActivity: Date;
}

export class ConversationManager {
  private context: ConversationContext;
  private maxHistoryLength = 50;
  private sessionTimeout = 30 * 60 * 1000; // 30 minutes

  constructor(sessionId: string, language: 'en' | 'nl' = 'en') {
    this.context = {
      sessionId,
      language,
      messages: [],
      collectedData: {},
      startedAt: new Date(),
      lastActivity: new Date(),
    };
  }

  /**
   * Add a message to the conversation
   */
  addMessage(role: 'user' | 'assistant' | 'system', content: string, metadata?: Message['metadata']): Message {
    const message: Message = {
      id: this.generateId(),
      role,
      content,
      timestamp: new Date(),
      metadata,
    };

    this.context.messages.push(message);
    this.context.lastActivity = new Date();

    // Trim history if too long
    if (this.context.messages.length > this.maxHistoryLength) {
      this.context.messages = this.context.messages.slice(-this.maxHistoryLength);
    }

    return message;
  }

  /**
   * Get conversation history
   */
  getHistory(): Message[] {
    return this.context.messages;
  }

  /**
   * Get recent messages (last N messages)
   */
  getRecentMessages(count: number = 10): Message[] {
    return this.context.messages.slice(-count);
  }

  /**
   * Get conversation context
   */
  getContext(): ConversationContext {
    return { ...this.context };
  }

  /**
   * Update collected data
   */
  updateCollectedData(data: Partial<ConversationContext['collectedData']>): void {
    this.context.collectedData = {
      ...this.context.collectedData,
      ...data,
    };
  }

  /**
   * Set detected intent
   */
  setIntent(intent: string, confidence?: number): void {
    this.context.intent = intent;
    if (confidence !== undefined) {
      const lastMessage = this.context.messages[this.context.messages.length - 1];
      if (lastMessage) {
        lastMessage.metadata = {
          ...lastMessage.metadata,
          confidence,
        };
      }
    }
  }

  /**
   * Get conversation summary for context
   */
  getSummary(): string {
    const { collectedData, intent, messages } = this.context;
    const parts: string[] = [];

    if (intent) {
      parts.push(`Intent: ${intent}`);
    }

    if (collectedData.name) {
      parts.push(`Name: ${collectedData.name}`);
    }
    if (collectedData.email) {
      parts.push(`Email: ${collectedData.email}`);
    }
    if (collectedData.companyName) {
      parts.push(`Company: ${collectedData.companyName}`);
    }
    if (collectedData.goal) {
      parts.push(`Goal: ${collectedData.goal}`);
    }

    parts.push(`Messages: ${messages.length}`);

    return parts.join(' | ');
  }

  /**
   * Check if session is still active
   */
  isActive(): boolean {
    const now = new Date();
    const timeSinceLastActivity = now.getTime() - this.context.lastActivity.getTime();
    return timeSinceLastActivity < this.sessionTimeout;
  }

  /**
   * Reset conversation
   */
  reset(): void {
    this.context.messages = [];
    this.context.collectedData = {};
    this.context.intent = undefined;
    this.context.lastActivity = new Date();
  }

  /**
   * Export conversation for analytics
   */
  export(): ConversationContext {
    return { ...this.context };
  }

  /**
   * Generate unique ID
   */
  private generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
}

