// import { useFilloutScript } from '../contexts/FilloutScriptContext';
import React from 'react';

interface FilloutFormProps {
  formId: string;
  className?: string;
  height?: string;
}

const FilloutForm = ({ formId, className = '', height = '500px' }: FilloutFormProps) => {
  // Remove context usage
  // const { status } = useFilloutScript();

  // Remove conditional rendering based on status
  // if (status === 'loading') {
  //   return <div style={{ height: height }} className="flex items-center justify-center"><p>Loading form script...</p></div>;
  // }
  //
  // if (status === 'error') {
  //   return <div style={{ height: height }} className="flex items-center justify-center"><p>Error loading form script.</p></div>;
  // }

  // Always render the div, assume script is handled elsewhere (e.g., by GetStarted)
  return (
    <div
      style={{ width: '100%', height }}
      className={`bg-background/50 rounded-lg backdrop-blur-sm ${className}`}
      data-fillout-id={formId}
      data-fillout-embed-type="standard"
      data-fillout-inherit-parameters
      data-fillout-dynamic-resize
      key={formId}
    />
  );
};

export default FilloutForm;
