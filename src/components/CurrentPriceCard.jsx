// src/components/CurrentPriceCard.jsx
import { TrendingUp, RefreshCw, DollarSign } from "lucide-react";
import { formatNumber } from "../i18n/config";

export default function CurrentPriceCard({
  t,
  isDark,
  loading,
  btcPriceLocal,
  btcPriceUSD,
  currencyConfig,
  numberFormat,
  lastUpdate,
  onRefresh,
  formatTime,
}) {
  return (
    <div
      className={`rounded-lg p-5 border-2 shadow-md ${
        isDark
          ? "bg-slate-900 border-slate-800 text-slate-100"
          : "bg-gradient-to-br from-slate-50 to-slate-100 border-slate-200 text-slate-900"
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <TrendingUp
            className={`w-5 h-5 ${
              isDark ? "text-orange-400" : "text-orange-600"
            }`}
          />
          <span className="font-semibold">{t.currentRate}</span>
        </div>
        <button
          type="button"
          onClick={onRefresh}
          disabled={loading}
          className={`p-2 rounded-lg transition-all disabled:opacity-50 active:scale-95 ${
            isDark ? "hover:bg-slate-800" : "hover:bg-white/80"
          }`}
          title="Refresh"
        >
          <RefreshCw
            className={`w-5 h-5 ${
              isDark ? "text-green-400" : "text-green-600"
            } ${loading ? "animate-spin" : ""}`}
          />
        </button>
      </div>

      {loading ? (
        <div className="text-center py-4">
          <div
            className={`animate-pulse ${
              isDark ? "text-slate-400" : "text-slate-600"
            }`}
          >
            {t.loading}
          </div>
        </div>
      ) : (
        <>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span
                className={`text-3xl ${
                  isDark ? "text-slate-200" : "text-slate-600"
                }`}
              >
                {currencyConfig.symbol}
              </span>
              <span className="text-4xl font-bold pl-1">
                {formatNumber(btcPriceLocal, 0, numberFormat)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign
                className={`w-5 h-5 ${
                  isDark ? "text-slate-400" : "text-slate-500"
                }`}
              />
              <span className="text-xl font-semibold">
                {formatNumber(btcPriceUSD, 0, numberFormat)}
              </span>
              <span
                className={`text-lg ${
                  isDark ? "text-slate-400" : "text-slate-500"
                }`}
              >
                USD
              </span>
            </div>
          </div>
          {lastUpdate && (
            <div
              className={`text-xs mt-3 flex items-center gap-1 ${
                isDark ? "text-slate-500" : "text-slate-500"
              }`}
            >
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              {t.updated}: {formatTime(lastUpdate)}
            </div>
          )}
        </>
      )}
    </div>
  );
}
