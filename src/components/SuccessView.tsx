import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

interface SuccessViewProps {
  onReset: () => void;
}

export const SuccessView = ({ onReset }: SuccessViewProps) => {
  return (
    <div className="landing-page">
      <div className="octopus-overlay" />
      
      <h1 className="logo">
        Octomatic.ai
      </h1>
      
      <div className="content flex flex-col items-center justify-center space-y-6">
        <CheckCircle2 className="w-16 h-16 text-green-500 animate-bounce" />
        <h2 className="heading text-2xl font-bold">
          Thank you for signing up!
        </h2>
        <p className="subheading text-lg">
          We'll notify you as soon as we launch.
        </p>
        <Button 
          onClick={onReset}
          className="mt-4"
        >
          Sign up another email
        </Button>
      </div>
    </div>
  );
};