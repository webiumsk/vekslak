// src/components/Footer.jsx
import { Github } from "lucide-react";

export default function Footer({ t, version, isDark }) {
  return (
    <footer
      role="footerinfo"
      className={`flex-col text-xs text-center py-4 border-t space-y-1 ${
        isDark
          ? "bg-slate-900 border-slate-800 text-slate-400"
          : "border-slate-200 text-slate-500"
      }`}
    >
      <div className="flex justify-center items-center gap-2">
        {/* Version */}
        <span className="text-[11px] opacity-70">v {version}</span>

        <span
          className={`${
            isDark ? "text-slate-600" : "text-slate-700"
          } select-none`}
        >
          •
        </span>

        {/* Data source text */}
        <span>{t.dataFrom}</span>

        <span
          className={`${
            isDark ? "text-slate-600" : "text-slate-700"
          } select-none`}
        >
          •
        </span>

        {/* GitHub link */}
        <a
          href="https://github.com/webiumsk/vekslak"
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-1 transition-colors ${
            isDark
              ? "text-slate-300 hover:text-white"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <Github className="w-3.5 h-3.5" />
          <span className="text-[11px] uppercase tracking-[0.16em]">
            GitHub
          </span>
        </a>
      </div>
    </footer>
  );
}
