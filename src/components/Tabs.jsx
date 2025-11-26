// src/components/Tabs.jsx
export default function Tabs({
  t,
  activeTab,
  isDark,
  onSelectBuy,
  onSelectSell,
}) {
  return (
    <div
      className={`flex gap-2 rounded-lg ${
        isDark ? "bg-slate-900" : "bg-slate-100"
      }`}
    >
      <button
        type="button"
        onClick={onSelectBuy}
        className={`flex-1 py-3 rounded-lg font-bold transition-all bg-black ${
          activeTab === "buy"
            ? "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg"
            : isDark
            ? "text-slate-400 hover:text-slate-200"
            : "text-slate-500 hover:text-slate-400"
        }`}
      >
        {t.buy}
      </button>
      <button
        type="button"
        onClick={onSelectSell}
        className={`flex-1 py-3 rounded-lg font-bold transition-all bg-black ${
          activeTab === "sell"
            ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg"
            : isDark
            ? "text-slate-400 hover:text-slate-200"
            : "text-slate-500 hover:text-slate-400"
        }`}
      >
        {t.sell}
      </button>
    </div>
  );
}
