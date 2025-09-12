import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Alert, AlertDescription } from '../ui/alert';
import { Building, Shield, Globe, AlertTriangle, Users, Zap, CheckCircle2 } from 'lucide-react';
import WizardStepper from './WizardStepper';
import WizardNavigation from './WizardNavigation';
import { 
  TextInput, 
  TextareaField, 
  CheckboxGroup, 
  CheckboxCard, 
  UseCaseGrid, 
  UseCaseCard 
} from './FormComponents';

interface ProjectWizardProps {
  onComplete: (projectData: ProjectData) => void;
  onCancel: () => void;
}

export interface ProjectData {
  title: string;
  description: string;
  use_case_category: string;
  data_types: string[];
  processing_activities: string[];
  third_party_integrations: string[];
  has_special_category_data: boolean;
  has_cross_border_transfers: boolean;
  target_audience: string;
}

// Use case options with proper typing
const useCaseOptions = [
  {
    value: 'marketing_automation',
    label: 'Marketing Automation',
    description: 'Email marketing, lead nurturing, customer segmentation and behavioral tracking systems.',
    icon: '📧',
    risk: 'medium' as const
  },
  {
    value: 'customer_support',
    label: 'Customer Support',
    description: 'Help desk systems, chat support, ticket management and customer communication platforms.',
    icon: '🎧',
    risk: 'low' as const
  },
  {
    value: 'ecommerce_platform',
    label: 'E-commerce Platform',
    description: 'Online stores, payment processing, order management and customer account systems.',
    icon: '🛒',
    risk: 'high' as const
  },
  {
    value: 'hrms',
    label: 'HR Management System',
    description: 'Employee data management, recruitment, performance tracking and payroll systems.',
    icon: '👥',
    risk: 'high' as const
  },
  {
    value: 'analytics_tracking',
    label: 'Analytics & Tracking',
    description: 'Website analytics, user behavior tracking, conversion optimization and data collection.',
    icon: '📊',
    risk: 'medium' as const
  },
  {
    value: 'content_management',
    label: 'Content Management',
    description: 'CMS systems, user-generated content, comment systems and content personalization.',
    icon: '📝',
    risk: 'low' as const
  }
];

// Data type options
const dataTypeOptions = [
  { value: 'personal_identifiers', label: 'Personal Identifiers (Name, Email, Phone)', risk: 'medium' as const },
  { value: 'contact_information', label: 'Contact Information', risk: 'low' as const },
  { value: 'financial_data', label: 'Financial Data (Payment Info, Banking)', risk: 'high' as const },
  { value: 'health_data', label: 'Health Data', risk: 'high' as const },
  { value: 'location_data', label: 'Location Data', risk: 'medium' as const },
  { value: 'behavioral_data', label: 'Behavioral Data (Usage, Preferences)', risk: 'medium' as const },
  { value: 'technical_data', label: 'Technical Data (IP Address, Device Info)', risk: 'low' as const },
  { value: 'biometric_data', label: 'Biometric Data', risk: 'high' as const }
];

// Processing activity options
const processingActivityOptions = [
  { value: 'collection', label: 'Data Collection', risk: 'low' as const },
  { value: 'storage', label: 'Data Storage', risk: 'medium' as const },
  { value: 'analysis', label: 'Data Analysis & Profiling', risk: 'medium' as const },
  { value: 'sharing', label: 'Third-party Data Sharing', risk: 'high' as const },
  { value: 'automated_decision', label: 'Automated Decision Making', risk: 'high' as const },
  { value: 'marketing', label: 'Marketing & Communications', risk: 'medium' as const },
  { value: 'transfer', label: 'Cross-border Data Transfer', risk: 'high' as const },
  { value: 'retention', label: 'Long-term Data Retention', risk: 'medium' as const }
];

// Third-party integration options
const thirdPartyOptions = [
  { value: 'google_analytics', label: 'Google Analytics', risk: 'medium' as const },
  { value: 'facebook_pixel', label: 'Facebook Pixel', risk: 'high' as const },
  { value: 'mailchimp', label: 'Email Marketing (Mailchimp, etc.)', risk: 'medium' as const },
  { value: 'payment_processors', label: 'Payment Processors (Stripe, PayPal)', risk: 'high' as const },
  { value: 'cloud_storage', label: 'Cloud Storage (AWS, Google Cloud)', risk: 'medium' as const },
  { value: 'crm_systems', label: 'CRM Systems (Salesforce, HubSpot)', risk: 'medium' as const }
];

const getRiskColor = (risk: string) => {
  switch (risk) {
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

const getRiskIcon = (risk: string) => {
  switch (risk) {
    case 'high':
      return <AlertTriangle className="w-3 h-3" />;
    case 'medium':
      return <Shield className="w-3 h-3" />;
    case 'low':
      return <CheckCircle2 className="w-3 h-3" />;
    default:
      return <Shield className="w-3 h-3" />;
  }
};

export default function EnhancedProjectWizard({ onComplete, onCancel }: ProjectWizardProps) {
  const [step, setStep] = useState(1);
  const [projectData, setProjectData] = useState<ProjectData>({
    title: '',
    description: '',
    use_case_category: '',
    data_types: [],
    processing_activities: [],
    third_party_integrations: [],
    has_special_category_data: false,
    has_cross_border_transfers: false,
    target_audience: 'eu_residents'
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Persistence functionality
  const STORAGE_KEY = 'gdpr-wizard-draft';

  // Load draft from localStorage on mount
  useEffect(() => {
    const savedDraft = localStorage.getItem(STORAGE_KEY);
    if (savedDraft) {
      try {
        const parsedDraft = JSON.parse(savedDraft);
        // Prompt user to resume session
        const shouldResume = window.confirm(
          'We found a draft of your project. Would you like to resume where you left off?'
        );
        if (shouldResume) {
          setProjectData(parsedDraft.projectData);
          setStep(parsedDraft.step || 1);
        } else {
          localStorage.removeItem(STORAGE_KEY);
        }
      } catch (error) {
        console.error('Failed to parse saved draft:', error);
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  // Save draft to localStorage whenever data changes
  useEffect(() => {
    const draftData = {
      projectData,
      step,
      lastSaved: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(draftData));
  }, [projectData, step]);

  const validateStep = (stepNumber: number): boolean => {
    const stepErrors: Record<string, string> = {};
    
    switch (stepNumber) {
      case 1:
        if (!projectData.title.trim()) stepErrors.title = 'Project title is required';
        if (!projectData.description.trim()) stepErrors.description = 'Project description is required';
        if (!projectData.use_case_category) stepErrors.use_case_category = 'Please select a use case';
        break;
      case 2:
        if (projectData.data_types.length === 0) stepErrors.data_types = 'Select at least one data type';
        if (projectData.processing_activities.length === 0) stepErrors.processing_activities = 'Select at least one processing activity';
        break;
    }
    
    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
    setErrors({});
  };

  const handleComplete = async () => {
    if (validateStep(step)) {
      setIsSubmitting(true);
      try {
        await onComplete(projectData);
        // Clear the draft after successful submission
        localStorage.removeItem(STORAGE_KEY);
      } catch (error) {
        console.error('Failed to create project:', error);
        setIsSubmitting(false);
      }
    }
  };

  const updateProjectData = (field: keyof ProjectData, value: any) => {
    setProjectData(prev => ({ ...prev, [field]: value }));
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const toggleArrayValue = (field: 'data_types' | 'processing_activities' | 'third_party_integrations', value: string) => {
    const currentArray = projectData[field];
    const newArray = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value];
    updateProjectData(field, newArray);
  };

  const selectedUseCase = useCaseOptions.find(option => option.value === projectData.use_case_category);

  const wizardSteps = [
    { id: 1, title: 'Project Details', description: 'Basic project information and use case' },
    { id: 2, title: 'Data & Processing', description: 'Data types and processing activities' },
    { id: 3, title: 'Risk Assessment', description: 'Compliance requirements and review' }
  ];

  const canProceed = () => {
    switch (step) {
      case 1:
        return !!(projectData.title.trim() && projectData.description.trim() && projectData.use_case_category);
      case 2:
        return projectData.data_types.length > 0 && projectData.processing_activities.length > 0;
      case 3:
        return true; // All fields are optional in step 3
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] py-12">
      <div className="max-w-5xl mx-auto px-6">
        <WizardStepper
          currentStep={step}
          totalSteps={3}
          steps={wizardSteps}
        />

        {/* Step 1: Project Details - Proper Focus Order */}
        {step === 1 && (
          <Card className="bg-gray-900/80 border-gray-800 backdrop-blur-sm shadow-2xl">
            <CardHeader className="pb-8">
              <CardTitle className="flex items-center gap-3 text-2xl text-white">
                <Building className="w-7 h-7 text-green-500" />
                Tell us about your project
              </CardTitle>
              <CardDescription className="text-gray-400 text-base leading-relaxed">
                We'll create a personalized GDPR compliance checklist based on your specific use case and requirements.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Project Information Section */}
              <div className="space-y-6">
                <div className="border-l-4 border-green-500 pl-4">
                  <h3 className="text-lg font-semibold text-white mb-2">Project Information</h3>
                  <p className="text-sm text-gray-400">Basic details about your GDPR compliance project</p>
                </div>
                
                <div className="grid grid-cols-1 gap-6">
                  <TextInput
                    id="project-title"
                    label="Project Title"
                    value={projectData.title}
                    onChange={(value) => updateProjectData('title', value)}
                    placeholder="e.g., Customer Newsletter System, E-commerce Platform, CRM Implementation"
                    error={errors.title}
                    required
                    description="A descriptive name for your GDPR compliance project"
                  />

                  <TextareaField
                    id="project-description"
                    label="Project Description"
                    value={projectData.description}
                    onChange={(value) => updateProjectData('description', value)}
                    placeholder="Describe what this project does, what data it collects, and how it works. Be specific about user interactions and data flows."
                    error={errors.description}
                    required
                    description="Detailed information about the project's purpose and functionality"
                    rows={4}
                  />
                </div>
              </div>

              {/* Use Case Section */}
              <UseCaseGrid
                legend="Use Case Category"
                description="Select the category that best describes your project"
                error={errors.use_case_category}
                required
              >
                {useCaseOptions.map((option) => (
                  <UseCaseCard
                    key={option.value}
                    id={option.value}
                    label={option.label}
                    description={option.description}
                    icon={option.icon}
                    risk={option.risk}
                    riskIcon={getRiskIcon(option.risk)}
                    selected={projectData.use_case_category === option.value}
                    onClick={() => updateProjectData('use_case_category', option.value)}
                  />
                ))}
              </UseCaseGrid>

              <WizardNavigation
                currentStep={step}
                totalSteps={3}
                canProceed={canProceed()}
                onNext={nextStep}
                onCancel={onCancel}
                isSubmitting={isSubmitting}
              />
            </CardContent>
          </Card>
        )}

        {/* Step 2: Data & Processing - Proper Fieldsets */}
        {step === 2 && (
          <Card className="bg-gray-900/80 border-gray-800 backdrop-blur-sm shadow-2xl">
            <CardHeader className="pb-8">
              <CardTitle className="flex items-center gap-3 text-2xl text-white">
                <Shield className="w-7 h-7 text-blue-500" />
                Data Types & Processing Activities
              </CardTitle>
              <CardDescription className="text-gray-400 text-base leading-relaxed">
                Select the types of personal data you'll process and your main processing activities. This helps us determine which GDPR requirements apply to your project.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-10">
              {/* Selected Use Case Summary */}
              {selectedUseCase && (
                <div className="bg-gradient-to-r from-green-900/30 to-blue-900/30 border border-green-500/30 p-6 rounded-xl">
                  <div className="flex items-center gap-4 mb-3">
                    <span className="text-3xl">{selectedUseCase.icon}</span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-white text-lg">{selectedUseCase.label}</h4>
                        <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${getRiskColor(selectedUseCase.risk)}`}>
                          {getRiskIcon(selectedUseCase.risk)}
                          {selectedUseCase.risk.toUpperCase()} RISK
                        </div>
                      </div>
                      <p className="text-gray-400 mt-1">{selectedUseCase.description}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Data Types Section - Proper WCAG AA Contrast */}
              <CheckboxGroup
                legend="Types of Personal Data"
                description="Select all personal data types your project will collect or process. Risk levels help prioritize compliance requirements."
                error={errors.data_types}
                required
              >
                {dataTypeOptions.map((option) => (
                  <CheckboxCard
                    key={option.value}
                    id={`data-type-${option.value}`}
                    label={option.label}
                    checked={projectData.data_types.includes(option.value)}
                    onChange={() => toggleArrayValue('data_types', option.value)}
                    risk={option.risk}
                    riskIcon={getRiskIcon(option.risk)}
                  />
                ))}
              </CheckboxGroup>

              {/* Processing Activities Section */}
              <CheckboxGroup
                legend="Processing Activities"
                description="Select all data processing activities that apply to your project"
                error={errors.processing_activities}
                required
              >
                {processingActivityOptions.map((option) => (
                  <CheckboxCard
                    key={option.value}
                    id={`processing-${option.value}`}
                    label={option.label}
                    checked={projectData.processing_activities.includes(option.value)}
                    onChange={() => toggleArrayValue('processing_activities', option.value)}
                    risk={option.risk}
                    riskIcon={getRiskIcon(option.risk)}
                  />
                ))}
              </CheckboxGroup>

              {/* Third-party Services Section */}
              <CheckboxGroup
                legend="Third-party Services (Optional)"
                description="Select any third-party services you'll integrate with"
              >
                {thirdPartyOptions.map((option) => (
                  <CheckboxCard
                    key={option.value}
                    id={`third-party-${option.value}`}
                    label={option.label}
                    checked={projectData.third_party_integrations.includes(option.value)}
                    onChange={() => toggleArrayValue('third_party_integrations', option.value)}
                    risk={option.risk}
                    riskIcon={getRiskIcon(option.risk)}
                  />
                ))}
              </CheckboxGroup>

              <WizardNavigation
                currentStep={step}
                totalSteps={3}
                canProceed={canProceed()}
                onBack={prevStep}
                onNext={nextStep}
                onCancel={onCancel}
                isSubmitting={isSubmitting}
              />
            </CardContent>
          </Card>
        )}

        {/* Step 3: Risk Assessment - Live Regions for Dynamic Updates */}
        {step === 3 && (
          <Card className="bg-gray-900/80 border-gray-800 backdrop-blur-sm shadow-2xl">
            <CardHeader className="pb-8">
              <CardTitle className="flex items-center gap-3 text-2xl text-white">
                <Globe className="w-7 h-7 text-purple-500" />
                Risk Assessment & Final Review
              </CardTitle>
              <CardDescription className="text-gray-400 text-base leading-relaxed">
                Final questions to determine your GDPR compliance requirements and generate your personalized checklist.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Risk Assessment Questions */}
              <div className="space-y-8">
                <div className="border-l-4 border-yellow-500 pl-4">
                  <h3 className="text-xl font-semibold text-white mb-2">Compliance Requirements</h3>
                  <p className="text-base text-gray-400">These final questions help us determine additional compliance requirements for your project.</p>
                </div>

                {/* Target Audience */}
                <div className="space-y-4">
                  <label htmlFor="target-audience" className="text-gray-300 text-base font-medium">
                    Primary Target Audience
                  </label>
                  <Select value={projectData.target_audience} onValueChange={(value) => updateProjectData('target_audience', value)}>
                    <SelectTrigger id="target-audience" className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue placeholder="Select your primary audience" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="eu_residents">EU Residents</SelectItem>
                      <SelectItem value="eu_and_international">EU + International</SelectItem>
                      <SelectItem value="b2b_only">Business-to-Business Only</SelectItem>
                      <SelectItem value="employees_only">Employees Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Special Category Data */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      id="special-category-data"
                      checked={projectData.has_special_category_data}
                      onChange={(e) => updateProjectData('has_special_category_data', e.target.checked)}
                      className="w-4 h-4 text-red-600 bg-gray-800 border-gray-600 rounded focus:ring-red-500 focus:ring-2"
                    />
                    <label htmlFor="special-category-data" className="text-gray-300 text-base">
                      This project processes special category data (health, biometric, political opinions, etc.)
                    </label>
                  </div>
                </div>

                {/* Cross-border Transfers */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      id="cross-border-transfers"
                      checked={projectData.has_cross_border_transfers}
                      onChange={(e) => updateProjectData('has_cross_border_transfers', e.target.checked)}
                      className="w-4 h-4 text-red-600 bg-gray-800 border-gray-600 rounded focus:ring-red-500 focus:ring-2"
                    />
                    <label htmlFor="cross-border-transfers" className="text-gray-300 text-base">
                      This project involves transferring data outside the EU/EEA
                    </label>
                  </div>
                </div>
              </div>

              {/* Project Summary - aria-live for screen readers */}
              <div 
                className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-gray-700 shadow-lg"
                aria-live="polite"
              >
                <h4 className="font-bold text-xl mb-4 text-white flex items-center gap-2">
                  <CheckCircle2 className="w-6 h-6 text-green-400" />
                  Project Summary
                </h4>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-base">
                  <div className="space-y-3">
                    <div>
                      <span className="text-gray-400 font-medium">Project:</span>
                      <p className="text-white font-semibold">{projectData.title}</p>
                    </div>
                    <div>
                      <span className="text-gray-400 font-medium">Use Case:</span>
                      <p className="text-white">{selectedUseCase?.label}</p>
                    </div>
                    <div>
                      <span className="text-gray-400 font-medium">Target Audience:</span>
                      <p className="text-white capitalize">{projectData.target_audience.replace('_', ' ')}</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <span className="text-gray-400 font-medium">Data Types:</span>
                      <p className="text-white font-semibold">{projectData.data_types.length} selected</p>
                    </div>
                    <div>
                      <span className="text-gray-400 font-medium">Processing Activities:</span>
                      <p className="text-white font-semibold">{projectData.processing_activities.length} selected</p>
                    </div>
                    <div>
                      <span className="text-gray-400 font-medium">Third-party Services:</span>
                      <p className="text-white">{projectData.third_party_integrations.length} selected</p>
                    </div>
                  </div>
                </div>
                
                {/* High Risk Alert - aria-live region */}
                {(projectData.has_special_category_data || projectData.has_cross_border_transfers) && (
                  <Alert className="mt-6 bg-gradient-to-r from-orange-900/30 to-red-900/30 border border-orange-500/30" aria-live="polite">
                    <AlertTriangle className="w-5 h-5 text-orange-400" />
                    <AlertDescription className="text-orange-300 text-base leading-relaxed">
                      <strong className="text-orange-400 font-bold text-lg block mb-2">
                        High-Risk Project Detected
                      </strong>
                      This project involves {projectData.has_special_category_data ? 'special category data' : ''} 
                      {projectData.has_special_category_data && projectData.has_cross_border_transfers ? ' and ' : ''}
                      {projectData.has_cross_border_transfers ? 'cross-border data transfers' : ''}. 
                      Your checklist will include additional high-priority compliance requirements and safeguards.
                    </AlertDescription>
                  </Alert>
                )}
              </div>

              <WizardNavigation
                currentStep={step}
                totalSteps={3}
                canProceed={canProceed()}
                onBack={prevStep}
                onComplete={handleComplete}
                onCancel={onCancel}
                isSubmitting={isSubmitting}
              />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
} 