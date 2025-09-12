import React from 'react';
import { Button } from '../ui/button';
import { ArrowLeft, ArrowRight, CheckCircle2, X } from 'lucide-react';

interface WizardNavigationProps {
  currentStep: number;
  totalSteps: number;
  canProceed: boolean;
  onBack?: () => void;
  onNext?: () => void;
  onComplete?: () => void;
  onCancel?: () => void;
  isSubmitting?: boolean;
  backButtonText?: string;
  nextButtonText?: string;
  completeButtonText?: string;
}

export const WizardNavigation: React.FC<WizardNavigationProps> = ({
  currentStep,
  totalSteps,
  canProceed,
  onBack,
  onNext,
  onComplete,
  onCancel,
  isSubmitting = false,
  backButtonText,
  nextButtonText,
  completeButtonText = "Create Project"
}) => {
  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === totalSteps;

  const getBackButtonText = () => {
    if (backButtonText) return backButtonText;
    if (currentStep === 2) return "Back to Project Details";
    if (currentStep === 3) return "Back to Data & Processing";
    return "Back";
  };

  const getNextButtonText = () => {
    if (nextButtonText) return nextButtonText;
    if (currentStep === 1) return "Continue to Data Types";
    if (currentStep === 2) return "Continue to Risk Assessment";
    return "Continue";
  };

  return (
    <div className="flex justify-between items-center pt-8 border-t border-gray-800">
      {/* Back Button */}
      <div className="flex items-center gap-3">
        {!isFirstStep && onBack && (
          <Button 
            type="button"
            variant="outline" 
            onClick={onBack}
            className="flex items-center gap-2 bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white px-6 py-3"
            disabled={isSubmitting}
          >
            <ArrowLeft className="w-5 h-5" />
            {getBackButtonText()}
          </Button>
        )}
        
        {onCancel && (
          <Button 
            type="button"
            variant="outline" 
            onClick={onCancel}
            className="flex items-center gap-2 bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white px-4 py-3"
            disabled={isSubmitting}
          >
            <X className="w-4 h-4" />
            Cancel
          </Button>
        )}
      </div>

      {/* Next/Complete Button */}
      <div>
        {isLastStep ? (
          <Button 
            type="button"
            onClick={onComplete}
            disabled={!canProceed || isSubmitting}
            className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white border-none px-8 py-3 text-base font-bold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Creating...
              </>
            ) : (
              <>
                {completeButtonText}
                <CheckCircle2 className="w-5 h-5" />
              </>
            )}
          </Button>
        ) : (
          <Button 
            type="button"
            onClick={onNext}
            disabled={!canProceed || isSubmitting}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white border-none px-8 py-3 text-base font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {getNextButtonText()}
            <ArrowRight className="w-5 h-5" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default WizardNavigation; 