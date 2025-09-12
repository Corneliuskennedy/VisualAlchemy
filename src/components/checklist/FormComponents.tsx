import React from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Checkbox } from '../ui/checkbox';
import { AlertCircle } from 'lucide-react';

interface FormErrorProps {
  message: string;
  id?: string;
}

export const FormError: React.FC<FormErrorProps> = ({ message, id }) => {
  return (
    <p id={id} className="text-sm text-red-400 flex items-center gap-2 mt-1" role="alert">
      <AlertCircle className="w-4 h-4" />
      {message}
    </p>
  );
};

interface TextInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  required?: boolean;
  description?: string;
}

export const TextInput: React.FC<TextInputProps> = ({
  id,
  label,
  value,
  onChange,
  placeholder,
  error,
  required = false,
  description
}) => {
  const errorId = error ? `${id}-error` : undefined;
  const descriptionId = description ? `${id}-description` : undefined;

  return (
    <div className="space-y-3">
      <Label htmlFor={id} className="text-gray-300 text-base font-medium">
        {label} {required && <span className="text-red-400">*</span>}
      </Label>
      
      {description && (
        <p id={descriptionId} className="text-sm text-gray-400">
          {description}
        </p>
      )}
      
      <Input
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-green-500 focus:ring-green-500 h-12 text-base ${
          error ? 'border-red-500' : ''
        }`}
        aria-invalid={error ? true : false}
        aria-describedby={[descriptionId, errorId].filter(Boolean).join(' ') || undefined}
        required={required}
      />
      
      {error && <FormError message={error} id={errorId} />}
    </div>
  );
};

interface TextareaFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  required?: boolean;
  description?: string;
  rows?: number;
}

export const TextareaField: React.FC<TextareaFieldProps> = ({
  id,
  label,
  value,
  onChange,
  placeholder,
  error,
  required = false,
  description,
  rows = 4
}) => {
  const errorId = error ? `${id}-error` : undefined;
  const descriptionId = description ? `${id}-description` : undefined;

  return (
    <div className="space-y-3">
      <Label htmlFor={id} className="text-gray-300 text-base font-medium">
        {label} {required && <span className="text-red-400">*</span>}
      </Label>
      
      {description && (
        <p id={descriptionId} className="text-sm text-gray-400">
          {description}
        </p>
      )}
      
      <Textarea
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className={`bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-green-500 focus:ring-green-500 text-base ${
          error ? 'border-red-500' : ''
        }`}
        aria-invalid={error ? true : false}
        aria-describedby={[descriptionId, errorId].filter(Boolean).join(' ') || undefined}
        required={required}
      />
      
      {error && <FormError message={error} id={errorId} />}
    </div>
  );
};

interface CheckboxGroupProps {
  legend: string;
  description?: string;
  error?: string;
  children: React.ReactNode;
  required?: boolean;
}

export const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  legend,
  description,
  error,
  children,
  required = false
}) => {
  const errorId = error ? `${legend.replace(/\s+/g, '-').toLowerCase()}-error` : undefined;
  const descriptionId = description ? `${legend.replace(/\s+/g, '-').toLowerCase()}-description` : undefined;

  return (
    <fieldset className="space-y-6" aria-invalid={error ? true : false}>
      <legend className="border-l-4 border-red-500 pl-4">
        <h3 className="text-xl font-semibold text-white mb-2">
          {legend} {required && <span className="text-red-400">*</span>}
        </h3>
        {(description || error) && (
          <div>
            {description && (
              <p id={descriptionId} className="text-base text-gray-400">
                {description}
              </p>
            )}
          </div>
        )}
      </legend>
      
      <div 
        className="grid grid-cols-1 lg:grid-cols-2 gap-4"
        aria-describedby={[descriptionId, errorId].filter(Boolean).join(' ') || undefined}
      >
        {children}
      </div>
      
      {error && <FormError message={error} id={errorId} />}
    </fieldset>
  );
};

interface CheckboxCardProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  risk?: 'low' | 'medium' | 'high';
  riskIcon?: React.ReactNode;
}

export const CheckboxCard: React.FC<CheckboxCardProps> = ({
  id,
  label,
  checked,
  onChange,
  risk,
  riskIcon
}) => {
  const getRiskColor = (riskLevel?: string) => {
    switch (riskLevel) {
      case 'high':
        return 'border-red-500/50 text-red-400 bg-red-900/20';
      case 'medium':
        return 'border-yellow-500/50 text-yellow-400 bg-yellow-900/20';
      case 'low':
        return 'border-green-500/50 text-green-400 bg-green-900/20';
      default:
        return 'border-gray-500/50 text-gray-400 bg-gray-900/20';
    }
  };

  return (
    <div
      className={`group p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 hover:scale-[1.01] ${
        checked 
          ? 'border-green-500 bg-green-900/20 shadow-green-500/10' 
          : 'border-gray-700 bg-gray-800/50 hover:border-gray-600 hover:bg-gray-800'
      }`}
      onClick={() => onChange(!checked)}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 flex-1">
          <span className="font-medium text-white text-base">{label}</span>
          {risk && (
            <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getRiskColor(risk)}`}>
              {riskIcon}
              {risk.toUpperCase()}
            </div>
          )}
        </div>
        <Checkbox 
          id={id}
          checked={checked}
          onChange={() => onChange(!checked)}
          className="border-gray-600 data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
          aria-describedby={risk ? `${id}-risk` : undefined}
        />
      </div>
      {risk && (
        <span id={`${id}-risk`} className="sr-only">
          Risk level: {risk}
        </span>
      )}
    </div>
  );
};

interface UseCaseCardProps {
  id: string;
  label: string;
  description: string;
  icon: string;
  risk: 'low' | 'medium' | 'high';
  riskIcon: React.ReactNode;
  selected: boolean;
  onClick: () => void;
}

export const UseCaseCard: React.FC<UseCaseCardProps> = ({
  id,
  label,
  description,
  icon,
  risk,
  riskIcon,
  selected,
  onClick
}) => {
  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'high':
        return 'border-red-500/50 text-red-400 bg-red-900/20';
      case 'medium':
        return 'border-yellow-500/50 text-yellow-400 bg-yellow-900/20';
      case 'low':
        return 'border-green-500/50 text-green-400 bg-green-900/20';
      default:
        return 'border-gray-500/50 text-gray-400 bg-gray-900/20';
    }
  };

  return (
    <div
      role="radio"
      aria-checked={selected}
      tabIndex={0}
      className={`group p-5 border-2 rounded-xl cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 ${
        selected 
          ? 'border-green-500 bg-green-900/20 shadow-green-500/20' 
          : 'border-gray-700 bg-gray-800/50 hover:border-gray-600 hover:bg-gray-800'
      }`}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <div className="flex items-start gap-4">
        <span className="text-3xl" aria-hidden="true">{icon}</span>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold text-white text-base">{label}</h4>
            <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getRiskColor(risk)}`}>
              {riskIcon}
              {risk.toUpperCase()}
            </div>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
};

interface UseCaseGridProps {
  children: React.ReactNode;
  legend: string;
  description?: string;
  error?: string;
  required?: boolean;
}

export const UseCaseGrid: React.FC<UseCaseGridProps> = ({
  children,
  legend,
  description,
  error,
  required = false
}) => {
  const errorId = error ? `${legend.replace(/\s+/g, '-').toLowerCase()}-error` : undefined;
  const descriptionId = description ? `${legend.replace(/\s+/g, '-').toLowerCase()}-description` : undefined;

  return (
    <fieldset className="space-y-6" aria-invalid={error ? true : false}>
      <legend className="border-l-4 border-blue-500 pl-4">
        <h3 className="text-lg font-semibold text-white mb-2">
          {legend} {required && <span className="text-red-400">*</span>}
        </h3>
        {description && (
          <p id={descriptionId} className="text-sm text-gray-400">
            {description}
          </p>
        )}
      </legend>
      
      <div 
        role="radiogroup"
        className="grid grid-cols-1 lg:grid-cols-2 gap-4"
        aria-describedby={[descriptionId, errorId].filter(Boolean).join(' ') || undefined}
        aria-invalid={error ? true : false}
      >
        {children}
      </div>
      
      {error && <FormError message={error} id={errorId} />}
    </fieldset>
  );
}; 