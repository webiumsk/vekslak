// src/components/SettingsModal.jsx
import { X } from "lucide-react";
import { currencies, languages, numberFormats } from "../i18n/config";

export default function SettingsModal({
  t,
  currency,
  language,
  numberFormatType,
  onClose,
  onCurrencyChange,
  onLanguageChange,
  onNumberFormatChange,
  isDark = false,
}) {
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center p-4 z-50 ${
        isDark ? "bg-black/70 backdrop-blur-sm" : "bg-black/50"
      }`}
      onClick={onClose}
    >
      <div
        className={`max-w-sm w-full rounded-2xl p-6 max-h-[90vh] overflow-y-auto shadow-2xl ${
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
            {t.settings}
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

        <div className="space-y-6">
          {/* Currency Selection */}
          <div>
            <label
              className={`block text-sm font-semibold mb-3 ${
                isDark ? "text-slate-200" : "text-slate-700"
              }`}
            >
              {t.currency}
            </label>
            <div className="grid grid-cols-3 gap-2">
              {Object.entries(currencies).map(([code, config]) => (
                <button
                  key={code}
                  onClick={() => onCurrencyChange(code)}
                  className={`p-4 rounded-xl font-semibold transition-all ${
                    currency === code
                      ? isDark
                        ? "bg-orange-500 text-white shadow-lg scale-105"
                        : "bg-orange-600 text-white shadow-lg scale-105"
                      : isDark
                      ? "bg-slate-800 text-slate-100 hover:bg-slate-700"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  <div className="text-2xl mb-1">{config.symbol}</div>
                  <div className="text-sm">{code}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Language Selection - SELECT DROPDOWN */}
          <div>
            <label
              className={`block text-sm font-semibold mb-3 ${
                isDark ? "text-slate-200" : "text-slate-700"
              }`}
            >
              {t.language}
            </label>
            <select
              value={language}
              onChange={(e) => onLanguageChange(e.target.value)}
              className={`w-full px-4 py-3 rounded-xl border-2 focus:outline-none transition-colors ${
                isDark
                  ? "bg-slate-900 border-slate-700 text-slate-100 focus:border-orange-400 focus:ring-2 focus:ring-orange-500/40"
                  : "bg-white border-slate-200 text-slate-800 focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
              }`}
            >
              {Object.entries(languages).map(([code, lang]) => (
                <option key={code} value={code}>
                  {lang.flag} {lang.name}
                </option>
              ))}
            </select>
          </div>

          {/* Number Format Selection */}
          <div>
            <label
              className={`block text-sm font-semibold mb-3 ${
                isDark ? "text-slate-2 00" : "text-slate-700"
              }`}
            >
              {t.numberFormat}
            </label>
            <div className="space-y-2">
              {Object.entries(numberFormats).map(([code, format]) => (
                <button
                  key={code}
                  onClick={() => onNumberFormatChange(code)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl font-medium transition-all w-full ${
                    numberFormatType === code
                      ? isDark
                        ? "bg-orange-500/20 text-orange-100 border border-orange-400/70 shadow-lg"
                        : "bg-orange-600 text-white shadow-lg"
                      : isDark
                      ? "bg-slate-800 text-slate-100 hover:bg-slate-700 border border-slate-700"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-transparent"
                  }`}
                >
                  <span>{format.name}</span>
                  <span
                    className={`font-mono text-sm ${
                      numberFormatType === code
                        ? isDark
                          ? "text-orange-100"
                          : "text-white"
                        : isDark
                        ? "text-slate-400"
                        : "text-slate-500"
                    }`}
                  >
                    {format.example}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className={`w-full py-3 rounded-xl font-semibold transition-colors mt-2 ${
              isDark
                ? "bg-slate-800 text-slate-100 hover:bg-slate-700"
                : "bg-slate-200 text-slate-700 hover:bg-slate-300"
            }`}
          >
            {t.close}
          </button>
        </div>
      </div>
    </div>
  );
}
