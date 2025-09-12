export interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  companyName: string;
  companySize: string;
  industry: string;
  automationNeeds: string[];
  currentChallenges: string;
  preferredLanguage: 'en' | 'nl';
}