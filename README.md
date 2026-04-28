# Stellar dApp - White Belt Level 1

A modern, production-ready decentralized application built on the Stellar Network using Next.js, featuring a clean UI and Freighter wallet integration.

## 🌟 Features

This dApp meets the Stellar White Belt Level 1 requirements and implements the following features flawlessly:

- **Wallet Connection Flow**: Seamless integration with the Freighter Wallet browser extension (`@stellar/freighter-api`), equipped with fallback and allowance handling so transactions sign instantly without looping auth prompts.
- **XLM Balance Fetcher**: Automatically interacts with Horizon Testnet to load and verify the associated account's native balances (`@stellar/stellar-sdk`).
- **Transaction Submission**: Execute native XLM transfers cleanly between Testnet accounts with automatic sequence building, signing, and submission entirely through the web client.
- **Transaction History**: Pulls your last 10 native historical transfers (sent/received) directly from the blockchain into a clean UX list.
- **Premium UX Design**: Fluid component animations, error boundaries, proper loading skeletons, blurred backdrops, and interactive UI feedback loops.

## 🚀 Tech Stack

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Web3 Integrations**: 
  - `@stellar/stellar-sdk` (Core Horizon node queries & transaction builders)
  - `@stellar/freighter-api` (In-browser key management & secure transaction signing)

## 🛠 Setup Instructions

### Prerequisites
- Node.js LTS (v18 or above)
- **Freighter Wallet Extension** installed in your browser.
- A Freighter Wallet account funded with Testnet XLM (You can do this directly from within Freighter via their network settings if running on Testnet, or visit the [Stellar Laboratory Friendbot](https://laboratory.stellar.org/#account-creator?network=test)).

### Installation
1. Clone this repository to your local machine.
2. Install the necessary packages.
```bash
npm install
```
3. Start the development server.
```bash
npm run dev
```
4. Navigate your browser to `http://localhost:3000`.

## 📸 Screenshots

*(Replace the placeholders below with the actual screenshots of your dApp running)*

### 1. Wallet Connected
![Wallet Connected Placeholder](./public/screenshots/wallet_connected.png)
*(Image showing the Connect Freighter button transitioning into the shortened public wallet key)*

### 2. Balance Displayed
![Balance Displayed Placeholder](./public/screenshots/balance_displayed.png)
*(Image showing the testnet XLM balance rendered accurately in the Balance Card)*

### 3. Transaction Success
![Transaction Success Placeholder](./public/screenshots/transaction_success.png)
*(Image showing the green transaction successful status alert spanning with a quick hash-copy button)*

### 4. Transaction History
![Transaction History Placeholder](./public/screenshots/transaction_history.png)
*(Image showing the transaction history section displaying Sent and Received payments)*

### Example Transaction Hash
Here is an example structure of a testnet transaction hash successfully submitted by this dApp:
`70f1a4e15a1a1f11e3b26c63a558bd0d4b901d819e99a803923dcc2fcfdb6c4e`
