import React from "react";

interface FlagProps {
  code: "us" | "nl";
  height?: string;
  className?: string;
}

const flags = {
  us: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 7410 3900" className="w-full h-full">
      <rect fill="#B22234" width="7410" height="3900"/>
      <path d="M0,450h7410m0,300H0m0,300h7410m0,300H0m0,300h7410m0,300H0m0,300h7410m0,300H0m0,300h7410m0,300H0m0,300h7410m0,300H0m0,300h7410" stroke="#FFF" strokeWidth="300"/>
      <rect fill="#3C3B6E" width="2964" height="2100"/>
      <g fill="#FFF">
        <g id="s18">
          <g id="s9">
            <g id="s5">
              <g id="s4">
                <path id="s" d="M247,90 247,200 292,200 292,90z"/>
                <use href="#s" y="210"/>
                <use href="#s" y="420"/>
                <use href="#s" y="630"/>
                <use href="#s" y="840"/>
              </g>
              <use href="#s4" x="247"/>
            </g>
            <use href="#s5" x="494"/>
          </g>
          <use href="#s9" x="988"/>
        </g>
        <use href="#s18" x="1976"/>
        <use href="#s9" x="4940"/>
      </g>
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