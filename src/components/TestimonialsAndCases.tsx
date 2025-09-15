import { MessageSquare, TrendingUp, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const TestimonialsAndCases = () => {
  return (
    <section className="py-24 relative">
      <div className="mx-auto px-6 w-full max-w-6xl relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">What Our Clients Say</h2>
        
        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="bg-secondary/20 backdrop-blur-sm border-border/50">
            <CardContent className="pt-6">
              <MessageSquare className="w-8 h-8 text-primary mb-4" />
              <blockquote className="text-lg mb-4">
                "Their automation systems completely transformed our lead generation process. We've seen a 300% increase in qualified leads."
              </blockquote>
              <footer className="text-sm text-gray-400">
                - Sarah Chen, CEO of TechFlow
              </footer>
            </CardContent>
          </Card>

          <Card className="bg-secondary/20 backdrop-blur-sm border-border/50">
            <CardContent className="pt-6">
              <MessageSquare className="w-8 h-8 text-primary mb-4" />
              <blockquote className="text-lg mb-4">
                "The AI-powered fulfillment system they built saves us 20 hours per week in manual work."
              </blockquote>
              <footer className="text-sm text-gray-400">
                - Michael Roberts, Founder of DigitalFirst
              </footer>
            </CardContent>
          </Card>

          <Card className="bg-secondary/20 backdrop-blur-sm border-border/50">
            <CardContent className="pt-6">
              <MessageSquare className="w-8 h-8 text-primary mb-4" />
              <blockquote className="text-lg mb-4">
                "The team's expertise in operations helped us scale from 6 to 7 figures in just 8 months."
              </blockquote>
              <footer className="text-sm text-gray-400">
                - Alex Thompson, COO of GrowthLabs
              </footer>
            </CardContent>
          </Card>
        </div>

        {/* Featured Case Study */}
        <div className="bg-secondary/20 backdrop-blur-sm border border-border/50 rounded-lg p-8">
          <h3 className="text-2xl font-bold mb-6">Featured Case Study: DigitalFirst Agency</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-xl font-semibold mb-4">The Challenge</h4>
              <p className="text-gray-300 mb-4">
                DigitalFirst was struggling with manual processes, taking 40+ hours per week on operational tasks.
                Their team was overwhelmed, and growth had plateaued.
              </p>
            </div>
            
            <div>
              <h4 className="text-xl font-semibold mb-4">The Results</h4>
              <ul className="space-y-4">
                <li className="flex items-center gap-2">
                  <TrendingUp className="text-primary" />
                  <span>Revenue increased by 156% in 6 months</span>
                </li>
                <li className="flex items-center gap-2">
                  <Users className="text-primary" />
                  <span>Team efficiency improved by 80%</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsAndCases;