"use client";

import React from "react";

interface BalanceCardProps {
  balance: string | null;
  isLoading: boolean;
  error: string | null;
  onRefresh?: () => void;
}

export const BalanceCard: React.FC<BalanceCardProps> = ({
  balance,
  isLoading,
  error,
  onRefresh
}) => {
  return (
    <div className="relative overflow-hidden p-8 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-sm w-full max-w-sm flex flex-col gap-6 transition-all duration-300 hover:shadow-xl group">
      {/* Decorative gradient blob */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-colors duration-500"></div>

      <div className="flex justify-between items-center relative z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center text-blue-600 dark:text-blue-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <span className="text-zinc-600 dark:text-zinc-400 text-sm font-semibold tracking-wide">
            Testnet Balance
          </span>
        </div>
        
        {onRefresh && (
          <button 
             onClick={onRefresh}
             disabled={isLoading}
             className="p-2 -mr-2 text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-full transition-all disabled:opacity-50 disabled:hover:bg-transparent"
             title="Refresh Balance"
          >
            <svg className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        )}
      </div>
      
      <div className="relative z-10 w-full">
        {isLoading ? (
          <div className="animate-pulse flex items-baseline gap-2">
            <div className="h-10 bg-zinc-200 dark:bg-zinc-800 rounded-lg w-28"></div>
            <div className="h-6 bg-zinc-200 dark:bg-zinc-800 rounded-md w-12"></div>
          </div>
        ) : error ? (
          <div className="p-3 bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 text-xs sm:text-sm rounded-lg border border-red-100 dark:border-red-500/20 leading-relaxed">
            {error}
          </div>
        ) : (
          <div className="flex items-baseline gap-2 cursor-default">
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white truncate">
              {balance || "0"}
            </h2>
            <span className="text-xl font-medium text-zinc-500 dark:text-zinc-500">
              XLM
            </span>
          </div>
        )}
      </div>

      {!isLoading && !error && balance === "0" && (
        <div className="relative z-10 text-xs text-zinc-500 dark:text-zinc-500 bg-zinc-50 dark:bg-zinc-800/50 p-3 rounded-lg border border-zinc-100 dark:border-zinc-800">
          Fund this testnet account using the{" "}
          <a
            href="https://laboratory.stellar.org/#account-creator?network=test"
            target="_blank"
            rel="noreferrer"
            className="text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 underline underline-offset-2"
          >
            Friendbot
          </a>
          {" "}to see a balance.
        </div>
      )}
    </div>
  );
};
