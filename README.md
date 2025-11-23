# 🪙 Vekslák

> Bitcoin exchange calculator for ethical exchangers

Fast, simple, and accurate BTC/fiat calculator with real-time rates and multi-currency support.

🌐 **Live Site**: [https://vekslak.dvadsatjeden.org](https://vekslak.dvadsatjeden.org)

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/react-18.3-61dafb.svg)
![Vite](https://img.shields.io/badge/vite-5.4-646cff.svg)

---

## ✨ Features

- **💱 Real-time rates** - Live BTC prices from Binance API
- **🌍 Multi-currency** - EUR, CZK, PLN, HUF support
- **🔄 Buy/Sell modes** - Calculate both directions with custom fees
- **⚡ BTC/SATS toggle** - Switch between Bitcoin and Satoshi units
- **🔢 Custom number format** - International (1,000.50) or European (1 000,50)
- **🌐 Multi-language** - English, Slovak, Czech, Polish, Hungarian
- **📸 Screenshot sharing** - Export calculations as images
- **💾 LocalStorage** - Remembers your preferences

---

## 🚀 Quick Start

Visit [https://vekslak.dvadsatjeden.org](https://vekslak.dvadsatjeden.org)

### Prerequisites

```bash
Node.js 18+ 
npm or yarn
```

### Installation

```bash
# Clone repository
git clone https://github.com/yourusername/vekslak.git
cd vekslak

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

---

## 📱 Usage

### Basic Calculation

1. **Select mode**: BUY or SELL
2. **Enter amount**: EUR/CZK/PLN/HUF or BTC
3. **Set fee**: Your commission percentage
4. **View result**: Instant calculation with BTC amount

### Settings

- **Currency**: Choose base currency (EUR, CZK, PLN, HUF)
- **Language**: Select UI language
- **Number Format**: International or European number formatting

### Copy & Share

- Click **copy icon** to copy BTC amount to clipboard
- Click **screenshot** to capture and share calculation

---

## 🛠️ Tech Stack

- **React** 18.3 - UI framework
- **Vite** 5.4 - Build tool
- **Tailwind CSS** 3.4 - Styling
- **Lucide React** - Icons
- **html2canvas** - Screenshot functionality

### APIs

- **Binance API** - Real-time BTC/USD prices
- **ExchangeRate API** - Currency conversion rates

---

## 🎨 Features in Detail

### Real-time Exchange Rates

```javascript
// Fetches live BTC price in multiple currencies
- BTC/USD from Binance
- Auto-converts to EUR, CZK, PLN, HUF
- Updates on demand
```

### Smart Number Formatting

```
International: 95,842 € (comma thousands, dot decimal)
European:      95 842 € (space thousands, comma decimal)
```

### BUY Mode
```
Client pays:    500 EUR
Fee:           2%
─────────────────────
Rate with fee: 97,758.84 €
Send to client: 0.00671611 BTC
Your fee:      9.80 €
```

### SELL Mode
```
Client sells:   0.01 BTC
Fee:           2%
─────────────────────
Rate with fee: 93,825.16 €
Client receives: 938.25 €
Your fee:      19.13 €
```

---

## 🌐 Supported Languages

- 🇬🇧 English
- 🇸🇰 Slovenčina
- 🇨🇿 Čeština
- 🇵🇱 Polski
- 🇭🇺 Magyar
- 🇩🇪 Deutsch
- 🇪🇸 Español 

---

## 💾 LocalStorage Keys

```javascript
btc-currency        // "EUR" | "CZK" | "PLN" | "HUF"
btc-language        // "en" | "sk" | "cs" | "pl" | "hu" | "de" | "es"
btc-number-format   // "international" | "european"
```

---

## 🔒 Privacy

- **No data collection** - Everything runs client-side
- **No tracking** - No analytics or cookies
- **No backend** - Pure frontend application
- **LocalStorage only** - Settings saved locally

---

## 📦 Build & Deploy

### Build

```bash
npm run build
# Output: dist/
```

### Deploy

**Vercel:**
```bash
vercel
```

**Netlify:**
```bash
netlify deploy --prod
```

**GitHub Pages:**
```bash
npm run build
# Upload dist/ folder
```

---

## 🤝 Contributing

Contributions welcome! Please:

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing`)
5. Open Pull Request

---

## 📝 License

MIT License

---

## 👤 Author

**SiriusBig**
- GitHub: [@webiumsk](https://github.com/webiumsk)
- Website: [webium.sk](https://www.webium.sk)

---

## 🙏 Acknowledgments

- [Binance API](https://binance-docs.github.io/apidocs/) for real-time BTC prices
- [ExchangeRate API](https://exchangerate-api.com/) for currency conversion
- [Dvadsatjeden](https://www.dvadsatjeden.org/) Bitcoin community for inspiration
- All ethical exchangers using this tool

---

## ⭐ Support

If you find this project useful, please consider:

- ⭐ Starring the repository
- 🐛 Reporting bugs
- 💡 Suggesting new features
- 🔀 Contributing code
- ⚡ Donating to [sirius@dvadsatjeden.org](lightning:sirius@dvadsatjeden.org)

---

## 📄 Changelog

### v1.0.4 (Current)
- **SELL FIAT/BTC Toggle**: Users can now input either BTC amount or desired fiat amount in SELL mode
- Two SELL calculation modes:
- Dynamic `<html lang="">` attribute based on selected language
- Social media meta tags (Open Graph, Twitter Card)
- Auto-clear amount field when switching between modes

### v1.0.3 
- 🌐 Added DE and ES languages
- ✨ updated readme

### v1.0.2
- ✨ Added custom number format selection
- ✨ Added BTC/SATS toggle
- ✨ Added screenshot functionality
- 🌐 Added 5 language support
- 💰 Added 4 currency support
- 🎨 Improved UI/UX
- 💾 Added LocalStorage persistence

### v1.0.1
- Added multi-currency support
- Added language selection
- Improved mobile responsiveness

### v1.0.0
- Initial release
- Basic BTC calculator
- EUR support only

---

**Made with ❤️ for ethical exchangers and ₿**

[Report Bug](https://github.com/webiumsk/vekslak/issues) · [Request Feature](https://github.com/webiumsk/vekslak/issues)