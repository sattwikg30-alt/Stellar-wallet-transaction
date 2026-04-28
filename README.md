# 🚀 StellarPay: Fast, Simple XLM Payments

## 🌟 Project Overview
**StellarPay** is a modern, production-ready decentralized application built on the **Stellar Network** that allows seamless, rapid native XLM transfers. Utilizing best-in-class Next.js server tools and the Freighter wallet extension, StellarPay acts as your premier interface to interact with the Stellar Testnet. 

### Core Concepts on Stellar
| StellarPay Action | Stellar Mechanism | Benefit |
| :--- | :--- | :--- |
| **Authenticate** | Freighter Wallet Extension | Instant, secure, and native key management without seed phrase exposure. |
| **View Balances** | Horizon Testnet Queries | Real-time native XLM balance synchronization. |
| **Send Payments** | Submit Transaction (XLM) | Lightning-fast asset transfers scaling across borders. |
| **Transaction History** | Payment Operations Query | Immutable, filtered ledger showing all outbound/inbound transactions. |

---

## ✨ Features
The StellarPay dashboard provides a comprehensive suite of tools for web3 users:

### 1. 📊 Dashboard (Account Management)
* **Wallet Integration:** Seamlessly connect and disconnect your Stellar wallet via the Freighter browser extension natively. Includes a dynamic **🟢 Testnet** badge.
* **XLM Balance Fetcher:** Automatically interacts with Horizon Testnet to load and verify the associated account's native balances in real time.

### 2. 💸 Payment Gateway (Transaction Flow)
* **Address Book Management:** Locally persistent (`localStorage`) contact book allowing seamless quick-fills within the transaction forms to frequently trusted counterparties.
* **Transaction Submission:** Execute native XLM transfers cleanly between Testnet accounts with automatic sequence building, signing, and submission entirely through the web client.
* **Smart Transaction Insights:** Inbound Horizon responses are visually segmented to showcase Blockchain Metadata—including precise testnet **Fee Charged**, confirmation **Ledgers**, precise **Timestamps**, and stylized hash tracking.
* **Global Toast Notifications:** Intercepts, handles, and surfaces exact error origins flawlessly to the UI layer (ranging from *Insufficient Balances*, invalid addresses, or *Freighter User Rejections*).

### 3. 📜 Ledger (Transaction History)
* **Interactive History:** Pulls your last 10 native historical transfers directly from the blockchain into a clean UX list.
* **Advanced Filters:** Now upgraded with **All/Sent/Received Segment Filters** and embedded click-to-copy counter-party functionalities.

---

## 💻 Tech Stack
| Layer | Technology |
| :--- | :--- |
| **Frontend Framework** | Next.js 16 (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS v4 (Modern, dark-themed, and responsive design) |
| **Blockchain** | Stellar Testnet |
| **Blockchain SDK** | `@stellar/stellar-sdk` & `@stellar/freighter-api` |

---

## 📂 Project Structure

```text
stellar/
├── public/              # Static assets (images, icons, etc.)
│   ├── logo.png
│   └── ... (svg icons)
├── src/
│   ├── app/             # Next.js App Router
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/      # UI components
│   │   ├── BalanceCard.tsx
│   │   ├── SendForm.tsx
│   │   ├── ToastProvider.tsx
│   │   ├── TransactionHistory.tsx
│   │   ├── TransactionStatus.tsx
│   │   └── WalletButton.tsx
│   ├── hooks/           # Custom React hooks
│   │   ├── useAddressBook.ts
│   │   ├── useBalance.ts
│   │   ├── useHistory.ts
│   │   └── useWallet.ts
│   ├── services/        # Stellar SDK logic
│   │   ├── history.ts
│   │   ├── stellar.ts
│   │   ├── transaction.ts
│   │   └── wallet.ts
│   └── types/           # TypeScript definitions
│       ├── history.ts
│       └── transaction.ts
├── package.json         # Project dependencies
└── tsconfig.json        # TypeScript configuration
```

---

## 🚀 Deployment

The project is already live and deployed on **Vercel**. You can access the production version here:

🔗 **Live Demo:** [StellarPay on Vercel](https://stellarpay-now.vercel.app//) 

### Continuous Integration
- **Automatic Deploys:** Every push to the `main` branch triggers a new deployment automatically via Vercel's GitHub integration.
- **Preview Deployments:** Pull Requests generate unique preview URLs to test changes before merging.

### Manual Build
If you wish to create a production build locally:
```bash
npm run build
npm run start
```

---

## 💡 Why Stellar for Payments?
Stellar is the ideal backbone for StellarPay due to:
* **Instant Settlement (3-5 seconds):** Payment transfers are finalized almost immediately.
* **Ultra-Low Fees:** Transaction fees are nominal (0.00001 XLM), making even micro-transactions completely viable.
* **Open Financial Network:** Built directly by the Stellar developers linking global markets directly to each other efficiently.

---

## 🔐 Security & Best Practices

- **Freighter Wallet:** This app uses the Freighter extension, which ensures your private keys never leave your browser.
- **Testnet Only:** Always ensure your wallet is set to **Testnet** before interacting with the application.
- **No Secret Keys:** Never hardcode secret keys or mnemonic phrases in the frontend.

---

## 🛠️ Getting Started (Testnet)

### Prerequisites
1. **Stellar Wallet:** Install the [Freighter](https://www.stellar.org/wallet-list) browser extension.
2. **Funded Account:** Use the [Stellar Friendbot](https://laboratory.stellar.org/#friendbot) to fund your Testnet account with XLM.

### Installation Steps

1. **Clone the Repository:**
```bash
git clone https://github.com/sattwikg30-alt/Stellar-wallet-transaction.git
cd stellar
```

2. **Install Dependencies:**
```bash
npm install
```

3. **Run the Project:**
```bash
npm run dev
```

4. **Access the Application:** Open `http://localhost:3000` in your browser.

---

## 📸 Application Screenshots

![Wallet Connected](https://res.cloudinary.com/dzjn1u0ln/image/upload/v1777385528/Screenshot_2026-04-28_184311_ftmml1.png)
Wallet Connected

![Balance Displayed](https://res.cloudinary.com/dzjn1u0ln/image/upload/v1777385690/Screenshot_2026-04-28_194435_cwywwd.png)
Balance Displayed

![Transaction Success](https://res.cloudinary.com/dzjn1u0ln/image/upload/v1777385813/Screenshot_2026-04-28_194632_a7kehg.png)
Transaction Success

![Transaction History](https://res.cloudinary.com/dzjn1u0ln/image/upload/v1777385895/Screenshot_2026-04-28_194756_bpvel4.png)
Transaction History

![Transaction shown on Stellar expert explorer](https://res.cloudinary.com/dzjn1u0ln/image/upload/v1777389461/Screenshot_2026-04-28_204600_yufdqf.png)
Transaction shown on Stellar expert explorer

🎬 **Drive screen recording ->** [https://drive.google.com/file/d/1Erfv90So6tra-slONsxcD7C15tw4wgeQ/view?usp=drive_link](https://drive.google.com/file/d/1Erfv90So6tra-slONsxcD7C15tw4wgeQ/view?usp=drive_link)


## 📚 Learning Resources

| Category | Resource | Link |
| :--- | :--- | :--- |
| **Stellar Blockchain** | Stellar Docs | [developers.stellar.org](https://developers.stellar.org/docs) |
| | Stellar Laboratory | [laboratory.stellar.org](https://laboratory.stellar.org/) |
| | Stellar Expert (Explorer) | [stellar.expert](https://stellar.expert/explorer/testnet) |
| | Stellar Wallets Kit | [github.com/stellar/wallets-kit](https://github.com/stellar/stellar-wallets-kit) |
| | GitHub Repository | [github.com/stellar/js-stellar-sdk](https://github.com/stellar/js-stellar-sdk) |
| | Documentation | [stellar.github.io/js-stellar-sdk](https://stellar.github.io/js-stellar-sdk/) |
| **Frontend Technologies** | Next.js Documentation | [nextjs.org/docs](https://nextjs.org/docs) |
| | Tailwind CSS | [tailwindcss.com/docs](https://tailwindcss.com/docs) |
| | React Icons | [react-icons.github.io](https://react-icons.github.io/react-icons/) |

---