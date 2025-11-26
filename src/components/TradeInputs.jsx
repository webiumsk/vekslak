// src/components/TradeInputs.jsx
import { Bitcoin, Calculator } from "lucide-react";

export default function TradeInputs({
  t,
  activeTab,
  sellInputType,
  currency,
  currencyConfig,
  amount,
  fee,
  onAmountChange,
  onFeeChange,
  onSellInputTypeChange,
  isDark = false,
}) {
  return (
    <div className="space-y-4">
      {/* Amount field */}
      <div className="group">
        <div className="flex items-center justify-between mb-2">
          <label
            className={`text-sm font-semibold flex items-center gap-2 ${
              isDark ? "text-slate-200" : "text-slate-700"
            }`}
          >
            {activeTab === "buy" ? (
              <>
                <span>{currencyConfig.symbol}</span>
                {t.clientPays} ({currency})
              </>
            ) : (
              <>
                {sellInputType === "btc" ? (
                  <>
                    <Bitcoin className="w-4 h-4 text-orange-600" />
                    {t.clientSells}
                  </>
                ) : (
                  <>
                    <span>{currencyConfig.symbol}</span>
                    {t.clientReceives} ({currency})
                  </>
                )}
              </>
            )}
          </label>

          {/* BTC/FIAT Toggle for SELL mode */}
          {activeTab === "sell" && (
            <div
              className={`flex gap-1 rounded-lg p-1 ${
                isDark ? "bg-slate-800" : "bg-slate-100"
              }`}
            >
              <button
                type="button"
                onClick={() => onSellInputTypeChange("fiat")}
                className={`px-3 py-1 text-xs font-semibold rounded transition-all ${
                  sellInputType === "fiat"
                    ? "bg-orange-600 text-white"
                    : isDark
                    ? "text-slate-400 hover:text-slate-200"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {currency}
              </button>
              <button
                type="button"
                onClick={() => onSellInputTypeChange("btc")}
                className={`px-3 py-1 text-xs font-semibold rounded transition-all bg-black ${
                  sellInputType === "btc"
                    ? "bg-orange-600 text-white"
                    : isDark
                    ? "text-slate-400 hover:text-slate-200"
                    : "text-white/70 hover:text-white"
                }`}
              >
                BTC
              </button>
            </div>
          )}
        </div>

        <div className="relative">
          <input
            type="number"
            value={amount}
            onChange={(e) => onAmountChange(e.target.value)}
            placeholder={
              activeTab === "buy"
                ? t.exampleAmount
                : sellInputType === "btc"
                ? "0.01"
                : t.exampleAmount
            }
            step={
              activeTab === "buy"
                ? "1"
                : sellInputType === "btc"
                ? "0.00000001"
                : "1"
            }
            className={`w-full px-4 py-3 pl-12 border-2 rounded-lg focus:outline-none text-lg transition-all group-hover:border-slate-300 ${
              isDark
                ? "border-slate-700 bg-slate-900 text-slate-100 focus:border-orange-400 focus:ring-2 focus:ring-orange-500/40"
                : "border-slate-200 bg-white text-slate-900 focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
            }`}
          />
          <span
            className={`absolute left-4 top-1/2 -translate-y-1/2 font-semibold text-lg bg-b ${
              isDark ? "text-slate-500" : "text-slate-400"
            }`}
          >
            {activeTab === "buy"
              ? currencyConfig.symbol
              : sellInputType === "btc"
              ? "₿"
              : currencyConfig.symbol}
          </span>
        </div>
      </div>

      {/* Fee field */}
      <div className="group">
        <label
          className={`text-sm font-semibold mb-2 flex items-center gap-2 ${
            isDark ? "text-slate-200" : "text-slate-700"
          }`}
        >
          <Calculator className="w-4 h-4 text-orange-600" />
          {t.fee}
        </label>
        <div className="relative">
          <input
            type="number"
            value={fee}
            onChange={(e) => onFeeChange(e.target.value)}
            placeholder={t.exampleFee}
            step="0.1"
            className={`w-full px-4 py-3 pl-12 border-2 rounded-lg focus:outline-none text-lg transition-all group-hover:border-slate-300 ${
              isDark
                ? "border-slate-700 bg-slate-900 text-slate-100 focus:border-orange-400 focus:ring-2 focus:ring-orange-500/40"
                : "border-slate-200 bg-white text-slate-900 focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
            }`}
          />
          <span
            className={`absolute left-4 top-1/2 -translate-y-1/2 font-semibold ${
              isDark ? "text-slate-500" : "text-slate-400"
            }`}
          >
            %
          </span>
        </div>
      </div>
    </div>
  );
}
