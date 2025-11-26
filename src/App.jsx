// src/components/App.jsx
import { useState, useEffect, useMemo } from "react";
import { calculateTrade } from "./lib/calculateTrade";


import {
  translations,
  currencies,
  languages,
  numberFormats,
  formatNumber,
  defaultCurrency,
  defaultLanguage,
  defaultNumberFormatType,
} from "./i18n/config";

import { version } from "../package.json";
import Header from "./components/Header.jsx";
import FloatingButton from "./components/FloatingButton.jsx";
import SettingsModal from "./components/SettingsModal.jsx";
import ShareMenu from "./components/ShareMenu.jsx";
import Tabs from "./components/Tabs.jsx";
import TradeInputs from "./components/TradeInputs.jsx";
import CurrentPriceCard from "./components/CurrentPriceCard.jsx";
import ResultCard from "./components/ResultCard.jsx";
import CalculationPreview from "./components/CalculationPreview.jsx";
import Footer from "./components/Footer.jsx";
import CopyToast from "./components/CopyToast.jsx";

export default function Vexlak() {
  const [btcPriceLocal, setBtcPriceLocal] = useState(null);
  const [btcPriceUSD, setBtcPriceUSD] = useState(null);
  const [loading, setLoading] = useState(true);
  const [amount, setAmount] = useState("");
  const [fee, setFee] = useState("2");
  const [lastUpdate, setLastUpdate] = useState(null);
  const [copied, setCopied] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [screenshotBlob, setScreenshotBlob] = useState(null);
  const [activeTab, setActiveTab] = useState("buy"); // 'buy' or 'sell'
  const [unit, setUnit] = useState("btc"); // 'btc' or 'sats'
  const [sellInputType, setSellInputType] = useState("fiat"); // 'btc' or 'fiat' for SELL mode
  const [currency, setCurrency] = useState(
    () => localStorage.getItem("btc-currency") || defaultCurrency || "EUR"
  );
  const [language, setLanguage] = useState(
    () => localStorage.getItem("btc-language") || defaultLanguage || "en"
  );
  const [numberFormatType, setNumberFormatType] = useState(
    () =>
      localStorage.getItem("btc-number-format") ||
      defaultNumberFormatType ||
      "european"
  );
  const [copyToast, setCopyToast] = useState({
    open: false,
    message: "",
  });

  // Dark / light theme
  const [theme, setTheme] = useState(
    () => localStorage.getItem("vexlak-theme") || "light"
  );

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      localStorage.setItem("vexlak-theme", next);
      return next;
    });
  };

  const t = translations[language];
  const currencyConfig = currencies[currency];
  const numberFormat = numberFormats[numberFormatType];

  const showCopyToast = (message) => {
    setCopyToast({ open: true, message });

    setTimeout(() => {
      setCopyToast((prev) => ({ ...prev, open: false }));
    }, 3000);
  };

  const fetchBTCPrice = async () => {
    setLoading(true);
    try {
      // 1. Fetch EUR/USD rate
      const forexResponse = await fetch(
        "https://api.exchangerate-api.com/v4/latest/EUR"
      );
      const forexData = await forexResponse.json();
      const eurToUsd = forexData.rates.USD;
      const eurToCurrency = forexData.rates[currency];

      // 2. Fetch BTC/USD price from Binance
      const btcResponse = await fetch(
        "https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT"
      );
      const btcData = await btcResponse.json();
      const btcInUsd = parseFloat(btcData.price);

      // 3. Calculate BTC price in selected currency
      let btcInLocalCurrency;
      if (currency === "EUR") {
        // BTC/USD ÷ EUR/USD = BTC/EUR
        btcInLocalCurrency = btcInUsd / eurToUsd;
      } else {
        // BTC/USD × (Selected Currency / USD) = BTC/Selected Currency
        const usdToLocal = eurToCurrency / eurToUsd;
        btcInLocalCurrency = btcInUsd * usdToLocal;
      }

      setBtcPriceLocal(btcInLocalCurrency);
      setBtcPriceUSD(btcInUsd);
      setLastUpdate(new Date());
    } catch (error) {
      console.error("Error fetching BTC price:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  useEffect(() => {
    fetchBTCPrice();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency]);

  const result = useMemo(() => {
    return calculateTrade({
      mode: activeTab,
      sellInputType,
      amount,
      feePercent: fee,
      btcPriceLocal,
      btcPriceUSD,
    });
  }, [activeTab, sellInputType, amount, fee, btcPriceLocal, btcPriceUSD]);

  const formatTime = (date) => {
    if (!date) return "";

    const locale = languages[language].locale;

    return (
      date.toLocaleDateString(locale, {
        day: "numeric",
        month: "long",
        year: "numeric",
      }) +
      " • " +
      date.toLocaleTimeString(locale, {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      })
    );
  };

  const handleCopy = () => {
    if (result) {
      if (unit === "btc") {
        navigator.clipboard.writeText(result.btcAmount.toFixed(8));
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
        showCopyToast(t.copied); // eg. "BTC value copied!"
      } else {
        navigator.clipboard.writeText(Math.round(result.satsAmount).toString());
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
        showCopyToast(t.satsCopied); // eg. "SATS value copied!"
      }
    }
  };

  const handleCopyFiatAmount = (value) => {
    navigator.clipboard.writeText(value.toFixed(2));
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
    showCopyToast(`${formatNumber(value, 2, numberFormat)} ${currency} copied`);
  };

  const handleCurrencyChange = (newCurrency) => {
    setCurrency(newCurrency);
    localStorage.setItem("btc-currency", newCurrency);
  };

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    localStorage.setItem("btc-language", newLanguage);
  };

  const handleNumberFormatChange = (newFormat) => {
    setNumberFormatType(newFormat);
    localStorage.setItem("btc-number-format", newFormat);
  };

  const handleScreenshot = async () => {
    try {
      // Dynamically import html2canvas
      const html2canvas = (await import("html2canvas")).default;

      const element = document.querySelector(".screenshot-container");
      const canvas = await html2canvas(element, {
        backgroundColor: null,
        scale: 2,
        logging: false,
      });

      // Convert to blob
      canvas.toBlob((blob) => {
        setScreenshotBlob(blob);
        setShowShareMenu(true);
      });
    } catch (error) {
      console.error("Screenshot error:", error);
    }
  };

  const handleShare = async () => {
    if (!screenshotBlob) return;

    if (!navigator.clipboard || !window.ClipboardItem) {
      console.warn(
        "Clipboard image copy not supported, falling back to download."
      );
      handleDownload();
      return;
    }

    try {
      const item = new ClipboardItem({
        "image/png": screenshotBlob,
      });

      await navigator.clipboard.write([item]);
      if (typeof showCopyToast === "function") {
        showCopyToast(t.screenshotCopied || "Screenshot copied to clipboard");
      } else {
        console.log("Screenshot copied to clipboard");
      }

      setShowShareMenu(false);
    } catch (error) {
      console.error("Clipboard write failed, falling back to download:", error);
      handleDownload();
    }
  };

  const handleDownload = () => {
    if (!screenshotBlob) return;

    const url = URL.createObjectURL(screenshotBlob);
    const link = document.createElement("a");
    const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, "-");
    link.download = `vekslak-${timestamp}.png`;
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
    setShowShareMenu(false);
  };

  const isDark = theme === "dark";

  //console.log("DEBUG prices", { btcPriceLocal, btcPriceUSD });

  return (
    <div className="min-h-screen flex justify-center bg-gradient-to-br from-slate-900 via-orange-900 to-slate-900">
      <div className="w-full max-w-lg relative">
        <FloatingButton t={t} theme={theme} onScreenshot={handleScreenshot} />
        <div
          className={`backdrop-blur-sm rounded-lg shadow-2xl overflow-hidden relative ${
            isDark ? "bg-slate-900/85" : "bg-white/95 text-slate-900"
          }`}
        >
          <Header
            t={t}
            theme={theme}
            onToggleTheme={toggleTheme}
            onScreenshot={handleScreenshot}
            onOpenSettings={() => setShowSettings(true)}
          />

          <main
            role="main"
            className={`p-6 py-3 space-y-3 screenshot-container backdrop-blur-sm ${
              isDark ? "bg-slate-900" : "bg-slate-100"
            }`}
          >
            {/* Buy/Sell Tabs */}
            <Tabs
              t={t}
              activeTab={activeTab}
              isDark={theme === "dark"}
              onSelectBuy={() => {
                setActiveTab("buy");
                setAmount("");
              }}
              onSelectSell={() => {
                setActiveTab("sell");
                setAmount("");
                setSellInputType("fiat");
              }}
            />

            {/* Current Price Card */}
            <CurrentPriceCard
              t={t}
              isDark={theme === "dark"}
              loading={loading}
              btcPriceLocal={btcPriceLocal}
              btcPriceUSD={btcPriceUSD}
              currencyConfig={currencyConfig}
              numberFormat={numberFormat}
              lastUpdate={lastUpdate}
              onRefresh={fetchBTCPrice}
              formatTime={formatTime}
            />

            {/* Input Fields */}
            <TradeInputs
              t={t}
              activeTab={activeTab}
              sellInputType={sellInputType}
              currency={currency}
              currencyConfig={currencyConfig}
              amount={amount}
              fee={fee}
              onAmountChange={setAmount}
              onFeeChange={setFee}
              onSellInputTypeChange={(type) => {
                setSellInputType(type);
                setAmount("");
              }}
              isDark={theme === "dark"}
            />

            {/* Results */}
            {result && amount && fee && (
              <ResultCard
                t={t}
                result={result}
                fee={fee}
                activeTab={activeTab}
                sellInputType={sellInputType}
                currency={currency}
                currencyConfig={currencyConfig}
                numberFormat={numberFormat}
                unit={unit}
                onUnitChange={setUnit}
                copied={copied}
                onCopyBtcSats={handleCopy}
                onCopyFiat={handleCopyFiatAmount}
                isDark={theme === "dark"}
              />
            )}

            <CalculationPreview
              t={t}
              result={result}
              activeTab={activeTab}
              sellInputType={sellInputType}
              btcPriceLocal={btcPriceLocal}
              fee={fee}
              currencyConfig={currencyConfig}
              numberFormat={numberFormat}
              onCopyFormula={() =>
                showCopyToast(t.calculationCopied || "Calculation copied!")
              }
              isDark={theme === "dark"}
            />
          </main>
          {/* Footer */}
          <Footer t={t} version={version} isDark={theme === "dark"} />
        </div>

        {/* Calculated Fee Display */}
        {result && amount && fee && (
          <div
            className={`mt-2 px-4 py-2 rounded-lg border ${
              isDark
                ? "bg-orange-500/10 border-orange-500/40 text-orange-100"
                : "bg-orange-50 border-orange-200 text-orange-900"
            }`}
          >
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">{t.yourFee}:</span>
              <span className="text-sm font-bold">
                {formatNumber(result.feeAmount, 2, numberFormat)}{" "}
                {currencyConfig.symbol}
              </span>
            </div>
          </div>
        )}
      </div>

      {showSettings && (
        <SettingsModal
          t={t}
          isDark={theme === "dark"}
          currencies={currencies}
          languages={languages}
          numberFormats={numberFormats}
          currency={currency}
          language={language}
          numberFormatType={numberFormatType}
          onClose={() => setShowSettings(false)}
          onCurrencyChange={handleCurrencyChange}
          onLanguageChange={handleLanguageChange}
          onNumberFormatChange={handleNumberFormatChange}
        />
      )}

      {/* Share Menu Modal */}
      {showShareMenu && (
        <ShareMenu
          t={t}
          onClose={() => setShowShareMenu(false)}
          onShare={handleShare}
          onDownload={handleDownload}
          isDark={theme === "dark"}
        />
      )}

      {/* Copy toast */}
      <CopyToast
        open={copyToast.open}
        message={copyToast.message}
        isDark={theme === "dark"}
        onClose={() => setCopyToast((prev) => ({ ...prev, open: false }))}
      />
    </div>
  );
}
