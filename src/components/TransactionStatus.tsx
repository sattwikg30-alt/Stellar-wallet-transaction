"use client";

import React from "react";
import { TransactionResult } from "../types/transaction";

interface TransactionStatusProps {
  result: TransactionResult | null;
  onClear: () => void;
}

export const TransactionStatus: React.FC<TransactionStatusProps> = ({
  result,
  onClear,
}) => {
  if (!result) return null;

  return (
    <div className={`mt-6 p-4 rounded-xl border ${result.success ? "bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/20 text-emerald-800 dark:text-emerald-300" : "bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-500/20 text-red-800 dark:text-red-300"} w-full animate-fade-in relative`}>
      <button 
        onClick={onClear}
        className="absolute top-3 right-3 p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div className="flex items-start gap-3 pr-6">
        {result.success ? (
          <div className="mt-0.5. shrink-0">
             <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
             </svg>
          </div>
        ) : (
          <div className="mt-0.5 shrink-0">
             <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
             </svg>
          </div>
        )}
        
        <div className="flex flex-col gap-1 overflow-hidden">
          <p className="font-semibold text-sm">
            {result.success ? "Transaction Successful" : "Transaction Failed"}
          </p>
          
          {result.success && result.hash ? (
            <div className="text-xs break-all opacity-80 mt-1">
              <span className="font-semibold block mb-1">Transaction Hash:</span>
              <a 
                href={`https://stellar.expert/explorer/testnet/tx/${result.hash}`} 
                target="_blank" 
                rel="noreferrer"
                className="underline hover:opacity-80 transition-opacity flex items-center gap-1"
              >
                {result.hash}
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          ) : (
            <p className="text-xs opacity-80 mt-1">{result.error}</p>
          )}
        </div>
      </div>
    </div>
  );
};
