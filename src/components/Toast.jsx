import React, { useEffect } from 'react';
import { CheckCircle2, Info, X } from 'lucide-react';

export default function Toast({ message, type = 'info', onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  if (!message) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2.5 bg-[#1F2937] text-white text-xs font-semibold px-4 py-3 rounded-lg shadow-lg border border-slate-700 animate-toast">
      <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" />
      <span>{message}</span>
      <button onClick={onClose} className="text-slate-400 hover:text-white ml-2">
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
