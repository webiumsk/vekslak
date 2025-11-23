import { useState, useEffect } from "react";
import {
  RefreshCw,
  Bitcoin,
  DollarSign,
  Calculator,
  TrendingUp,
  Copy,
  Check,
  Settings,
  X,
  Camera,
  Github,
} from "lucide-react";

// Translations
const translations = {
  en: {
    title: "Vekslák",
    subtitle: "An app for ethical money changers",
    currentRate: "Current BTC Rate",
    amount: "Amount in",
    fee: "Fee in %",
    result: "Calculation Result",
    rateWithFee: "Rate with",
    valueIn: "",
    copied: "BTC amount copied!",
    satsCopied: "SATS amount copied!",
    calculation: "Calculation",
    dataFrom: "Data from Binance API",
    updated: "Updated",
    loading: "Loading rate...",
    settings: "Settings",
    currency: "Base Currency",
    language: "Language",
    exampleAmount: "For example 500",
    exampleFee: "For example 2",
    close: "Close",
    screenshot: "Screenshot",
    share: "Share",
    download: "Download",
    shareTitle: "Screenshot ready",
    buy: "BUY",
    sell: "SELL",
    clientPays: "Client pays",
    clientReceives: "Client receives",
    btcAmount: "BTC Amount",
    youReceive: "You receive",
    clientSells: "Client sells",
    clientWantsToReceive: "Client wants to receive",
    yourFee: "Fee",
    numberFormat: "Number Format",
  },
  sk: {
    title: "Vekslák",
    subtitle: "Appka pre etických vekslákov",
    currentRate: "Aktuálny kurz BTC",
    amount: "Suma v",
    fee: "Poplatok v %",
    result: "Výsledok výpočtu",
    rateWithFee: "Kurz s",
    valueIn: "",
    copied: "BTC suma skopírovaná!",
    satsCopied: "SATS suma skopírovaná!",
    calculation: "Výpočet",
    dataFrom: "Údaje z Binance API",
    updated: "Aktualizované",
    loading: "Načítavam kurz...",
    settings: "Nastavenia",
    currency: "Základná mena",
    language: "Jazyk",
    exampleAmount: "Napríklad 500",
    exampleFee: "Napríklad 2",
    close: "Zavrieť",
    screenshot: "Screenshot",
    share: "Zdieľať",
    download: "Stiahnuť",
    shareTitle: "Screenshot je pripravený",
    buy: "NÁKUP",
    sell: "PREDAJ",
    clientPays: "Klient platí",
    clientReceives: "Klient dostane",
    btcAmount: "Množstvo BTC",
    youReceive: "Dostaneš",
    clientSells: "Klient predáva",
    clientWantsToReceive: "Klient chce dostať",
    yourFee: "Poplatok",
    numberFormat: "Formát čísel",
  },
  cs: {
    title: "Vekslák",
    subtitle: "Appka pro etické směnárníky",
    currentRate: "Aktuální kurz BTC",
    amount: "Částka v",
    fee: "Poplatek v %",
    result: "Výsledek výpočtu",
    rateWithFee: "Kurz s",
    valueIn: "",
    copied: "BTC suma zkopírována!",
    satsCopied: "SATS suma zkopírována!",
    calculation: "Výpočet",
    dataFrom: "Data z Binance API",
    updated: "Aktualizováno",
    loading: "Načítám kurz...",
    settings: "Nastavení",
    currency: "Základní měna",
    language: "Jazyk",
    exampleAmount: "Například 500",
    exampleFee: "Například 2",
    close: "Zavřít",
    screenshot: "Screenshot",
    share: "Sdílet",
    download: "Stáhnout",
    shareTitle: "Screenshot je připraven",
    buy: "NÁKUP",
    sell: "PRODEJ",
    clientPays: "Klient platí",
    clientReceives: "Klient dostane",
    btcAmount: "Množství BTC",
    youReceive: "Dostaneš",
    clientSells: "Klient prodává",
    clientWantsToReceive: "Klient chce dostat",
    yourFee: "Poplatek",
    numberFormat: "Formát čísel",
  },
  pl: {
    title: "Vekslák",
    subtitle: "Aplikacja dla etycznych kantorów",
    currentRate: "Aktualny kurs BTC",
    amount: "Kwota w",
    fee: "Opłata w %",
    result: "Wynik obliczeń",
    rateWithFee: "Kurs z",
    valueIn: "",
    copied: "Wartość BTC skopiowana!",
    satsCopied: "Wartość SATS skopiowana!",
    calculation: "Obliczenie",
    dataFrom: "Dane z Binance API",
    updated: "Zaktualizowano",
    loading: "Ładowanie kursu...",
    settings: "Ustawienia",
    currency: "Waluta bazowa",
    language: "Język",
    exampleAmount: "Na przykład 500",
    exampleFee: "Na przykład 2",
    close: "Zamknij",
    screenshot: "Zrzut ekranu",
    share: "Udostępnij",
    download: "Pobierz",
    shareTitle: "Zrzut ekranu gotowy",
    buy: "KUPNO",
    sell: "SPRZEDAŻ",
    clientPays: "Klient płaci",
    clientReceives: "Klient otrzyma",
    btcAmount: "Ilość BTC",
    youReceive: "Otrzymasz",
    clientSells: "Klient sprzedaje",
    clientWantsToReceive: "Klient chce otrzymać",
    yourFee: "Opłata",
    numberFormat: "Format liczb",
  },
  hu: {
    title: "Vekslák",
    subtitle: "Egy alkalmazás etikus pénzváltóknak",
    currentRate: "Aktuális BTC árfolyam",
    amount: "Összeg",
    fee: "Díj %-ban",
    result: "Számítás eredménye",
    rateWithFee: "Árfolyam",
    valueIn: "",
    copied: "BTC érték másolva!",
    satsCopied: "SATS érték másolva!",
    calculation: "Számítás",
    dataFrom: "Adatok a Binance API-tól",
    updated: "Frissítve",
    loading: "Árfolyam betöltése...",
    settings: "Beállítások",
    currency: "Alapvaluta",
    language: "Nyelv",
    exampleAmount: "Például 500",
    exampleFee: "Például 2",
    close: "Bezárás",
    screenshot: "Képernyőkép",
    share: "Megosztás",
    download: "Letöltés",
    shareTitle: "Képernyőkép kész",
    buy: "VÉTEL",
    sell: "ELADÁS",
    clientPays: "Ügyfél fizet",
    clientReceives: "Ügyfél kap",
    btcAmount: "BTC mennyiség",
    youReceive: "Te kapsz",
    clientSells: "Ügyfél elad",
    clientWantsToReceive: "Ügyfél kapni szeretne",
    yourFee: "A díjad",
    numberFormat: "Számformátum",
  },
  de: {
    title: "Vekslák",
    subtitle: "Eine App für ethische Geldwechsler",
    currentRate: "Aktueller BTC-Kurs",
    amount: "Betrag in",
    fee: "Gebühr in %",
    result: "Berechnungsergebnis",
    rateWithFee: "Kurs mit",
    valueIn: "",
    copied: "BTC-Betrag kopiert!",
    satsCopied: "SATS-Betrag kopiert!",
    calculation: "Berechnung",
    dataFrom: "Daten von der Binance API",
    updated: "Aktualisiert",
    loading: "Lade Kurs...",
    settings: "Einstellungen",
    currency: "Basiswährung",
    language: "Sprache",
    exampleAmount: "Zum Beispiel 500",
    exampleFee: "Zum Beispiel 2",
    close: "Schließen",
    screenshot: "Screenshot",
    share: "Teilen",
    download: "Download",
    shareTitle: "Screenshot bereit",
    buy: "KAUF",
    sell: "VERKAUF",
    clientPays: "Kunde zahlt",
    clientReceives: "Kunde erhält",
    btcAmount: "BTC-Menge",
    youReceive: "Du erhältst",
    clientSells: "Kunde verkauft",
    clientWantsToReceive: "Kunde möchte erhalten",
    yourFee: "Gebühr",
    numberFormat: "Zahlenformat",
  },
  es: {
    title: "Vekslák",
    subtitle: "Una app para cambistas éticos",
    currentRate: "Tasa actual de BTC",
    amount: "Cantidad en",
    fee: "Comisión en %",
    result: "Resultado del cálculo",
    rateWithFee: "Tasa con",
    valueIn: "",
    copied: "¡Cantidad de BTC copiada!",
    satsCopied: "¡Cantidad de SATS copiada!",
    calculation: "Cálculo",
    dataFrom: "Datos de la API de Binance",
    updated: "Actualizado",
    loading: "Cargando tasa...",
    settings: "Ajustes",
    currency: "Moneda base",
    language: "Idioma",
    exampleAmount: "Por ejemplo 500",
    exampleFee: "Por ejemplo 2",
    close: "Cerrar",
    screenshot: "Captura",
    share: "Compartir",
    download: "Descargar",
    shareTitle: "Captura lista",
    buy: "COMPRA",
    sell: "VENTA",
    clientPays: "Cliente paga",
    clientReceives: "Cliente recibe",
    btcAmount: "Cantidad de BTC",
    youReceive: "Recibes",
    clientSells: "Cliente vende",
    clientWantsToReceive: "Cliente quiere recibir",
    yourFee: "Comisión",
    numberFormat: "Formato numérico",
  },
};

// Currency configurations
const currencies = {
  EUR: { symbol: "€", locale: "de-DE", code: "EUR" },
  CZK: { symbol: "Kč", locale: "cs-CZ", code: "CZK" },
  PLN: { symbol: "zł", locale: "pl-PL", code: "PLN" },
  HUF: { symbol: "Ft", locale: "hu-HU", code: "HUF" },
};

const languages = {
  en: { name: "English", flag: "🇬🇧" },
  cs: { name: "Čeština", flag: "🇨🇿" },
  de: { name: "Deutsch", flag: "🇩🇪" },
  es: { name: "Español", flag: "🇪🇸" },
  hu: { name: "Magyar", flag: "🇭🇺" },
  pl: { name: "Polski", flag: "🇵🇱" },
  sk: { name: "Slovenčina", flag: "🇸🇰" },
};

// Number format options - user can choose independently from language
const numberFormats = {
  international: {
    name: "International",
    example: "1,000.50",
    thousandsSep: ",",
    decimalSep: ".",
  },
  european: {
    name: "European",
    example: "1 000,50",
    thousandsSep: " ",
    decimalSep: ",",
  },
};

// ✨ SMART NUMBER FORMATTER
const formatNumber = (
  number,
  decimals = 0,
  format = { thousandsSep: " ", decimalSep: "," }
) => {
  if (number === null || number === undefined || isNaN(number)) return "0";

  const fixed = Number(number).toFixed(decimals);
  const [integer, decimal] = fixed.split(".");

  // Add thousands separator
  const integerFormatted = integer.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    format.thousandsSep
  );

  // Return with decimal separator if decimals exist
  return decimal
    ? `${integerFormatted}${format.decimalSep}${decimal}`
    : integerFormatted;
};

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
    () => localStorage.getItem("btc-currency") || "EUR"
  );
  const [language, setLanguage] = useState(
    () => localStorage.getItem("btc-language") || "sk"
  );
  const [numberFormatType, setNumberFormatType] = useState(
    () => localStorage.getItem("btc-number-format") || "european"
  );

  const t = translations[language];
  const currencyConfig = currencies[currency];
  const numberFormat = numberFormats[numberFormatType];

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
  }, [currency]);

  const calculate = () => {
    if (!btcPriceLocal || !amount || !fee) return null;

    const amountNum = parseFloat(amount);
    const feeNum = parseFloat(fee);

    if (activeTab === "buy") {
      // Client buys BTC - fee is added to price
      const priceWithFee = btcPriceLocal * (1 + feeNum / 100);
      const btcAmount = amountNum / priceWithFee;
      const usdValue = btcAmount * btcPriceUSD;
      const feeAmount = amountNum - btcAmount * btcPriceLocal;
      const satsAmount = btcAmount * 100000000;

      return {
        mode: "buy",
        priceWithFee,
        btcAmount,
        satsAmount,
        usdValue,
        eurAmount: amountNum,
        feeAmount,
      };
    } else {
      // SELL mode - Client sells BTC
      if (sellInputType === "btc") {
        // Input: BTC amount → Output: EUR received
        const priceWithFee = btcPriceLocal * (1 - feeNum / 100);
        const eurAmount = amountNum * priceWithFee;
        const usdValue = amountNum * btcPriceUSD;
        const feeAmount = amountNum * btcPriceLocal - eurAmount;
        const satsAmount = amountNum * 100000000;

        return {
          mode: "sell",
          priceWithFee,
          btcAmount: amountNum,
          satsAmount,
          usdValue,
          eurAmount,
          feeAmount,
        };
      } else {
        // sellInputType === "fiat"
        // Input: EUR amount (client wants to receive) → Output: BTC to sell
        const priceWithFee = btcPriceLocal * (1 - feeNum / 100);
        const btcAmount = amountNum / priceWithFee;
        const usdValue = btcAmount * btcPriceUSD;
        const feeAmount = btcAmount * btcPriceLocal - amountNum;
        const satsAmount = btcAmount * 100000000;

        return {
          mode: "sell",
          priceWithFee,
          btcAmount,
          satsAmount,
          usdValue,
          eurAmount: amountNum,
          feeAmount,
        };
      }
    }
  };

  const result = calculate();

  const formatTime = (date) => {
    if (!date) return "";
    return date.toLocaleDateString(currencyConfig.locale, {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const handleCopy = () => {
    if (result) {
      if (unit === "btc") {
        navigator.clipboard.writeText(result.btcAmount.toFixed(8));
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } else {
        navigator.clipboard.writeText(Math.round(result.satsAmount).toString());
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    }
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

    const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, "-");
    const file = new File([screenshotBlob], `vekslak-${timestamp}.png`, {
      type: "image/png",
    });

    if (
      navigator.share &&
      navigator.canShare &&
      navigator.canShare({ files: [file] })
    ) {
      try {
        await navigator.share({
          files: [file],
          title: "Vekslak",
          text: `${t.subtitle} - ${
            result ? result.btcAmount.toFixed(8) + " BTC" : ""
          }`,
        });
        setShowShareMenu(false);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Share error:", error);
          handleDownload();
        }
      }
    } else {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-orange-900 to-slate-900 flex justify-center">
      <div className="w-full max-w-lg">
        <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-2xl overflow-hidden relative">
          {/* Header with gradient */}
          <div className="bg-gradient-to-r from-orange-500 via-orange-600 to-amber-600 pt-4 pb-4 px-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full -ml-24 -mb-24"></div>

            {/* Settings and Screenshot buttons */}
            <div className="absolute top-4 right-6 flex gap-2">
              <button
                onClick={handleScreenshot}
                className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-all"
                title={t.screenshot}
              >
                <Camera className="w-5 h-5" />
              </button>
              <button
                onClick={() => setShowSettings(true)}
                className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-all"
                title={t.settings}
              >
                <Settings className="w-5 h-5" />
              </button>
            </div>

            <div>
              <a className="text-white hover:text-slate-200" href="/">
                <div className="flex items-center gap-3 mb-1">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-black/20 shadow-inner">
                    <Bitcoin className="w-6 h-6 animate-pulse" />
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
                    {t.title}
                  </h1>
                </div>
              </a>
              <p className="text-xs sm:text-sm text-orange-50/90">
                {t.subtitle}
              </p>
            </div>
          </div>

          <div className="p-6 py-3 space-y-3 screenshot-container bg-slate-100 backdrop-blur-sm">
            {/* Buy/Sell Tabs */}
            <div className="flex gap-2 bg-slate-100 rounded-lg">
              <button
                onClick={() => {
                  setActiveTab("buy");
                  setAmount("");
                }}
                className={`flex-1 py-3 rounded-lg font-bold transition-all ${
                  activeTab === "buy"
                    ? "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg"
                    : "text-slate-500 hover:text-slate-400"
                }`}
              >
                {t.buy}
              </button>
              <button
                onClick={() => {
                  setActiveTab("sell");
                  setAmount("");
                  setSellInputType("fiat");
                }}
                className={`flex-1 py-3 rounded-lg font-bold transition-all ${
                  activeTab === "sell"
                    ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg"
                    : "text-slate-500 hover:text-slate-400"
                }`}
              >
                {t.sell}
              </button>
            </div>

            {/* Current Price Card */}
            <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg p-5 border-2 border-slate-200 shadow-md">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 text-slate-700">
                  <TrendingUp className="w-5 h-5 text-orange-600" />
                  <span className="font-semibold">{t.currentRate}</span>
                </div>
                <button
                  onClick={fetchBTCPrice}
                  disabled={loading}
                  className="p-2 hover:bg-white/80 rounded-lg transition-all disabled:opacity-50 active:scale-95"
                  title="Refresh"
                >
                  <RefreshCw
                    className={`w-5 h-5 text-green-600 ${
                      loading ? "animate-spin" : ""
                    }`}
                  />
                </button>
              </div>

              {loading ? (
                <div className="text-center py-4">
                  <div className="animate-pulse text-slate-600">
                    {t.loading}
                  </div>
                </div>
              ) : (
                <>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-3xl text-slate-600">
                        {currencyConfig.symbol}
                      </span>
                      <span className="text-4xl font-bold pl-1 text-slate-900">
                        {formatNumber(btcPriceLocal, 0, numberFormat)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-5 h-5 text-slate-500" />
                      <span className="text-xl font-semibold text-slate-700">
                        {formatNumber(btcPriceUSD, 0, numberFormat)}
                      </span>
                      <span className="text-lg text-slate-500">USD</span>
                    </div>
                  </div>
                  {lastUpdate && (
                    <div className="text-xs text-slate-500 mt-3 flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      {t.updated}: {formatTime(lastUpdate)}
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Input Fields */}
            <div className="space-y-4">
              <div className="group">
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-semibold text-slate-700 flex items-center gap-2">
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
                            {t.clientWantsToReceive} ({currency})
                          </>
                        )}
                      </>
                    )}
                  </label>
                  {/* BTC/FIAT Toggle for SELL mode */}
                  {activeTab === "sell" && (
                    <div className="flex gap-1 bg-slate-100 rounded-lg p-1">
                      <button
                        onClick={() => {
                          setSellInputType("fiat");
                          setAmount("");
                        }}
                        className={`px-3 py-1 text-xs font-semibold rounded transition-all ${
                          sellInputType === "fiat"
                            ? "bg-orange-600 text-white"
                            : "text-slate-600 hover:text-slate-900"
                        }`}
                      >
                        {currency}
                      </button>
                      <button
                        onClick={() => {
                          setSellInputType("btc");
                          setAmount("");
                        }}
                        className={`px-3 py-1 text-xs font-semibold rounded transition-all ${
                          sellInputType === "btc"
                            ? "bg-orange-600 text-white"
                            : "text-slate-600 hover:text-slate-900"
                        }`}                      >
                        BTC
                      </button>
                    </div>
                  )}
                </div>
                <div className="relative">
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
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
                    className="text-xl w-full px-4 py-3 pl-12 border-2 border-slate-200 rounded-lg focus:border-orange-500 focus:ring-4 focus:ring-orange-100 focus:outline-none text-lg transition-all group-hover:border-slate-300"
                  />
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-semibold text-lg">
                    {activeTab === "buy"
                      ? currencyConfig.symbol
                      : sellInputType === "btc"
                      ? "₿"
                      : currencyConfig.symbol}
                  </span>
                </div>
              </div>

              <div className="group">
                <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                  <Calculator className="w-4 h-4 text-orange-600" />
                  {t.fee}
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={fee}
                    onChange={(e) => setFee(e.target.value)}
                    placeholder={t.exampleFee}
                    step="0.1"
                    className="text-xl w-full px-4 py-3 pl-12 border-2 border-slate-200 rounded-lg focus:border-orange-500 focus:ring-4 focus:ring-orange-100 focus:outline-none text-lg transition-all group-hover:border-slate-300"
                  />
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-semibold">
                    %
                  </span>
                </div>
              </div>
            </div>

            {/* Results */}
            {result && amount && fee && (
              <div className="space-y-4 pt-4">
                <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-lg p-5 border border-orange-200 shadow-sm">
                  <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-4">
                    <Bitcoin className="w-5 h-5 text-orange-600" />
                    {t.result}
                  </h3>

                  <div className="space-y-3">
                    {/* Price with fee */}
                    <div className="bg-white rounded-xl p-3 flex justify-between items-center">
                      <span className="text-sm text-slate-600">
                        {t.rateWithFee} {activeTab === "buy" ? "+" : "-"}
                        {fee}%:
                      </span>
                      <span className="font-bold text-slate-900">
                        {formatNumber(result.priceWithFee, 2, numberFormat)}{" "}
                        {currencyConfig.symbol}
                      </span>
                    </div>

                    {activeTab === "buy" ? (
                      <>
                        {/* BUY: Send BTC to client */}
                        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl p-5 shadow-lg">
                          <div className="flex items-center justify-between mb-2">
                            <div className="text-xs uppercase tracking-wider opacity-90">
                              {t.clientReceives}
                            </div>
                            {/* BTC/SATS Toggle */}
                            <div className="flex gap-1 bg-white/20 rounded-lg p-1">
                              <button
                                onClick={() => setUnit("btc")}
                                className={`px-2 py-1 text-xs font-semibold rounded transition-all ${
                                  unit === "btc"
                                    ? "bg-white text-green-600"
                                    : "text-white/70 hover:text-white"
                                }`}
                              >
                                BTC
                              </button>
                              <button
                                onClick={() => setUnit("sats")}
                                className={`px-2 py-1 text-xs font-semibold rounded transition-all ${
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
                                    ? formatNumber(
                                        result.btcAmount,
                                        8,
                                        numberFormat
                                      )
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
                              onClick={handleCopy}
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
                      </>
                    ) : (
                      <>
                        {/* SELL: Output depends on input type */}
                        {sellInputType === "btc" ? (
                          // Input: BTC → Output: EUR received
                          <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl p-5 shadow-lg">
                            <div className="text-xs uppercase tracking-wider opacity-90 mb-2">
                              {t.clientReceives}
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div>
                                  <div className="text-2xl font-bold">
                                    {formatNumber(
                                      result.eurAmount,
                                      2,
                                      numberFormat
                                    )}
                                  </div>
                                  <div className="text-sm opacity-90">
                                    {currency}
                                  </div>
                                </div>
                              </div>
                              <button
                                onClick={() => {
                                  navigator.clipboard.writeText(
                                    result.eurAmount.toFixed(2)
                                  );
                                  setCopied(true);
                                  setTimeout(() => setCopied(false), 2000);
                                }}
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
                          // Input: EUR desired → Output: BTC to sell
                          <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl p-5 shadow-lg">
                            <div className="flex items-center justify-between mb-2">
                              <div className="text-xs uppercase tracking-wider opacity-90">
                                {t.clientSells}
                              </div>
                              {/* BTC/SATS Toggle */}
                              <div className="flex gap-1 bg-white/20 rounded-lg p-1">
                                <button
                                  onClick={() => setUnit("btc")}
                                  className={`px-2 py-1 text-xs font-semibold rounded transition-all ${
                                    unit === "btc"
                                      ? "bg-white text-orange-600"
                                      : "text-white/70 hover:text-white"
                                  }`}
                                >
                                  BTC
                                </button>
                                <button
                                  onClick={() => setUnit("sats")}
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
                                      ? formatNumber(
                                          result.btcAmount,
                                          8,
                                          numberFormat
                                        )
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
                                onClick={handleCopy}
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
                    <div className="bg-white rounded-xl p-4 flex justify-between items-center border border-slate-200">
                      <span className="text-slate-600 flex items-center gap-2">
                        <DollarSign className="w-5 h-5 text-green-600" />
                        <span className="font-medium">{t.valueIn} USD:</span>
                      </span>
                      <span className="font-bold text-slate-900">
                        $ {formatNumber(result.usdValue, 2, numberFormat)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Copy button feedback */}
                {copied && (
                  <div className="text-center text-sm text-green-600 font-semibold">
                    ✓ {unit === "btc" ? t.copied : t.satsCopied}
                  </div>
                )}
              </div>
            )}

            {/* Info Footer */}
            <div className="flex-col text-xs text-slate-500 text-center pt-4 border-t border-slate-200 space-y-1">
              <div className="font-mono bg-slate-50 rounded-lg p-2">
                {activeTab === "buy"
                  ? `${t.calculation}: ${currency} ÷ (BTC × (1 + ${fee}%))`
                  : sellInputType === "btc"
                  ? `${t.calculation}: BTC × (BTC × (1 - ${fee}%))`
                  : `${t.calculation}: ${currency} ÷ (BTC × (1 - ${fee}%))`}
              </div>
              <div className="flex justify-center items-center gap-2 text-slate-500">
                <span>{t.dataFrom}</span>
                <span className="text-slate-700">•</span>
                <a
                  href="https://github.com/webiumsk/vekslak"
                  className="inline-flex items-center gap-1 text-slate-600 hover:text-slate-900 transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span className="text-[11px] uppercase tracking-[0.16em]">
                    GitHub
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* Calculated Fee Display */}
        {result && amount && fee && (
          <div className="mt-2 px-4 py-2 bg-orange-50 border border-orange-200 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-sm text-orange-700 font-medium">
                {t.yourFee}:
              </span>
              <span className="text-sm font-bold text-orange-900">
                {formatNumber(result.feeAmount, 2, numberFormat)}{" "}
                {currencyConfig.symbol}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Settings Modal */}
      {showSettings && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={() => setShowSettings(false)}
        >
          <div
            className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-800">
                {t.settings}
              </h2>
              <button
                onClick={() => setShowSettings(false)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Currency Selection */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  {t.currency}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(currencies).map(([code, config]) => (
                    <button
                      key={code}
                      onClick={() => handleCurrencyChange(code)}
                      className={`p-4 rounded-xl font-semibold transition-all ${
                        currency === code
                          ? "bg-orange-600 text-white shadow-lg scale-105"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      <div className="text-2xl mb-1">{config.symbol}</div>
                      <div className="text-sm">{code}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Language Selection */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  {t.language}
                </label>
                <div className="space-y-2">
                  {Object.entries(languages).map(([code, lang]) => (
                    <button
                      key={code}
                      onClick={() => handleLanguageChange(code)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all w-full ${
                        language === code
                          ? "bg-orange-600 text-white shadow-lg"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      <span className="text-2xl">{lang.flag}</span>
                      <span>{lang.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Number Format Selection */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  {t.numberFormat}
                </label>
                <div className="space-y-2">
                  {Object.entries(numberFormats).map(([code, format]) => (
                    <button
                      key={code}
                      onClick={() => handleNumberFormatChange(code)}
                      className={`flex items-center justify-between px-4 py-3 rounded-xl font-medium transition-all w-full ${
                        numberFormatType === code
                          ? "bg-orange-600 text-white shadow-lg"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      <span>{format.name}</span>
                      <span
                        className={`font-mono text-sm ${
                          numberFormatType === code
                            ? "text-white"
                            : "text-slate-500"
                        }`}
                      >
                        {format.example}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Close button */}
              <button
                onClick={() => setShowSettings(false)}
                className="w-full py-3 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold rounded-xl transition-colors"
              >
                {t.close}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Share Menu Modal */}
      {showShareMenu && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={() => setShowShareMenu(false)}
        >
          <div
            className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-800">
                {t.shareTitle}
              </h2>
              <button
                onClick={() => setShowShareMenu(false)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-3">
              {/* Share button */}
              <button
                onClick={handleShare}
                className="w-full flex items-center justify-center gap-3 py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-xl transition-all shadow-lg active:scale-95"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                  />
                </svg>
                {t.share}
              </button>

              {/* Download button */}
              <button
                onClick={handleDownload}
                className="w-full flex items-center justify-center gap-3 py-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition-all active:scale-95"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                {t.download}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
