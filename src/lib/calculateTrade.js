// src/lib/calculateTrade.js

/**
 * Calculate data for BUY / SELL mode
 *
 * @param {Object} params
 * @param {"buy"|"sell"} params.mode 
 * @param {"btc"|"fiat"} params.sellInputType
 * @param {string|number} params.amount
 * @param {string|number} params.feePercent
 * @param {number} params.btcPriceLocal
 * @param {number} params.btcPriceUSD
 *
 * @returns {null|{
 *   mode: "buy" | "sell",
 *   priceWithFee: number,
 *   btcAmount: number,
 *   satsAmount: number,
 *   usdValue: number,
 *   eurAmount: number,   
 *   feeAmount: number
 * }}
 */
export function calculateTrade({
  mode,
  sellInputType = "fiat",
  amount,
  feePercent,
  btcPriceLocal,
  btcPriceUSD = null, // ← default null
}) {
  // BTC is mandatory
  if (!btcPriceLocal) return null;

  const amountNum = Number(amount);
  const feeNum = Number(feePercent);

  if (!Number.isFinite(amountNum) || !Number.isFinite(feeNum)) return null;
  if (amountNum <= 0 || feeNum < 0) return null;

  const feeRate = feeNum / 100;

  if (mode === "buy") {
    const priceWithFee = btcPriceLocal * (1 + feeRate);
    const btcAmount = amountNum / priceWithFee;
    const satsAmount = btcAmount * 100_000_000;

    // USD is optional – if not present, return null
    const usdValue = btcPriceUSD ? btcAmount * btcPriceUSD : null;

    const baseValue = btcAmount * btcPriceLocal;
    const feeAmount = amountNum - baseValue;

    return {
      mode: "buy",
      priceWithFee,
      btcAmount,
      satsAmount,
      usdValue,
      eurAmount: amountNum,
      feeAmount,
    };
  }

  if (mode === "sell") {
    const priceWithFee = btcPriceLocal * (1 - feeRate);

    if (sellInputType === "btc") {
      const btcAmount = amountNum;
      const eurAmount = btcAmount * priceWithFee;
      const satsAmount = btcAmount * 100_000_000;
      const usdValue = btcPriceUSD ? btcAmount * btcPriceUSD : null;
      const baseValue = btcAmount * btcPriceLocal;
      const feeAmount = baseValue - eurAmount;

      return {
        mode: "sell",
        priceWithFee,
        btcAmount,
        satsAmount,
        usdValue,
        eurAmount,
        feeAmount,
      };
    } else {
      // sellInputType === "fiat"
      const eurAmount = amountNum;
      const btcAmount = eurAmount / priceWithFee;
      const satsAmount = btcAmount * 100_000_000;
      const usdValue = btcPriceUSD ? btcAmount * btcPriceUSD : null;
      const baseValue = btcAmount * btcPriceLocal;
      const feeAmount = baseValue - eurAmount;

      return {
        mode: "sell",
        priceWithFee,
        btcAmount,
        satsAmount,
        usdValue,
        eurAmount,
        feeAmount,
      };
    }
  }

  return null;
}

