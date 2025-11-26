// src/components/CopyToast.jsx
import { CheckCircle2, X } from "lucide-react";

export default function CopyToast({ open, message, isDark, onClose }) {
  if (!open) return null;

  return (
    <div className="fixed inset-x-0 bottom-1/2 z-50 flex justify-center px-4 pointer-events-none">
      <div
        className={`pointer-events-auto inline-flex items-center gap-3 rounded-xl px-4 py-3 shadow-lg border text-sm ${
          isDark
            ? "bg-white border-slate-200 text-slate-900"
            : "bg-slate-900/95 border-slate-700 text-slate-50"
        }`}
      >
        <CheckCircle2
          className={`w-5 h-5 ${isDark ? "text-green-400" : "text-green-600"}`}
        />
        <span className="font-medium">{message}</span>
        <button
          type="button"
          onClick={onClose}
          className="ml-1 rounded-lg p-1 transition-colors hover:bg-slate-800 text-slate-50"
        >
          <X className="w-4 h-4 text-white" />
        </button>
      </div>
    </div>
  );
}
