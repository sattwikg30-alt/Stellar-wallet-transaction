"use client";

import React, { useState } from "react";
import { TransactionResult } from "../types/transaction";
import { useToast } from "./ToastProvider";

interface TransactionStatusProps {
  result: TransactionResult | null;
  onClear: () => void;
}

export const TransactionStatus: React.FC<TransactionStatusProps> = ({
  result,
  onClear,
}) => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  if (!result) return null;

  const handleCopy = () => {
    if (result.hash) {
      navigator.clipboard.writeText(result.hash);
      toast("Transaction hash copied!", "info");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className={`mt-6 rounded-2xl border overflow-hidden ${result.success ? "bg-emerald-50 dark:bg-emerald-500/5 border-emerald-200 dark:border-emerald-500/20 text-emerald-900 dark:text-emerald-100" : "bg-red-50 dark:bg-red-500/5 border-red-200 dark:border-red-500/20 text-red-900 dark:text-red-100"} w-full animate-fade-in-up relative shadow-sm`}>
      <button 
        onClick={onClear}
        className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors z-10"
        title="Close"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div className="p-5 flex items-start gap-4">
        {result.success ? (
          <div className="mt-0.5 shrink-0 p-2 bg-emerald-100 dark:bg-emerald-900/40 rounded-full text-emerald-600 dark:text-emerald-400">
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
             </svg>
          </div>
        ) : (
          <div className="mt-0.5 shrink-0 p-2 bg-red-100 dark:bg-red-900/40 rounded-full text-red-600 dark:text-red-400">
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
             </svg>
          </div>
        )}
        
        <div className="flex flex-col w-full min-w-0 pr-6">
          <h3 className="font-bold text-lg mb-1">
            {result.success ? "Transaction Successful" : "Transaction Failed"}
          </h3>
          
          {result.success && result.hash ? (
            <div className="mt-4 space-y-3">
              <div className="grid grid-cols-2 gap-4 text-sm bg-white/60 dark:bg-black/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-900/30">
                
                {/* Stats Row */}
                {result.feeCharged && (
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider opacity-60 mb-1">Fee Used</p>
                    <p className="font-mono text-xs">{parseFloat(result.feeCharged) / 10000000} XLM</p>
                  </div>
                )}
                {result.ledger && (
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider opacity-60 mb-1">Ledger</p>
                    <p className="font-mono text-xs">#{result.ledger}</p>
                  </div>
                )}

                {/* Hash Row */}
                <div className="col-span-2">
                  <p className="text-[10px] font-bold uppercase tracking-wider opacity-60 mb-1 flex items-center justify-between">
                    Transaction Hash
                    <button
                      onClick={handleCopy}
                      className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 bg-emerald-100 dark:bg-emerald-900/40 px-2 py-0.5 rounded transition-colors text-[10px] font-bold"
                    >
                      {copied ? "COPIED!" : "COPY"}
                    </button>
                  </p>
                  <a 
                    href={`https://stellar.expert/explorer/testnet/tx/${result.hash}`} 
                    target="_blank" 
                    rel="noreferrer"
                    className="group flex items-center gap-2 max-w-full font-mono text-xs truncate underline underline-offset-4 decoration-emerald-300 dark:decoration-emerald-700 hover:decoration-emerald-500 transition-colors"
                    title="View on Stellar Expert"
                  >
                    <span className="truncate flex-1">{result.hash}</span>
                    <svg className="w-3.5 h-3.5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity -ml-1 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>

              {result.timestamp && (
                <div className="text-[11px] opacity-60 font-medium">
                  Confirmed: {new Date(result.timestamp).toLocaleString()}
                </div>
              )}
            </div>
          ) : (
            <p className="text-sm opacity-80 mt-1 font-medium">{result.error}</p>
          )}
        </div>
      </div>
    </div>
  );
};
