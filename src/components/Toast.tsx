import React from 'react';

interface ToastProps {
  message: string | null;
}

export const Toast: React.FC<ToastProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-24 left-1/2 transform -translate-x-1/2 bg-[#0e0e0e] text-[#e5e2e1] px-4 py-2.5 rounded-full shadow-[4px_4px_0px_#c3f400] border border-[#c3f400] z-50 flex items-center gap-2 transition-all duration-300 animate-in fade-in slide-in-from-bottom-2 whitespace-nowrap">
      <span className="material-symbols-outlined text-[#c3f400] text-[18px]">check_circle</span>
      <span className="font-label-code-sm text-label-code-sm uppercase tracking-wider font-bold">
        {message}
      </span>
    </div>
  );
};
