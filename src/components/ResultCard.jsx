// src/components/ResultCard.jsx
import { Bitcoin, DollarSign, Copy, Check } from "lucide-react";
import { formatNumber } from "../i18n/config";

export default function ResultCard({
  t,
  result,
  fee,
  activeTab,
  sellInputType,
  currency,
  currencyConfig,
  numberFormat,
  unit,
  onUnitChange,
  copied,
  onCopyBtcSats,
  onCopyFiat,
  isDark = false,
}) {
  if (!result) return null;

  return (
    <div className="space-y-4 pt-4">
      <div
        className={`rounded-lg p-5 border shadow-sm ${
          isDark
            ? "bg-gradient-to-br from-black to-gray-700 border-orange-900/60"
            : "bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200"
        }`}
      >
        <h3
          className={`font-bold flex items-center gap-2 mb-4 ${
            isDark ? "text-slate-50" : "text-slate-800"
          }`}
        >
          <Bitcoin
            className={`w-5 h-5 ${
              isDark ? "text-orange-300" : "text-orange-600"
            }`}
          />
          {t.result}
        </h3>

        <div className="space-y-3">
          {/* Price with fee */}
          <div
            className={`rounded-xl p-3 flex justify-between items-center ${
              isDark ? "bg-slate-900/80 border border-slate-700" : "bg-white"
            }`}
          >
            <span
              className={`text-sm ${
                isDark ? "text-slate-300" : "text-slate-600"
              }`}
            >
              {t.rateWithFee} {activeTab === "buy" ? "+" : "-"}
              {fee}%:
            </span>
            <span
              className={`font-bold ${
                isDark ? "text-slate-50" : "text-slate-900"
              }`}
            >
              {formatNumber(result.priceWithFee, 2, numberFormat)}{" "}
              {currencyConfig.symbol}
            </span>
          </div>

          {activeTab === "buy" ? (
            /* BUY – client get BTC / SATS */
            <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl p-5 shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="text-xs uppercase tracking-wider opacity-90">
                  {t.clientReceives}
                </div>
                {/* BTC/SATS toggle */}
                <div className="flex gap-1 bg-white/20 rounded-lg p-1">
                  <button
                    type="button"
                    onClick={() => onUnitChange("btc")}
                    className={`px-2 py-1 text-xs font-semibold rounded transition-all bg-black ${
                      unit === "btc"
                        ? "bg-white text-green-600"
                        : "text-white/70 hover:text-white"
                    }`}
                  >
                    BTC
                  </button>
                  <button
                    type="button"
                    onClick={() => onUnitChange("sats")}
                    className={`px-2 py-1 text-xs font-semibold rounded transition-all bg-black ${
                      unit === "sats"
                        ? "bg-white text-green-600"
                        : "text-white/70 hover:text-white"
                    }`}
                  >
                    SATS
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div>
                    <div className="text-2xl font-bold font-mono">
                      {unit === "btc"
                        ? formatNumber(result.btcAmount, 8, numberFormat)
                        : formatNumber(
                            Math.round(result.satsAmount),
                            0,
                            numberFormat
                          )}
                    </div>
                    <div className="text-sm opacity-90">
                      {unit === "btc" ? "BTC" : "SATS"}
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={onCopyBtcSats}
                  className="p-3 bg-white/20 hover:bg-white/30 rounded-lg transition-all active:scale-95"
                  title="Copy"
                >
                  {copied ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          ) : (
            /* SELL – 2 modes by sellInputType */
            <>
              {sellInputType === "btc" ? (
                // Input: BTC, output: FIAT
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl p-5 shadow-lg">
                  <div className="text-xs uppercase tracking-wider opacity-90 mb-2">
                    {t.clientReceives}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div>
                        <div className="text-2xl font-bold">
                          {formatNumber(result.eurAmount, 2, numberFormat)}
                        </div>
                        <div className="text-sm opacity-90">{currency}</div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => onCopyFiat(result.eurAmount)}
                      className="p-3 bg-white/20 hover:bg-white/30 rounded-lg transition-all active:scale-95"
                      title="Copy"
                    >
                      {copied ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              ) : (
                // Input: FIAT (client wants X EUR), output: BTC/SATS to sell
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl p-5 shadow-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-xs uppercase tracking-wider opacity-90">
                      {t.clientSells}
                    </div>
                    {/* BTC/SATS toggle */}
                    <div className="flex gap-1 bg-white/20 rounded-lg p-1">
                      <button
                        type="button"
                        onClick={() => onUnitChange("btc")}
                        className={`px-2 py-1 text-xs font-semibold rounded transition-all ${
                          unit === "btc"
                            ? "bg-white text-orange-600"
                            : "text-white/70 hover:text-white"
                        }`}
                      >
                        BTC
                      </button>
                      <button
                        type="button"
                        onClick={() => onUnitChange("sats")}
                        className={`px-2 py-1 text-xs font-semibold rounded transition-all ${
                          unit === "sats"
                            ? "bg-white text-orange-600"
                            : "text-white/70 hover:text-white"
                        }`}
                      >
                        SATS
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div>
                        <div className="text-2xl font-bold font-mono">
                          {unit === "btc"
                            ? formatNumber(result.btcAmount, 8, numberFormat)
                            : formatNumber(
                                Math.round(result.satsAmount),
                                0,
                                numberFormat
                              )}
                        </div>
                        <div className="text-sm opacity-90">
                          {unit === "btc" ? "BTC" : "SATS"}
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={onCopyBtcSats}
                      className="p-3 bg-white/20 hover:bg-white/30 rounded-lg transition-all active:scale-95"
                      title="Copy"
                    >
                      {copied ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              )}
            </>
          )}

          {/* USD Value */}
          <div
            className={`rounded-xl p-3 flex justify-between items-center ${
              isDark ? "bg-slate-900/80 border border-slate-700" : "bg-white"
            }`}
          >
            <span className="flex items-center gap-2">
              <DollarSign
                className={`w-5 h-5 ${
                  isDark ? "text-green-400" : "text-green-600"
                }`}
              />
            </span>
            <span className="font-bold">
              $ {formatNumber(result.usdValue, 2, numberFormat)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
