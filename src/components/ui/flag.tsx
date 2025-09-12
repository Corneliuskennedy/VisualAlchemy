import React from "react";

interface FlagProps {
  code: "gb" | "nl";
  height?: string;
  className?: string;
}

const flags = {
  gb: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" className="w-full h-full">
      <clipPath id="s">
        <path d="M0,0 v30 h60 v-30 z"/>
      </clipPath>
      <path d="M0,0 v30 h60 v-30 z" fill="#012169"/>
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6"/>
      <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#s)" stroke="#C8102E" strokeWidth="4"/>
      <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10"/>
      <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6"/>
    </svg>
  ),
  nl: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 9 6" className="w-full h-full">
      <rect fill="#21468B" width="9" height="6"/>
      <rect fill="#FFF" width="9" height="4"/>
      <rect fill="#AE1C28" width="9" height="2"/>
    </svg>
  )
};

export function Flag({ code, height = "16", className = "" }: FlagProps) {
  const style = {
    height: `${height}px`,
    width: 'auto',
  };

  return (
    <div style={style} className={className}>
      {flags[code]}
    </div>
  );
} 