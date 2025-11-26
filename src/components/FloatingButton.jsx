// src/components/FloatingButton.jsx
import { Camera } from "lucide-react";

export default function FloatingButton({
  t,
  theme,
  onScreenshot,
}) {
  const isDark = theme === "dark";

    return (
      <div className={`flex justify-end`}>
        <button
          type="button"
          onClick={onScreenshot}
          className={`fixed w-10 h-910 top-4 z-50 rounded-r-none transition-all  ${
            isDark
              ? "bg-black/20 text-white hover:text-slate-900"
              : "bg-black/20 text-slate-800 hover:text-slate-200"
          }`}
          title={t.screenshot}
        >
          <Camera className="w-5 h-5 -ml-2 -mt-0.5" />
        </button>
      </div>
    );
}