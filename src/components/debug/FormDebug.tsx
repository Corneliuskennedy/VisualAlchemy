import { RefObject } from 'react';

interface FormDebugProps {
  isLoading: boolean;
  error: string | null;
  formRef: RefObject<HTMLDivElement>;
  formId: string;
  onReload: () => void;
}

const FormDebug = ({ isLoading, error, formRef, formId, onReload }: FormDebugProps) => {
  return (
    <div className="fixed top-4 right-4 bg-black/80 text-white p-4 rounded-lg z-[9999] text-sm space-y-2">
      <div>Loading: {isLoading ? 'true' : 'false'}</div>
      <div>Error: {error || 'none'}</div>
      <div>Form Height: {formRef.current?.clientHeight || 'unknown'}px</div>
      <div>Form Display: {formRef.current?.style.display || 'unknown'}</div>
      <div>Form ID: {formId}</div>
      <button 
        onClick={onReload}
        className="px-2 py-1 bg-primary text-white rounded hover:bg-primary/90"
      >
        Reload Form
      </button>
    </div>
  );
};

export default FormDebug; 