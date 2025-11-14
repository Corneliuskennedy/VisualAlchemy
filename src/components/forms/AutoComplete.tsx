/**
 * AI-Powered AutoComplete Component
 * 
 * Features:
 * - Smart suggestions based on context
 * - Debounced input
 * - Keyboard navigation
 * - Accessibility compliant
 * 
 * Technical Showcase:
 * - Advanced input handling
 * - Performance optimization
 * - Accessibility features
 */

'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Check, ChevronDown, Loader2 } from 'lucide-react';
import debounce from 'lodash.debounce';

interface AutoCompleteProps {
  name: string;
  label: string;
  placeholder?: string;
  suggestions: string[] | ((query: string) => Promise<string[]>);
  required?: boolean;
  className?: string;
  onSelect?: (value: string) => void;
}

export const AutoComplete: React.FC<AutoCompleteProps> = ({
  name,
  label,
  placeholder,
  suggestions,
  required = false,
  className = '',
  onSelect,
}) => {
  const { register, setValue, watch, formState: { errors } } = useFormContext();
  const [query, setQuery] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const value = watch(name);

  // Debounced search function
  const searchSuggestions = useCallback(
    debounce(async (searchQuery: string) => {
      if (!searchQuery.trim()) {
        setFilteredSuggestions([]);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);

      try {
        if (typeof suggestions === 'function') {
          const results = await suggestions(searchQuery);
          setFilteredSuggestions(results);
        } else {
          const filtered = suggestions.filter((suggestion) =>
            suggestion.toLowerCase().includes(searchQuery.toLowerCase())
          );
          setFilteredSuggestions(filtered);
        }
      } catch (error) {
        console.error('[AutoComplete] Error fetching suggestions:', error);
        setFilteredSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    }, 300),
    [suggestions]
  );

  useEffect(() => {
    if (value) {
      setQuery(value);
    }
  }, [value]);

  useEffect(() => {
    if (query) {
      searchSuggestions(query);
    } else {
      setFilteredSuggestions([]);
    }
  }, [query, searchSuggestions]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setQuery(newValue);
    setValue(name, newValue, { shouldValidate: true });
    setIsOpen(true);
    setSelectedIndex(-1);
  };

  const handleSelect = (suggestion: string) => {
    setQuery(suggestion);
    setValue(name, suggestion, { shouldValidate: true });
    setFilteredSuggestions([]);
    setIsOpen(false);
    onSelect?.(suggestion);
    inputRef.current?.blur();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen || filteredSuggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < filteredSuggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0) {
          handleSelect(filteredSuggestions[selectedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setSelectedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };

  const handleFocus = () => {
    if (filteredSuggestions.length > 0) {
      setIsOpen(true);
    }
  };

  const handleBlur = () => {
    // Delay to allow click events on suggestions
    setTimeout(() => {
      setIsOpen(false);
      setSelectedIndex(-1);
    }, 200);
  };

  const error = errors[name];

  return (
    <div className={`relative ${className}`}>
      <label htmlFor={name} className="block text-sm font-medium text-heading mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="relative">
        <Input
          {...register(name, { required })}
          ref={inputRef}
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          aria-autocomplete="list"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-invalid={!!error}
          className={error ? 'border-red-500' : ''}
        />
        {isLoading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <Loader2 className="h-4 w-4 animate-spin text-body" />
          </div>
        )}
        {!isLoading && query && (
          <button
            type="button"
            onClick={() => {
              setQuery('');
              setValue(name, '', { shouldValidate: true });
              inputRef.current?.focus();
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-body hover:text-heading"
            aria-label="Clear"
          >
            <ChevronDown className="h-4 w-4 rotate-180" />
          </button>
        )}
      </div>

      {/* Suggestions dropdown */}
      {isOpen && filteredSuggestions.length > 0 && (
        <ul
          ref={listRef}
          role="listbox"
          className="absolute z-50 w-full mt-1 bg-card border border-border rounded-lg shadow-lg max-h-60 overflow-auto"
        >
          {filteredSuggestions.map((suggestion, index) => (
            <li
              key={suggestion}
              role="option"
              aria-selected={selectedIndex === index}
              onClick={() => handleSelect(suggestion)}
              className={`
                px-4 py-2 cursor-pointer transition-colors
                ${selectedIndex === index
                  ? 'bg-button-primary/10 text-button-primary'
                  : 'hover:bg-secondary text-body'}
              `}
            >
              <div className="flex items-center justify-between">
                <span>{suggestion}</span>
                {query.toLowerCase() === suggestion.toLowerCase() && (
                  <Check className="h-4 w-4 text-button-primary" />
                )}
              </div>
            </li>
          ))}
        </ul>
      )}

      {error && (
        <p className="text-sm text-red-600 dark:text-red-400 mt-1">
          {error.message as string}
        </p>
      )}
    </div>
  );
};

export default AutoComplete;

