"use client";

import { useState } from "react";
import { useWallet } from "@/hooks/useWallet";
import { useBalance } from "@/hooks/useBalance";
import { WalletButton } from "@/components/WalletButton";
import { BalanceCard } from "@/components/BalanceCard";
import { SendForm } from "@/components/SendForm";
import { TransactionStatus } from "@/components/TransactionStatus";
import { TransactionResult } from "@/types/transaction";

export default function Home() {
  const { publicKey, isConnecting, connect, disconnect, error: walletError } = useWallet();
  const { balance, isLoading, error: balanceError, refreshBalance } = useBalance(publicKey);
  
  const [txResult, setTxResult] = useState<TransactionResult | null>(null);

  const handleTransactionSuccess = () => {
    // Refresh balance after a successful transaction
    refreshBalance();
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-black font-sans selection:bg-purple-500/30">
      {/* Dynamic top gradient bar */}
      <div className="h-1.5 w-full bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500"></div>
      
      <div className="flex-1 flex flex-col p-6 sm:p-10 max-w-6xl w-full mx-auto relative z-10">
        
        {/* Decorative background blurs for premium feel */}
        <div className="fixed top-20 left-20 w-[500px] h-[500px] bg-blue-500/20 dark:bg-blue-600/10 rounded-full blur-[120px] pointer-events-none -z-10 mix-blend-multiply dark:mix-blend-screen"></div>
        <div className="fixed bottom-20 right-20 w-[600px] h-[600px] bg-purple-500/20 dark:bg-purple-600/10 rounded-full blur-[150px] pointer-events-none -z-10 mix-blend-multiply dark:mix-blend-screen"></div>

        <header className="flex justify-between items-center w-full mb-16">
          <div className="text-xl sm:text-2xl font-bold tracking-tight text-slate-800 dark:text-white flex items-center gap-3">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-lg shadow-purple-500/20">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <span>Stellar<span className="text-purple-600 font-black">App</span></span>
          </div>
          
          <WalletButton
            publicKey={publicKey}
            isConnecting={isConnecting}
            onConnect={connect}
            onDisconnect={disconnect}
          />
        </header>

        <main className="flex-1 flex flex-col w-full pb-20 fade-in-up">
          <div className="flex flex-col items-center max-w-3xl mx-auto text-center space-y-6 mb-12">
            <h1 className="text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-7xl leading-tight">
              Explore the <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Stellar Network</span>
            </h1>
            
            <p className="text-lg sm:text-lg leading-relaxed text-slate-600 dark:text-slate-400 max-w-xl">
              Connect your Freighter wallet to check your balance and seamlessly send testnet XLM to any address.
            </p>

            {walletError && (
               <div className="p-4 w-full max-w-md bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-500/20 rounded-2xl text-sm shadow-sm flex items-start text-left gap-3 animate-bounce-in">
                  <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{walletError}</span>
               </div>
            )}
          </div>

          <div className="w-full flex flex-col md:flex-row gap-8 justify-center items-start transition-all duration-500 min-h-[300px]">
            {publicKey ? (
              <>
                <div className="w-full md:w-1/2 flex justify-center animate-fade-in flex-col items-center">
                   <BalanceCard
                     balance={balance}
                     isLoading={isLoading}
                     error={balanceError}
                     onRefresh={refreshBalance}
                   />
                   
                   <div className="w-full max-w-sm">
                      <TransactionStatus 
                        result={txResult} 
                        onClear={() => setTxResult(null)} 
                      />
                   </div>
                </div>

                <div className="w-full md:w-1/2 flex justify-center animate-fade-in delay-100">
                  <SendForm 
                    sourcePublicKey={publicKey}
                    onResult={setTxResult}
                    onSuccess={handleTransactionSuccess}
                  />
                </div>
              </>
            ) : (
              <div className="w-full flex justify-center mt-4">
                <button
                  onClick={connect}
                  disabled={isConnecting}
                  className="group relative overflow-hidden rounded-3xl p-1 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-transform duration-300"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl group-hover:rotate-180 transition-transform duration-1000"></div>
                  <div className="relative bg-white dark:bg-zinc-950 px-10 py-16 rounded-[22px] w-full max-w-md flex flex-col items-center gap-6 border border-zinc-100 dark:border-zinc-800">
                    <div className="w-20 h-20 bg-blue-50 dark:bg-zinc-900 rounded-2xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-500 group-hover:shadow-lg">
                      <svg className="w-10 h-10 text-blue-600 dark:text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                      </svg>
                    </div>
                    <div className="space-y-2 text-center">
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white">Connect Freighter</h3>
                      <p className="text-slate-500 dark:text-slate-400">Click to connect your wallet and view your balance</p>
                    </div>
                  </div>
                </button>
              </div>
            )}
          </div>
        </main>
      </div>

      <footer className="w-full py-8 text-center text-sm font-medium text-slate-400 dark:text-zinc-600 z-10">
         Built with standard Next.js, Tailwind CSS, & Stellar SDK
      </footer>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-in-up { animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in { animation: fadeIn 0.5s ease-out forwards; }
        
        @keyframes bounceIn {
          0% { opacity: 0; transform: scale(0.95); }
          50% { opacity: 1; transform: scale(1.02); }
          100% { opacity: 1; transform: scale(1); }
        }
        .animate-bounce-in { animation: bounceIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}} />
    </div>
  );
}
