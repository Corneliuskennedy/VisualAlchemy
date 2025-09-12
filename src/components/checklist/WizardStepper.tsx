import React from 'react';
import { CheckCircle2 } from 'lucide-react';

interface WizardStepperProps {
  currentStep: number;
  totalSteps: number;
  steps: Array<{
    id: number;
    title: string;
    description: string;
  }>;
}

export const WizardStepper: React.FC<WizardStepperProps> = ({ 
  currentStep, 
  totalSteps, 
  steps 
}) => {
  const getStepIcon = (stepNumber: number) => {
    if (currentStep > stepNumber) {
      return (
        <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center" aria-label={`Step ${stepNumber} completed`}>
          <CheckCircle2 className="w-5 h-5 text-white" />
        </div>
      );
    }
    if (currentStep === stepNumber) {
      return (
        <div 
          className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white text-sm font-bold"
          aria-label={`Step ${stepNumber} current`}
        >
          {stepNumber}
        </div>
      );
    }
    return (
      <div 
        className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-gray-300 text-sm font-bold"
        aria-label={`Step ${stepNumber} not started`}
      >
        {stepNumber}
      </div>
    );
  };

  return (
    <nav aria-label="Project wizard progress" className="mb-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-3">GDPR Compliance Project Setup</h1>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
          Create a personalized compliance checklist in 3 simple steps. We'll analyze your project requirements and generate tailored GDPR guidance.
        </p>
      </div>
      
      {/* Step Indicator */}
      <div className="flex items-center justify-center mb-6">
        <ol className="flex items-center space-x-8">
          {steps.map((step, index) => (
            <li key={step.id} className="flex items-center">
              <div className="flex items-center space-x-3">
                {getStepIcon(step.id)}
                <div className="text-left">
                  <div className={`text-sm font-semibold ${currentStep >= step.id ? 'text-white' : 'text-gray-400'}`}>
                    Step {step.id}
                  </div>
                  <div className={`text-xs ${currentStep >= step.id ? 'text-gray-300' : 'text-gray-500'}`}>
                    {step.title}
                  </div>
                </div>
              </div>
              
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div 
                  className={`h-px w-16 ml-8 transition-colors duration-300 ${
                    currentStep > step.id ? 'bg-green-500' : 'bg-gray-700'
                  }`}
                  aria-hidden="true"
                />
              )}
            </li>
          ))}
        </ol>
      </div>
      
      {/* Progress Bar */}
      <div className="w-full max-w-md mx-auto">
        <div className="w-full bg-gray-800 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            role="progressbar"
            aria-valuenow={currentStep}
            aria-valuemin={1}
            aria-valuemax={totalSteps}
            aria-label={`Step ${currentStep} of ${totalSteps}`}
          />
        </div>
        <div className="text-center mt-2">
          <span className="text-sm text-gray-400">
            {currentStep} of {totalSteps} steps completed
          </span>
        </div>
      </div>
    </nav>
  );
};

export default WizardStepper; 