import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, User, Send, MessageSquare, CheckCircle, RotateCcw, Video } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

type ProjectType = 'single-video' | 'series' | 'channel-rebrand' | 'other';

interface SimplifiedFormData {
  name: string;
  email: string;
  projectType: ProjectType | '';
  message: string;
}

export const ContactForm = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState<SimplifiedFormData>({
    name: '',
    email: '',
    projectType: '',
    message: ''
  });

  const projectTypeOptions: { value: ProjectType; label: string }[] = [
    { value: 'single-video', label: 'Single Video Project' },
    { value: 'series', label: 'Video Series / Multiple Videos' },
    { value: 'channel-rebrand', label: 'Channel Rebrand / Visual Identity' },
    { value: 'other', label: 'Other Project' },
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
          email: formData.email,
          projectType: formData.projectType,
          message: formData.message || '',
          source: 'visual-alchemy-contact',
        }),
      });

      if (response.ok) {
        setShowSuccess(true);
        toast({
          title: 'Request deployed',
          description: 'Response within 24 hours.',
        });
      } else {
        throw new Error(`Webhook submission failed with status: ${response.status}`);
      }
    } catch (error) {
      console.error('Contact form submission error:', error);
      
      // Provide more specific error messages
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Network error occurred';
      
      // Check if it's a network/CORS error
      const isNetworkError = errorMessage.includes('Failed to fetch') || 
                            errorMessage.includes('NetworkError') ||
                            errorMessage.includes('CORS');
      
      toast({
        variant: "destructive",
        title: isNetworkError ? 'Connection error' : 'Error sending message',
        description: isNetworkError 
          ? 'Unable to connect. Please check your connection or email kennet@octomatic.ai directly.'
          : 'Please try again or email kennet@octomatic.ai directly.',
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
      email: '',
      projectType: '',
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
          <h3 className="text-2xl md:text-3xl font-bold text-white">
            Message sent!
          </h3>
          <p className="text-base md:text-lg text-gray-300 max-w-md mx-auto font-mono" style={{ fontFamily: 'var(--font-mono), monospace' }}>
            RESPONSE WITHIN 24 HOURS
          </p>
        </div>
        <Button 
          onClick={resetForm} 
          variant="outline" 
          className="w-full group
                   border-2 border-white/20
                   bg-white/5
                   text-white
                   hover:bg-white/10
                   hover:border-white/30
                   transition-all duration-300
                   py-6 text-base font-semibold
                   rounded-sm
                   shadow-lg hover:shadow-xl">
          <RotateCcw className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:rotate-180" />
          <span className="font-mono" style={{ fontFamily: 'var(--font-mono), monospace' }}>NEW REQUEST</span>
        </Button>
      </div>
    );
  }

  return (
    <div className="backdrop-blur-md bg-black/40 p-8 md:p-10 rounded-sm 
                   border border-white/10
                   shadow-2xl shadow-black/20
                   transition-all duration-500 hover:shadow-3xl hover:shadow-[#10b981]/10">
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
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="pl-12 pr-4 py-4
                       bg-white/5
                       border border-white/10
                       rounded-sm
                       text-base
                       text-white
                       placeholder:text-gray-500
                       transition-all duration-300
                       focus:bg-white/10
                       focus:border-[#10b981]/50
                       focus:ring-2 focus:ring-[#10b981]/20
                       focus:shadow-lg focus:shadow-[#10b981]/10
                       hover:border-white/20"
              required
              autoComplete="name"
            />
            <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 
                           text-gray-400
                           transition-colors duration-300
                           group-focus-within:text-[#10b981]" aria-hidden="true" />
          </div>

          <div className="relative group">
            <Input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="pl-12 pr-4 py-4
                       bg-white/5
                       border border-white/10
                       rounded-sm
                       text-base
                       text-white
                       placeholder:text-gray-500
                       transition-all duration-300
                       focus:bg-white/10
                       focus:border-[#10b981]/50
                       focus:ring-2 focus:ring-[#10b981]/20
                       focus:shadow-lg focus:shadow-[#10b981]/10
                       hover:border-white/20"
              required
              autoComplete="email"
            />
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 
                           text-gray-400
                           transition-colors duration-300
                           group-focus-within:text-[#10b981]" aria-hidden="true" />
          </div>

          <div className="relative group">
            <label htmlFor="projectType" className="sr-only">
              Project Type
            </label>
            <select
              id="projectType"
              name="projectType"
              value={formData.projectType}
              onChange={handleChange}
              className="w-full pl-12 pr-10 py-4 
                       bg-white/5
                       border border-white/10
                       rounded-sm 
                       text-base font-normal 
                       appearance-none 
                       text-white
                       transition-all duration-300
                       focus:bg-white/10
                       focus:border-[#10b981]/50
                       focus:ring-2 focus:ring-[#10b981]/20
                       focus:shadow-lg focus:shadow-[#10b981]/10
                       hover:border-white/20
                       cursor-pointer
                       bg-[#050505]"
              required
              aria-label="Project Type"
            >
              <option value="" className="text-gray-500 bg-[#050505]">
                Project Type
              </option>
              {projectTypeOptions.map((option) => (
                <option key={option.value} value={option.value} className="text-white bg-[#050505]">
                  {option.label}
                </option>
              ))}
            </select>
            <Video className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 
                               text-gray-400
                               transition-colors duration-300
                               group-focus-within:text-[#10b981] pointer-events-none" aria-hidden="true" />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg className="w-5 h-5 text-gray-400 
                            transition-colors duration-300
                            group-focus-within:text-[#10b981]" 
                   fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          <div className="relative group">
            <textarea
              name="message"
              placeholder="Your Message (optional)"
              value={formData.message}
              onChange={handleChange}
              className="w-full h-36 pl-12 pr-4 py-4 
                       bg-white/5
                       border border-white/10
                       rounded-sm 
                       text-base font-normal 
                       resize-none 
                       text-white 
                       placeholder:text-gray-500
                       transition-all duration-300
                       focus:bg-white/10
                       focus:border-[#10b981]/50
                       focus:ring-2 focus:ring-[#10b981]/20
                       focus:shadow-lg focus:shadow-[#10b981]/10
                       hover:border-white/20"
              autoComplete="off"
            />
            <MessageSquare className="absolute left-4 top-4 h-5 w-5 
                                    text-gray-400
                                    transition-colors duration-300
                                    group-focus-within:text-[#10b981]" aria-hidden="true" />
            <p className="text-xs text-gray-500 mt-2 ml-12 font-mono" style={{ fontFamily: 'var(--font-mono), monospace' }}>
              Optional - Describe your educational content project
            </p>
          </div>

          {/* Social Proof Badge */}
          <div className="bg-gradient-to-r from-[#10b981]/10 via-[#10b981]/5 to-[#059669]/10
                         rounded-sm p-5 
                         border border-[#10b981]/20
                         backdrop-blur-sm
                         shadow-lg shadow-[#10b981]/5
                         transition-all duration-300 hover:shadow-xl hover:shadow-[#10b981]/10">
            <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                <div className="w-10 h-10 rounded-sm 
                              bg-gradient-to-r from-[#10b981] to-[#059669] 
                              border border-white/30
                              flex items-center justify-center 
                              text-white text-xs font-bold font-mono
                              shadow-lg shadow-[#10b981]/30"
                              style={{ fontFamily: 'var(--font-mono), monospace' }}>
                  48H
                </div>
              </div>
              <div className="flex-1">
                <p className="text-sm md:text-base text-gray-300 font-mono" style={{ fontFamily: 'var(--font-mono), monospace' }}>
                  <span className="font-bold text-white">48-HOUR</span>{' '}
                  TURNAROUND
                </p>
                <p className="text-xs md:text-sm text-gray-400 mt-1 font-mono" style={{ fontFamily: 'var(--font-mono), monospace' }}>
                  FROM AUDIO TO 4K ASSET
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <Button 
          type="submit" 
          className="w-full group relative
                   bg-[#10b981] hover:bg-[#059669]
                   text-black
                   py-6 text-base md:text-lg font-semibold
                   rounded-sm
                   transition-all duration-300
                   overflow-hidden
                   shadow-xl shadow-[#10b981]/25
                   hover:shadow-2xl hover:shadow-[#10b981]/40
                   border-2 border-[#10b981]
                   disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          <span className="relative z-10 flex items-center justify-center gap-3 font-mono" style={{ fontFamily: 'var(--font-mono), monospace' }}>
            <Send className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            {isLoading ? 'SENDING...' : 'DEPLOY REQUEST'}
          </span>
        </Button>
      </form>
    </div>
  );
};
