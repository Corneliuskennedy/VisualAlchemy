/**
 * Voice Input Component
 * 
 * Features:
 * - Web Speech API integration
 * - Real-time transcription
 * - Visual feedback
 * - Language support
 * 
 * Technical Showcase:
 * - Web Speech API
 * - Real-time audio processing
 * - Browser API integration
 */

'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useFormContext } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Loader2 } from 'lucide-react';
import useLanguage from '@/contexts/LanguageContext';

interface VoiceInputProps {
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
  onTranscription?: (text: string) => void;
}

export const VoiceInput: React.FC<VoiceInputProps> = ({
  name,
  label,
  placeholder,
  required = false,
  className = '',
  onTranscription,
}) => {
  const { register, setValue, watch, formState: { errors } } = useFormContext();
  const { language } = useLanguage();
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [transcript, setTranscript] = useState('');
  const recognitionRef = useRef<any>(null);
  const value = watch(name);

  useEffect(() => {
    // Check if Speech Recognition API is available
    if (typeof window !== 'undefined') {
      const SpeechRecognition = 
        (window as any).SpeechRecognition || 
        (window as any).webkitSpeechRecognition;
      
      if (SpeechRecognition) {
        setIsSupported(true);
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = true;
        recognitionRef.current.interimResults = true;
        recognitionRef.current.lang = language === 'nl' ? 'nl-NL' : 'en-US';

        recognitionRef.current.onresult = (event: any) => {
          let interimTranscript = '';
          let finalTranscript = '';

          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
              finalTranscript += transcript + ' ';
            } else {
              interimTranscript += transcript;
            }
          }

          const fullTranscript = finalTranscript || interimTranscript;
          setTranscript(fullTranscript.trim());
          setValue(name, fullTranscript.trim(), { shouldValidate: true });
          onTranscription?.(fullTranscript.trim());
        };

        recognitionRef.current.onerror = (event: any) => {
          console.error('[VoiceInput] Speech recognition error:', event.error);
          setIsListening(false);
        };

        recognitionRef.current.onend = () => {
          setIsListening(false);
        };
      }
    }

    return () => {
      if (recognitionRef.current && isListening) {
        recognitionRef.current.stop();
      }
    };
  }, [language, name, setValue, onTranscription, isListening]);

  const toggleListening = () => {
    if (!isSupported || !recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
        setTranscript('');
      } catch (error) {
        console.error('[VoiceInput] Failed to start recognition:', error);
      }
    }
  };

  const error = errors[name];

  if (!isSupported) {
    return null; // Don't render if not supported
  }

  return (
    <div className={`space-y-2 ${className}`}>
      <label htmlFor={name} className="block text-sm font-medium text-heading">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="flex gap-2">
        <input
          {...register(name, { required })}
          type="text"
          value={value || transcript}
          onChange={(e) => {
            setValue(name, e.target.value, { shouldValidate: true });
            setTranscript(e.target.value);
          }}
          placeholder={placeholder}
          className={`
            flex-1 px-4 py-2 border rounded-lg bg-background text-foreground
            focus:outline-none focus:ring-2 focus:ring-button-primary
            ${error ? 'border-red-500' : 'border-border'}
          `}
        />
        <Button
          type="button"
          onClick={toggleListening}
          variant={isListening ? 'destructive' : 'outline'}
          className={`
            ${isListening 
              ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse' 
              : ''}
          `}
          aria-label={isListening ? 'Stop listening' : 'Start voice input'}
        >
          {isListening ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              <MicOff className="h-4 w-4" />
            </>
          ) : (
            <Mic className="h-4 w-4" />
          )}
        </Button>
      </div>
      {isListening && (
        <p className="text-sm text-button-primary flex items-center gap-1">
          <Mic className="h-3 w-3 animate-pulse" />
          {language === 'nl' ? 'Luisteren...' : 'Listening...'}
        </p>
      )}
      {error && (
        <p className="text-sm text-red-600 dark:text-red-400">
          {error.message as string}
        </p>
      )}
    </div>
  );
};

export default VoiceInput;

