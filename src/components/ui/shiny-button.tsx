import { cn } from "@/lib/utils"
import { ReactNode } from "react"

interface ShinyButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;  // Added onClick prop
}

export const ShinyButton = ({ children, className, onClick }: ShinyButtonProps) => {
  return (
    <button 
      className={cn(
        "shiny-cta",
        className
      )}
      onClick={onClick}  // Added onClick handler
    >
      <span>{children}</span>
    </button>
  )
}

export const ShinySecondaryButton = ({ children, className, onClick }: ShinyButtonProps) => {
  return (
    <button 
      className={cn(
        "min-w-[200px] sm:min-w-[240px]",
        "px-5 sm:px-7 py-2.5 sm:py-3.5",
        "rounded-full",
        "bg-[#0A0A0A] text-white",
        "border border-[#324c9e]/70",
        "font-medium",
        "text-sm sm:text-base",
        "transition-all duration-300",
        "hover:shadow-[0_0_20px_-5px_rgba(69,133,244,0.4)]",
        "hover:border-[#4585f4]",
        "hover:text-[#4585f4]",
        "active:translate-y-[1px]",
        className
      )}
      onClick={onClick}
    >
      <span>{children}</span>
    </button>
  )
}