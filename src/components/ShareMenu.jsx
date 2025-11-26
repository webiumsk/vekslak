// src/components/ShareMenu.jsx
import { X, Download, Share2, AlertTriangle } from "lucide-react";
import { useIsFirefoxAndroid } from "../hooks/useIsFirefoxAndroid";

export default function ShareMenu({
  t,
  onClose,
  onShare,
  onDownload,
  isDark = false,
}) {
  const isFirefoxAndroid = useIsFirefoxAndroid();

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center p-4 z-50 ${
        isDark ? "bg-black/70 backdrop-blur-sm" : "bg-black/50"
      }`}
      onClick={onClose}
    >
      <div
        className={`max-w-sm w-full rounded-2xl p-6 shadow-2xl ${
          isDark
            ? "bg-slate-900 border border-slate-800 text-slate-100"
            : "bg-white text-slate-900"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2
            className={`text-2xl font-bold ${
              isDark ? "text-slate-50" : "text-slate-800"
            }`}
          >
            {t.shareTitle}
          </h2>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg transition-colors ${
              isDark
                ? "hover:bg-slate-800 text-slate-300"
                : "hover:bg-slate-100 text-slate-500"
            }`}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Buttons */}
        <div className="space-y-3">
          <button
            onClick={onShare}
            className="w-full flex items-center justify-center gap-3 py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-xl transition-all shadow-lg active:scale-95"
          >
            <Share2 className="w-6 h-6" />
            {t.share}
          </button>

          <button
            onClick={onDownload}
            className={`w-full flex items-center justify-center gap-3 py-4 font-semibold rounded-xl transition-all active:scale-95 ${
              isDark
                ? "bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700"
                : "bg-slate-100 hover:bg-slate-200 text-slate-700"
            }`}
          >
            <Download className="w-6 h-6" />
            {t.download}
          </button>
        </div>

        {/* Firefox Android badge */}
        {isFirefoxAndroid && (
          <div className="mt-4 flex justify-center">
            <span
              className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg text-[11px] leading-none ${
                isDark
                  ? "bg-amber-500/10 text-amber-200 border border-amber-500/40"
                  : "bg-amber-50 text-amber-800 border border-amber-200"
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>{t.useIsFirefoxAndroid}</span>
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
