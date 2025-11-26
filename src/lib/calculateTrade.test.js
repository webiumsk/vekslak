// src/lib/calculateTrade.test.js
import { describe, it, expect } from "vitest";
import { calculateTrade } from "./calculateTrade";

describe("calculateTrade — core math without USD", () => {
  it("BUY: 1000 EUR, price 100 000 EUR/BTC, fee 2%", () => {
    const result = calculateTrade({
      mode: "buy",
      sellInputType: "fiat",
      amount: 1000,
      feePercent: 2,
      btcPriceLocal: 100_000,
      btcPriceUSD: null, // USD price not provided
    });

    expect(result).not.toBeNull();
    expect(result.priceWithFee).toBe(102_000);
    expect(result.btcAmount).toBeCloseTo(0.00980392157, 6);
    expect(result.feeAmount).toBeCloseTo(19.60784313, 6);
    expect(result.eurAmount).toBe(1000);
  });

  it("SELL (BTC input): 0.01 BTC, price 100 000 EUR/BTC, fee 2%", () => {
    const result = calculateTrade({
      mode: "sell",
      sellInputType: "btc",
      amount: 0.01,
      feePercent: 2,
      btcPriceLocal: 100_000,
      btcPriceUSD: null,
    });

    expect(result).not.toBeNull();
    expect(result.priceWithFee).toBe(98_000);
    expect(result.eurAmount).toBeCloseTo(980, 4); // clien receives
    expect(result.feeAmount).toBeCloseTo(20, 4); // 1000 - 980
  });

  it("SELL (FIAT input): wants 1000 EUR", () => {
    const result = calculateTrade({
      mode: "sell",
      sellInputType: "fiat",
      amount: 1000,
      feePercent: 2,
      btcPriceLocal: 100_000,
      btcPriceUSD: null,
    });

    expect(result).not.toBeNull();
    expect(result.priceWithFee).toBe(98_000);
    expect(result.btcAmount).toBeCloseTo(0.0102040816, 6);
    expect(result.feeAmount).toBeCloseTo(20.40816327, 6);
  });
});
