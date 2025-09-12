import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Rocket } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { FormData } from '@/types/form';

interface SignupFormProps {
  onSubmit: (formData: FormData) => Promise<void>;
  isLoading: boolean;
}

export const SignupForm = ({ onSubmit, isLoading }: SignupFormProps) => {
  const [formData, setFormData] = useState<FormData>({
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
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
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleRadioChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      companySize: value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <Input
        type="text"
        name="firstName"
        placeholder="First Name"
        value={formData.firstName}
        onChange={handleChange}
        className="input-field"
        required
      />
      <Input
        type="text"
        name="lastName"
        placeholder="Last Name"
        value={formData.lastName}
        onChange={handleChange}
        className="input-field"
        required
      />
      <Input
        type="email"
        name="email"
        placeholder="Your Email Here"
        value={formData.email}
        onChange={handleChange}
        className="input-field"
        required
      />
      <Input
        type="text"
        name="companyName"
        placeholder="Company Name"
        value={formData.companyName}
        onChange={handleChange}
        className="input-field"
        required
      />
      
      <div className="space-y-2">
        <Label className="block text-sm font-medium mb-2">
          Company Size
        </Label>
        <RadioGroup
          value={formData.companySize}
          onValueChange={handleRadioChange}
          className="grid grid-cols-4 gap-2"
        >
          <div className="flex items-center space-x-2 input-field rounded-md px-4 py-2">
            <RadioGroupItem value="micro" id="micro" />
            <Label htmlFor="micro">1-5</Label>
          </div>
          <div className="flex items-center space-x-2 input-field rounded-md px-4 py-2">
            <RadioGroupItem value="small" id="small" />
            <Label htmlFor="small">6-20</Label>
          </div>
          <div className="flex items-center space-x-2 input-field rounded-md px-4 py-2">
            <RadioGroupItem value="mid" id="mid" />
            <Label htmlFor="mid">21-50</Label>
          </div>
          <div className="flex items-center space-x-2 input-field rounded-md px-4 py-2">
            <RadioGroupItem value="large" id="large" />
            <Label htmlFor="large">50+</Label>
          </div>
        </RadioGroup>
      </div>

      <Button 
        type="submit" 
        className="bg-[#324c9e] hover:bg-[#324c9e]/90 text-white w-full"
        disabled={isLoading}
      >
        {isLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Rocket className="animate-bounce" />
        )}
        {isLoading ? "Submitting..." : "Get Started"}
      </Button>
    </form>
  );
};