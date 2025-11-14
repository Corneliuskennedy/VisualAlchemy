/**
 * AI Chatbot Component
 * AI-powered chatbot with context-aware responses and booking integration
 */

'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Loader2, Bot, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import useLanguage from '@/contexts/LanguageContext';
import { ConversationManager, Message } from '@/lib/ai/ConversationManager';
import { ContextHandler, ContextData } from '@/lib/ai/ContextHandler';
import { cn } from '@/lib/utils';

interface AIChatbotProps {
  className?: string;
  position?: 'bottom-right' | 'bottom-left';
  initialMessage?: string;
}

export const AIChatbot: React.FC<AIChatbotProps> = ({
  className = '',
  position = 'bottom-right',
  initialMessage,
}) => {
  const { language } = useLanguage();
  const isNL = language === 'nl';
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const conversationManagerRef = useRef<ConversationManager | null>(null);

  // Initialize conversation manager
  useEffect(() => {
    if (!conversationManagerRef.current) {
      const sessionId = `chat-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      conversationManagerRef.current = new ConversationManager(sessionId, language);
      
      // Add initial greeting
      if (initialMessage) {
        conversationManagerRef.current.addMessage('assistant', initialMessage);
      } else {
        const greeting = isNL
          ? 'Hallo! Ik ben de AI-assistent van Octomatic. Hoe kan ik je vandaag helpen?'
          : 'Hello! I\'m Octomatic\'s AI assistant. How can I help you today?';
        conversationManagerRef.current.addMessage('assistant', greeting);
      }
    }
  }, [language, isNL, initialMessage]);

  // Update language when it changes
  useEffect(() => {
    if (conversationManagerRef.current) {
      // Update language in context (would need to add method to ConversationManager)
      // For now, we'll handle it in the response generation
    }
  }, [language]);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    if (isOpen && !isMinimized) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [conversationManagerRef.current?.getHistory().length, isOpen, isMinimized]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen, isMinimized]);

  /**
   * Generate AI response (simulated - replace with actual AI API call)
   */
  const generateResponse = useCallback(async (userMessage: string): Promise<string> => {
    if (!conversationManagerRef.current) return '';

    // Add user message
    conversationManagerRef.current.addMessage('user', userMessage);

    // Extract context
    const context = ContextHandler.extractContext(
      conversationManagerRef.current,
      typeof window !== 'undefined' ? window.location.href : '',
      typeof window !== 'undefined' ? document.title : ''
    );

    // Detect intent
    const { intent, confidence } = ContextHandler.detectIntent(userMessage, language);
    conversationManagerRef.current.setIntent(intent, confidence);

    // Extract entities
    const entities = ContextHandler.extractEntities(userMessage);
    if (entities.name) {
      conversationManagerRef.current.updateCollectedData({ name: entities.name });
    }
    if (entities.email) {
      conversationManagerRef.current.updateCollectedData({ email: entities.email });
    }

    // Build context prompt
    const contextPrompt = ContextHandler.buildContextPrompt(context, conversationManagerRef.current);

    // Simulate AI response (replace with actual API call)
    // For now, we'll use a simple rule-based system
    await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 400)); // Simulate API delay

    // Generate response based on intent and context
    const response = generateRuleBasedResponse(userMessage, intent, context, isNL);

    // Add assistant response
    conversationManagerRef.current.addMessage('assistant', response, {
      intent,
      confidence,
    });

    return response;
  }, [language, isNL]);

  /**
   * Handle message send
   */
  const handleSend = useCallback(async () => {
    if (!inputValue.trim() || isLoading) return;

    const message = inputValue.trim();
    setInputValue('');
    setIsLoading(true);

    try {
      await generateResponse(message);
    } catch (error) {
      console.error('[AIChatbot] Error generating response:', error);
      const errorMessage = isNL
        ? 'Sorry, er ging iets mis. Probeer het opnieuw.'
        : 'Sorry, something went wrong. Please try again.';
      conversationManagerRef.current?.addMessage('assistant', errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [inputValue, isLoading, generateResponse, isNL]);

  /**
   * Handle keyboard shortcuts
   */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const messages = conversationManagerRef.current?.getHistory() || [];
  const positionClasses = {
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
  };

  if (isMinimized) {
    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className={cn('fixed z-50', positionClasses[position], className)}
      >
        <Button
          onClick={() => {
            setIsMinimized(false);
            setIsOpen(true);
          }}
          className="rounded-full h-14 w-14 shadow-lg bg-button-primary hover:bg-button-primary-hover text-white"
          aria-label={isNL ? 'Open chatbot' : 'Open chatbot'}
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </motion.div>
    );
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className={cn(
            'fixed z-50 w-full max-w-md h-[600px] flex flex-col',
            'bg-background border border-border rounded-lg shadow-2xl',
            positionClasses[position],
            className
          )}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border bg-card">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-button-primary flex items-center justify-center">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-heading">
                  {isNL ? 'Octomatic Assistent' : 'Octomatic Assistant'}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {isNL ? 'We zijn hier om te helpen' : 'We\'re here to help'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMinimized(true)}
                aria-label={isNL ? 'Minimaliseer' : 'Minimize'}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} isNL={isNL} />
            ))}
            {isLoading && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="text-sm">{isNL ? 'Typen...' : 'Typing...'}</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border bg-card">
            <div className="flex items-center gap-2">
              <Input
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={isNL ? 'Typ je bericht...' : 'Type your message...'}
                disabled={isLoading}
                className="flex-1"
                aria-label={isNL ? 'Chat bericht' : 'Chat message'}
              />
              <Button
                onClick={handleSend}
                disabled={!inputValue.trim() || isLoading}
                className="bg-button-primary hover:bg-button-primary-hover"
                aria-label={isNL ? 'Verstuur' : 'Send'}
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              {isNL
                ? 'AI-powered • Privacy-vriendelijk'
                : 'AI-powered • Privacy-friendly'}
            </p>
          </div>
        </motion.div>
      )}

      {/* Toggle Button */}
      {!isOpen && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className={cn('fixed z-50', positionClasses[position], className)}
        >
          <Button
            onClick={() => setIsOpen(true)}
            className="rounded-full h-14 w-14 shadow-lg bg-button-primary hover:bg-button-primary-hover text-white"
            aria-label={isNL ? 'Open chatbot' : 'Open chatbot'}
          >
            <MessageCircle className="h-6 w-6" />
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/**
 * Message Bubble Component
 */
interface MessageBubbleProps {
  message: Message;
  isNL: boolean;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, isNL }) => {
  const isUser = message.role === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn('flex gap-3', isUser ? 'justify-end' : 'justify-start')}
    >
      {!isUser && (
        <div className="h-8 w-8 rounded-full bg-button-primary flex items-center justify-center flex-shrink-0">
          <Bot className="h-4 w-4 text-white" />
        </div>
      )}
      <div
        className={cn(
          'max-w-[80%] rounded-lg px-4 py-2',
          isUser
            ? 'bg-button-primary text-white'
            : 'bg-card border border-border text-foreground'
        )}
      >
        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
        {message.metadata?.suggestedActions && message.metadata.suggestedActions.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {message.metadata.suggestedActions.map((action, idx) => (
              <Button
                key={idx}
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={() => {
                  // Handle action click
                }}
              >
                {action}
              </Button>
            ))}
          </div>
        )}
      </div>
      {isUser && (
        <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
          <User className="h-4 w-4 text-foreground" />
        </div>
      )}
    </motion.div>
  );
};

/**
 * Generate rule-based response (replace with actual AI API call)
 */
function generateRuleBasedResponse(
  userMessage: string,
  intent: string,
  context: ContextData,
  isNL: boolean
): string {
  const lowerMessage = userMessage.toLowerCase();
  const collectedData = context.collectedData;

  // Greeting responses
  if (intent === 'greeting') {
    if (collectedData.name) {
      return isNL
        ? `Hallo ${collectedData.name}! Hoe kan ik je helpen vandaag?`
        : `Hello ${collectedData.name}! How can I help you today?`;
    }
    return isNL
      ? 'Hallo! Leuk je te ontmoeten. Waarmee kan ik je helpen?'
      : 'Hello! Nice to meet you. How can I help you?';
  }

  // Pricing responses
  if (intent === 'pricing') {
    return isNL
      ? 'Onze prijzen variëren afhankelijk van je project. Laten we een gesprek plannen om je specifieke behoeften te bespreken. Wil je het contactformulier invullen?'
      : 'Our pricing varies depending on your project. Let\'s schedule a call to discuss your specific needs. Would you like to fill out the contact form?';
  }

  // Services responses
  if (intent === 'services') {
    return isNL
      ? 'We helpen bedrijven met het bouwen van nieuwe systemen, het optimaliseren van processen, content creatie en technische consultancy. Wat is jouw specifieke behoefte?'
      : 'We help companies build new systems, optimize processes, create content, and provide technical consultancy. What\'s your specific need?';
  }

  // Booking responses
  if (intent === 'booking') {
    return isNL
      ? 'Geweldig! Laten we een afspraak plannen. Kun je je naam en email delen, dan kunnen we verder gaan?'
      : 'Great! Let\'s schedule a meeting. Can you share your name and email so we can proceed?';
  }

  // Technical responses
  if (intent === 'technical') {
    return isNL
      ? 'We werken met moderne technologieën zoals Next.js, React, TypeScript, en cloud platforms. Heb je een specifieke technische vraag?'
      : 'We work with modern technologies like Next.js, React, TypeScript, and cloud platforms. Do you have a specific technical question?';
  }

  // Default responses
  if (lowerMessage.includes('contact') || lowerMessage.includes('contactformulier')) {
    return isNL
      ? 'Je kunt het contactformulier invullen op de contactpagina. Zal ik je daarheen leiden?'
      : 'You can fill out the contact form on the contact page. Should I take you there?';
  }

  if (lowerMessage.includes('help') || lowerMessage.includes('help')) {
    return isNL
      ? 'Ik kan je helpen met vragen over onze diensten, prijzen, of het plannen van een afspraak. Wat wil je weten?'
      : 'I can help you with questions about our services, pricing, or scheduling a meeting. What would you like to know?';
  }

  // Generic response
  return isNL
    ? 'Dat is interessant! Kun je me meer vertellen over wat je zoekt? Of wil je liever het contactformulier invullen voor een directe reactie?'
    : 'That\'s interesting! Can you tell me more about what you\'re looking for? Or would you prefer to fill out the contact form for a direct response?';
}

export default AIChatbot;

