// src/components/Header.jsx
import { Bitcoin, Camera, Settings, Sun, Moon } from "lucide-react";

export default function Header({
  t,
  onOpenSettings,
  theme,
  onToggleTheme,
}) {
  const isDark = theme === "dark";

  return (
    <header
      role="banner"
      className="bg-gradient-to-r from-orange-500 via-orange-600 to-amber-600 pt-4 pb-4 px-8 text-white relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full -ml-24 -mb-24" />

      {/* Settings, Screenshot, Dark mode */}
      <div className="absolute top-4 right-12 flex gap-2">
        {/* Dark mode toggle */}
        <button
          type="button"
          onClick={onToggleTheme}
          className={`p-2 rounded-lg transition-all ${
            isDark
              ? "bg-black/20 text-white hover:text-slate-200"
              : "bg-black/20 text-slate-800 hover:text-slate-200"
          }`}
          title={isDark ? "Light mode" : "Dark mode"}
        >
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        <button
          type="button"
          onClick={onOpenSettings}
          className={`p-2 rounded-lg transition-all ${
            isDark
              ? "bg-black/20 text-white hover:text-slate-200"
              : "bg-black/20 text-slate-800 hover:text-slate-200"
          }`}
          title={t.settings}
        >
          <Settings className="w-5 h-5" />
        </button>
      </div>

      <div>
        <div className="flex">
          <a
            className="flex justify-start items-center gap-3 mb-2 text-white hover:text-slate-200"
            href="/"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-black/20 shadow-inner">
              <Bitcoin className="w-6 h-6 animate-pulse" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
              {t.title}
            </h1>
          </a>
        </div>

        <p className="text-xs sm:text-sm text-orange-50/90">{t.subtitle}</p>
      </div>
    </header>
  );
}
