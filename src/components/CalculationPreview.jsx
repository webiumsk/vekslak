// src/components/CalculationPreview.jsx
import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { formatCalcNumber } from "../i18n/config";

export default function CalculationPreview({
  t,
  activeTab,
  sellInputType,
  result,
  fee,
  btcPriceLocal,
  currencyConfig,
  onCopyFormula,
  isDark = false,
}) {
  if (!result || !btcPriceLocal || !fee) return null;

  const [copied, setCopied] = useState(false);
  const feeNum = Number(fee) || 0;

  const buildFormula = () => {
    if (activeTab === "buy") {
      return `${formatCalcNumber(result.eurAmount, 0)} / (${formatCalcNumber(
        btcPriceLocal,
        2
      )} * (1 + ${feeNum}/100)) = ${formatCalcNumber(result.btcAmount, 8)} BTC`;
    }

    if (activeTab === "sell" && sellInputType === "btc") {
      return `${formatCalcNumber(result.btcAmount, 8)} * (${formatCalcNumber(
        btcPriceLocal,
        2
      )} * (1 - ${feeNum}/100)) = ${formatCalcNumber(result.eurAmount, 2)} ${
        currencyConfig.symbol
      }`;
    }

    if (activeTab === "sell" && sellInputType === "fiat") {
      return `${formatCalcNumber(result.eurAmount, 0)} / (${formatCalcNumber(
        btcPriceLocal,
        2
      )} * (1 - ${feeNum}/100)) = ${formatCalcNumber(result.btcAmount, 8)} BTC`;
    }

    return "";
  };

  const formula = buildFormula();
  if (!formula) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(formula);
      setCopied(true);
      onCopyFormula?.();
      setTimeout(() => setCopied(false), 3000);
    } catch (e) {
      console.error("Copy failed", e);
    }
  };

  return (
    <div
      className={`mt-3 text-[11px] sm:text-xs font-mono text-center gap-2 ${
        isDark ? "text-slate-400" : "text-slate-500"
      }`}
    >
      <div className="flex items-center justify-center gap-2 mb-2">
        <div className="uppercase items-center tracking-[0.16em] opacity-70">
          {t.calculation}
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className={`mt-[1px] inline-flex items-center justify-center rounded-md border px-1 py-1 text-[11px] sm:text-xs transition-colors text-orange-600 ${
            isDark
              ? "border-slate-700 bg-slate-900 hover:bg-slate-800"
              : "border-slate-300 bg-white hover:bg-slate-50"
          }`}
          title={copied ? t.copied : "Copy formula"}
        >
          {copied ? (
            <Check className="w-3 h-3" />
          ) : (
            <Copy className="w-3 h-3" />
          )}
        </button>
      </div>

      <div className="flex-1 overflow-x-auto whitespace-nowrap">
        <span>{formula}</span>
      </div>
    </div>
  );
}
