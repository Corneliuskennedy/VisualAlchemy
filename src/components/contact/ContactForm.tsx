import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, User, Send, MessageSquare, CheckCircle, RotateCcw, Building, Target, AlertCircle } from "lucide-react";
import { useTranslations } from '@/hooks/useTranslations';
import { FormData as ContactFormData } from '@/types/form';
import { useToast } from "@/components/ui/use-toast";

export const ContactForm = () => {
  const { t } = useTranslations();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState<ContactFormData>({
    firstName: '',
    lastName: '',
    email: '',
    companyName: '',
    companySize: 'micro',
    industry: '',
    automationNeeds: [],
    currentChallenges: '',
    preferredLanguage: 'en'
  });
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const webhookUrl = 'https://n8n.octomatic.ai/webhook/13fcbe25-af1b-453d-bfc7-d16b08227e47';

    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          message: message,
        }),
      });

      if (response.ok) {
        setShowSuccess(true);
        toast({
          title: t('contactPage', 'form.success.title'),
          description: t('contactPage', 'form.success.description'),
        });
      } else {
        throw new Error(`Webhook submission failed with status: ${response.status}`);
      }
    } catch (error) {
      console.error('Contact form submission error:', error);
      toast({
        variant: "destructive",
        title: t('contactPage', 'form.error.title'),
        description: t('contactPage', 'form.error.description'),
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'message') {
      setMessage(value);
    } else {
      setFormData(prev => ({ ...prev, [name]: value as any }));
    }
  };

  const handleCheckboxChange = (need: string) => {
    setFormData(prev => ({
      ...prev,
      automationNeeds: prev.automationNeeds.includes(need)
        ? prev.automationNeeds.filter(n => n !== need)
        : [...prev.automationNeeds, need]
    }));
  };

  const resetForm = () => {
    setShowSuccess(false);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      companyName: '',
      companySize: 'micro',
      industry: '',
      automationNeeds: [],
      currentChallenges: '',
      preferredLanguage: 'en'
    });
    setMessage('');
  };

  if (showSuccess) {
    return (
      <div className="bg-white/5 p-8 rounded-xl backdrop-blur-sm border border-white/10 shadow-xl text-center space-y-6">
        <div className="mx-auto w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center">
          <CheckCircle className="w-8 h-8 text-green-500" />
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-white">{t('contactPage', 'form.success.title')}</h3>
          <p className="text-gray-300">{t('contactPage', 'form.success.description')}</p>
        </div>
        <Button onClick={resetForm} variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
          <RotateCcw className="mr-2 h-4 w-4" />
          {t('contactPage', 'form.sendAnother')}
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-white/5 p-8 rounded-xl backdrop-blur-sm border border-white/10 shadow-xl">
      <form
        name="contact-form"
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Input
                type="text"
                name="firstName"
                placeholder="First name"
                value={formData.firstName}
                onChange={handleChange}
                className="pl-10"
                required
                autoComplete="given-name"
              />
              <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            </div>
            <div className="relative">
              <Input
                type="text"
                name="lastName"
                placeholder="Last name"
                value={formData.lastName}
                onChange={handleChange}
                className="pl-10"
                required
                autoComplete="family-name"
              />
              <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            </div>
          </div>

          <div className="relative">
            <Input
              type="email"
              name="email"
              placeholder={t('contactPage', 'form.email')}
              value={formData.email}
              onChange={handleChange}
              className="pl-10"
              required
              autoComplete="email"
            />
            <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          </div>

          <div className="relative">
            <Input
              type="text"
              name="companyName"
              placeholder="Company name"
              value={formData.companyName}
              onChange={handleChange}
              className="pl-10"
              autoComplete="organization"
            />
            <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          </div>

          <div className="relative">
            <select
              name="companySize"
              value={formData.companySize}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 bg-background/50 border rounded-md text-[14px] font-normal appearance-none"
              autoComplete="organization-title"
            >
              <option value="micro">1-9 employees (Micro)</option>
              <option value="small">10-49 employees (Small)</option>
              <option value="medium">50-249 employees (Medium)</option>
              <option value="large">250+ employees (Large)</option>
            </select>
            <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <div className="absolute right-3 top-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          <div className="relative">
            <select
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 bg-background/50 border rounded-md text-[14px] font-normal appearance-none"
              required
            >
              <option value="">Select your industry</option>
              <option value="technology">Technology & Software</option>
              <option value="ecommerce">E-commerce & Retail</option>
              <option value="professional-services">Professional Services</option>
              <option value="healthcare">Healthcare & Medical</option>
              <option value="finance">Finance & Insurance</option>
              <option value="real-estate">Real Estate</option>
              <option value="marketing">Marketing & Advertising</option>
              <option value="manufacturing">Manufacturing</option>
              <option value="education">Education</option>
              <option value="hospitality">Hospitality & Tourism</option>
              <option value="logistics">Logistics & Transportation</option>
              <option value="other">Other</option>
            </select>
            <Building className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <div className="absolute right-3 top-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-gray-400" />
              <label className="text-sm font-medium text-white">What automation needs do you have? (Select all that apply)</label>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                'Lead Generation',
                'Customer Communication',
                'CRM & Sales Process',
                'Hiring & HR',
                'Project Management',
                'Data Entry & Processing',
                'Email Marketing',
                'Social Media Management',
                'Invoicing & Finance',
                'Customer Support',
                'Inventory Management',
                'Reporting & Analytics'
              ].map((need) => (
                <label key={need} className="flex items-center space-x-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={formData.automationNeeds.includes(need)}
                    onChange={() => handleCheckboxChange(need)}
                    className="rounded border-gray-600 text-[#4585f4] focus:ring-[#4585f4] focus:ring-offset-0 bg-background/50"
                  />
                  <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                    {need}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="relative">
            <textarea
              name="currentChallenges"
              placeholder="What are your biggest operational challenges right now? (Optional)"
              value={formData.currentChallenges}
              onChange={handleChange}
              className="w-full h-24 pl-10 pr-4 py-3 bg-background/50 border rounded-md text-[14px] font-normal resize-none"
              autoComplete="off"
            />
            <AlertCircle className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          </div>

          <div className="relative">
            <textarea
              name="message"
              placeholder={t('contactPage', 'form.message')}
              value={message}
              onChange={handleChange}
              className="w-full h-32 pl-10 pr-4 py-3 bg-background/50 border rounded-md text-[14px] font-normal resize-none"
              required
              autoComplete="off"
            />
            <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          </div>
        </div>

        <Button 
          type="submit" 
          className="w-full bg-[#324c9e] hover:bg-[#324c9e]/90"
          disabled={isLoading}
        >
          <Send className="mr-2 h-4 w-4" />
          {isLoading ? t('contactPage', 'form.submitting') : t('contactPage', 'form.submit')}
        </Button>
      </form>
    </div>
  );
};
