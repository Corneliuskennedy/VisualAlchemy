import { Clock, Bot, LineChart } from "lucide-react";

const features = [
  {
    icon: Clock,
    title: "2x Faster Hiring",
    description: "AI screens, schedules, and ranks candidates—no HR headaches.",
    gradient: "from-blue-500 to-cyan-400",
    highlight: "2x Faster"
  },
  {
    icon: Bot,
    title: "40% Fewer Manual Tasks",
    description: "End duplicate data entry with Make.com-powered workflows.",
    gradient: "from-indigo-500 to-purple-400",
    highlight: "40% Fewer"
  },
  {
    icon: LineChart,
    title: "Real-Time ROI Tracking",
    description: "See time/cost savings live in your custom dashboard.",
    gradient: "from-emerald-500 to-teal-400",
    highlight: "Real-Time"
  }
];

export const WhatYouGet = () => {
  return (
    <section className="py-24 bg-[#101112]">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-white mb-4">
          What You'll Get
        </h2>
        <p className="text-gray-400 text-center mb-16 text-lg">
          Outcome-Driven Services That Deliver Results
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="relative group p-8 rounded-2xl bg-[#1E1F20] border border-gray-800 hover:border-gray-700 transition-all duration-300"
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500" />
              
              {/* Icon wrapper with gradient background */}
              <div className={`w-12 h-12 mb-6 rounded-xl flex items-center justify-center bg-gradient-to-br ${feature.gradient} p-2.5`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-4">
                {feature.title}
              </h3>
              
              <p className="text-gray-400 leading-relaxed">
                {feature.description}
              </p>
              
              {/* Subtle indicator for interaction */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gray-700 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}; 