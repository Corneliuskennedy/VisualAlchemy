import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, User, Send, MessageSquare, CheckCircle, RotateCcw, Building } from "lucide-react";
import { useTranslations } from '@/hooks/useTranslations';
import { useToast } from "@/components/ui/use-toast";

type GoalOption = 'build' | 'optimize' | 'create' | 'other';

interface SimplifiedFormData {
  name: string;
  companyName: string;
  email: string;
  goal: GoalOption | '';
  message: string;
}

// Social proof data
const SOCIAL_PROOF = {
  en: {
    clientCount: '200+',
    companies: 'companies trust us',
    recent: '3 companies booked this week',
  },
  nl: {
    clientCount: '200+',
    companies: 'bedrijven vertrouwen ons',
    recent: '3 bedrijven boekten deze week',
  },
};

export const ContactForm = () => {
  const { t, language } = useTranslations();
  const isNL = language === 'nl';
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState<SimplifiedFormData>({
    name: '',
    companyName: '',
    email: '',
    goal: '',
    message: ''
  });

  const goalOptions: { value: GoalOption; label: { nl: string; en: string } }[] = [
    { value: 'build', label: { nl: 'Een Nieuw Systeem Bouwen', en: 'Build a New System' } },
    { value: 'optimize', label: { nl: 'Mijn Bedrijf Optimaliseren', en: 'Optimize My Business' } },
    { value: 'create', label: { nl: 'Content Creëren', en: 'Create Content' } },
    { value: 'other', label: { nl: 'Iets Anders', en: 'Something Else' } },
  ];

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
          name: formData.name,
          companyName: formData.companyName || '', // Allow empty
          email: formData.email,
          goal: formData.goal,
          message: formData.message || '', // Allow empty (now optional)
          preferredLanguage: isNL ? 'nl' : 'en',
        }),
      });

      if (response.ok) {
        setShowSuccess(true);
        toast({
          title: isNL ? 'Bericht verzonden!' : 'Message sent!',
          description: isNL 
            ? 'We nemen binnen één werkdag contact met je op.' 
            : 'We will get back to you within one business day.',
        });
      } else {
        throw new Error(`Webhook submission failed with status: ${response.status}`);
      }
    } catch (error) {
      console.error('Contact form submission error:', error);
      toast({
        variant: "destructive",
        title: isNL ? 'Fout bij verzenden bericht' : 'Error sending message',
        description: isNL 
          ? 'Probeer het opnieuw of neem direct contact met ons op.' 
          : 'Please try again or contact us directly.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setShowSuccess(false);
    setFormData({
      name: '',
      companyName: '',
      email: '',
      goal: '',
      message: ''
    });
  };

  if (showSuccess) {
    return (
      <div className="bg-gradient-to-br from-green-500/10 via-green-500/5 to-emerald-500/10
                     dark:from-green-500/15 dark:via-green-500/10 dark:to-emerald-500/15
                     p-10 rounded-2xl 
                     backdrop-blur-xl 
                     border border-green-500/30 dark:border-green-500/40
                     shadow-2xl shadow-green-500/20
                     text-center space-y-6
                     animate-in fade-in duration-500">
        <div className="mx-auto w-20 h-20 
                      bg-gradient-to-br from-green-500/30 to-emerald-500/30
                      dark:from-green-500/40 dark:to-emerald-500/40
                      rounded-full 
                      flex items-center justify-center
                      shadow-xl shadow-green-500/30
                      animate-in zoom-in duration-500">
          <CheckCircle className="w-10 h-10 text-green-500 dark:text-emerald-400" />
        </div>
        <div className="space-y-3">
          <h3 className="text-2xl md:text-3xl font-bold text-heading dark:text-white">
            {isNL ? 'Bericht verzonden!' : 'Message sent!'}
          </h3>
          <p className="text-base md:text-lg text-body dark:text-gray-300 max-w-md mx-auto">
            {isNL 
              ? 'We nemen binnen één werkdag contact met je op.' 
              : 'We will get back to you within one business day.'}
          </p>
        </div>
        <Button 
          onClick={resetForm} 
          variant="outline" 
          className="w-full group
                   border-2 border-white/20 dark:border-white/20
                   bg-white/5 dark:bg-white/5
                   text-heading dark:text-white
                   hover:bg-white/10 dark:hover:bg-white/10
                   hover:border-white/30 dark:hover:border-white/30
                   transition-all duration-300
                   py-6 text-base font-semibold
                   rounded-xl
                   shadow-lg hover:shadow-xl">
          <RotateCcw className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:rotate-180" />
          {isNL ? 'Nog een bericht versturen' : 'Send another message'}
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-white/5 via-white/[0.03] to-white/5 
                   dark:from-white/5 dark:via-white/[0.03] dark:to-white/5
                   p-8 md:p-10 rounded-2xl 
                   backdrop-blur-xl 
                   border border-white/10 dark:border-white/10
                   shadow-2xl shadow-black/20
                   transition-all duration-500 hover:shadow-3xl hover:shadow-[#4585f4]/10">
      <form
        name="contact-form"
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        <div className="space-y-5">
          <div className="relative group">
            <Input
              type="text"
              name="name"
              placeholder={isNL ? 'Jouw Naam' : 'Your Name'}
              value={formData.name}
              onChange={handleChange}
              className="pl-12 pr-4 py-4
                       bg-background/40 dark:bg-background/40
                       border border-white/10 dark:border-white/10
                       rounded-xl
                       text-base
                       text-heading dark:text-white
                       placeholder:text-subtle dark:placeholder:text-gray-400
                       transition-all duration-300
                       focus:bg-background/60 dark:focus:bg-background/60
                       focus:border-[#4585f4]/50 dark:focus:border-[#4585f4]/50
                       focus:ring-2 focus:ring-[#4585f4]/20 dark:focus:ring-[#4585f4]/20
                       focus:shadow-lg focus:shadow-[#4585f4]/10
                       hover:border-white/20 dark:hover:border-white/20"
              required
              autoComplete="name"
            />
            <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 
                           text-subtle dark:text-gray-400
                           transition-colors duration-300
                           group-focus-within:text-[#4585f4]" aria-hidden="true" />
          </div>

          <div className="relative group">
            <Input
              type="text"
              name="companyName"
              placeholder={isNL ? 'Bedrijfsnaam' : 'Company Name'}
              value={formData.companyName}
              onChange={handleChange}
              className="pl-12 pr-4 py-4
                       bg-background/40 dark:bg-background/40
                       border border-white/10 dark:border-white/10
                       rounded-xl
                       text-base
                       text-heading dark:text-white
                       placeholder:text-subtle dark:placeholder:text-gray-400
                       transition-all duration-300
                       focus:bg-background/60 dark:focus:bg-background/60
                       focus:border-[#4585f4]/50 dark:focus:border-[#4585f4]/50
                       focus:ring-2 focus:ring-[#4585f4]/20 dark:focus:ring-[#4585f4]/20
                       focus:shadow-lg focus:shadow-[#4585f4]/10
                       hover:border-white/20 dark:hover:border-white/20"
              autoComplete="organization"
            />
            <Building className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 
                               text-subtle dark:text-gray-400
                               transition-colors duration-300
                               group-focus-within:text-[#4585f4]" aria-hidden="true" />
          </div>

          <div className="relative group">
            <Input
              type="email"
              name="email"
              placeholder={isNL ? 'E-mailadres' : 'Email Address'}
              value={formData.email}
              onChange={handleChange}
              className="pl-12 pr-4 py-4
                       bg-background/40 dark:bg-background/40
                       border border-white/10 dark:border-white/10
                       rounded-xl
                       text-base
                       text-heading dark:text-white
                       placeholder:text-subtle dark:placeholder:text-gray-400
                       transition-all duration-300
                       focus:bg-background/60 dark:focus:bg-background/60
                       focus:border-[#4585f4]/50 dark:focus:border-[#4585f4]/50
                       focus:ring-2 focus:ring-[#4585f4]/20 dark:focus:ring-[#4585f4]/20
                       focus:shadow-lg focus:shadow-[#4585f4]/10
                       hover:border-white/20 dark:hover:border-white/20"
              required
              autoComplete="email"
            />
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 
                           text-subtle dark:text-gray-400
                           transition-colors duration-300
                           group-focus-within:text-[#4585f4]" aria-hidden="true" />
          </div>

          <div className="relative group">
            <label htmlFor="goal" className="sr-only">
              {isNL ? 'Wat is je voornaamste doel?' : 'What is your main goal?'}
            </label>
            <select
              id="goal"
              name="goal"
              value={formData.goal}
              onChange={handleChange}
              className="w-full pl-12 pr-10 py-4 
                       bg-background/40 dark:bg-background/40
                       border border-white/10 dark:border-white/10
                       rounded-xl 
                       text-base font-normal 
                       appearance-none 
                       text-heading dark:text-white
                       transition-all duration-300
                       focus:bg-background/60 dark:focus:bg-background/60
                       focus:border-[#4585f4]/50 dark:focus:border-[#4585f4]/50
                       focus:ring-2 focus:ring-[#4585f4]/20 dark:focus:ring-[#4585f4]/20
                       focus:shadow-lg focus:shadow-[#4585f4]/10
                       hover:border-white/20 dark:hover:border-white/20
                       cursor-pointer"
              required
              aria-label={isNL ? 'Wat is je voornaamste doel?' : 'What is your main goal?'}
            >
              <option value="" className="text-gray-500 dark:text-gray-400 bg-background">
                {isNL ? 'Wat is je voornaamste doel?' : 'What is your main goal?'}
              </option>
              {goalOptions.map((option) => (
                <option key={option.value} value={option.value} className="text-gray-900 dark:text-white bg-background">
                  {option.label[isNL ? 'nl' : 'en']}
                </option>
              ))}
            </select>
            <Building className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 
                               text-subtle dark:text-gray-400
                               transition-colors duration-300
                               group-focus-within:text-[#4585f4] pointer-events-none" aria-hidden="true" />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg className="w-5 h-5 text-subtle dark:text-gray-400 
                            transition-colors duration-300
                            group-focus-within:text-[#4585f4]" 
                   fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          <div className="relative group">
            <textarea
              name="message"
              placeholder={isNL ? 'Jouw Bericht (optioneel)' : 'Your Message (optional)'}
              value={formData.message}
              onChange={handleChange}
              className="w-full h-36 pl-12 pr-4 py-4 
                       bg-background/40 dark:bg-background/40
                       border border-white/10 dark:border-white/10
                       rounded-xl 
                       text-base font-normal 
                       resize-none 
                       text-heading dark:text-white 
                       placeholder:text-subtle dark:placeholder:text-gray-400
                       transition-all duration-300
                       focus:bg-background/60 dark:focus:bg-background/60
                       focus:border-[#4585f4]/50 dark:focus:border-[#4585f4]/50
                       focus:ring-2 focus:ring-[#4585f4]/20 dark:focus:ring-[#4585f4]/20
                       focus:shadow-lg focus:shadow-[#4585f4]/10
                       hover:border-white/20 dark:hover:border-white/20"
              autoComplete="off"
            />
            <MessageSquare className="absolute left-4 top-4 h-5 w-5 
                                    text-subtle dark:text-gray-400
                                    transition-colors duration-300
                                    group-focus-within:text-[#4585f4]" aria-hidden="true" />
            <p className="text-xs text-subtle dark:text-gray-500 mt-2 ml-12">
              {isNL ? 'Optioneel - vertel ons meer over je project' : 'Optional - tell us more about your project'}
            </p>
          </div>

          {/* Premium Social Proof Badge */}
          <div className="bg-gradient-to-r from-[#4585f4]/10 via-[#4585f4]/5 to-[#6B8AE6]/10
                         dark:from-[#4585f4]/15 dark:via-[#4585f4]/10 dark:to-[#6B8AE6]/15
                         rounded-xl p-5 
                         border border-[#4585f4]/20 dark:border-[#4585f4]/30
                         backdrop-blur-sm
                         shadow-lg shadow-[#4585f4]/5
                         transition-all duration-300 hover:shadow-xl hover:shadow-[#4585f4]/10">
            <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                <div className="w-10 h-10 rounded-full 
                              bg-gradient-to-r from-[#4585f4] to-[#6B8AE6] 
                              border-2 border-white/30 dark:border-white/20
                              flex items-center justify-center 
                              text-white text-sm font-bold
                              shadow-lg shadow-[#4585f4]/30">
                  {SOCIAL_PROOF[language].clientCount}
                </div>
              </div>
              <div className="flex-1">
                <p className="text-sm md:text-base text-body dark:text-gray-300">
                  <span className="font-bold text-heading dark:text-white">{SOCIAL_PROOF[language].clientCount}</span>{' '}
                  {SOCIAL_PROOF[language].companies}
                </p>
                <p className="text-xs md:text-sm text-subtle dark:text-gray-400 mt-1">
                  {SOCIAL_PROOF[language].recent}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Premium Submit Button */}
        <Button 
          type="submit" 
          className="w-full group relative
                   bg-gradient-to-r from-[#4585f4] via-[#5A8FF5] to-[#6B8AE6]
                   text-white
                   py-6 text-base md:text-lg font-semibold
                   rounded-xl
                   transition-all duration-500 ease-out
                   overflow-hidden
                   shadow-xl shadow-[#4585f4]/25
                   hover:shadow-2xl hover:shadow-[#4585f4]/40
                   hover:scale-[1.01]
                   active:scale-[0.99]
                   transform-gpu
                   border border-[#4585f4]/20
                   disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          disabled={isLoading}
        >
          {/* Shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent 
                         -translate-x-full group-hover:translate-x-full 
                         transition-transform duration-1000 ease-out" />
          
          <span className="relative z-10 flex items-center justify-center gap-3">
            <Send className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            {isLoading 
              ? (isNL ? 'Verzenden...' : 'Sending...') 
              : (isNL ? 'Verstuur Bericht' : 'Send Message')}
          </span>
        </Button>
      </form>
    </div>
  );
};
