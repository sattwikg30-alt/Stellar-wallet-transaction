"use client";

import React from "react";
import { PaymentHistoryRecord } from "../types/history";
import { shortenPublicKey } from "../services/wallet";

interface TransactionHistoryProps {
  history: PaymentHistoryRecord[];
  isLoading: boolean;
  error: string | null;
}

export const TransactionHistory: React.FC<TransactionHistoryProps> = ({
  history,
  isLoading,
  error,
}) => {
  if (error) {
    return (
      <div className="w-full max-w-4xl mt-8 p-4 bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400 rounded-2xl border border-red-200 dark:border-red-900/20 text-center">
        {error}
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mt-12 mb-10 overflow-hidden bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-sm animate-fade-in">
      <div className="p-6 sm:px-8 border-b border-zinc-200 dark:border-zinc-800 flex justify-between items-center bg-zinc-50/50 dark:bg-zinc-950/50">
        <h3 className="text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-2">
          <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Recent Transactions
        </h3>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-zinc-500 uppercase bg-zinc-50 dark:bg-zinc-950/50 dark:text-zinc-400">
            <tr>
              <th scope="col" className="px-6 py-4 font-medium">Type</th>
              <th scope="col" className="px-6 py-4 font-medium">Amount</th>
              <th scope="col" className="px-6 py-4 font-medium hidden sm:table-cell">Counterparty</th>
              <th scope="col" className="px-6 py-4 font-medium hidden md:table-cell">Date</th>
              <th scope="col" className="px-6 py-4 font-medium text-right">Link</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
            {isLoading ? (
              // Loading skeleton rows
              [...Array(3)].map((_, i) => (
                <tr key={i} className="animate-pulse bg-white dark:bg-zinc-900/50">
                  <td className="px-6 py-4"><div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-16"></div></td>
                  <td className="px-6 py-4"><div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-20"></div></td>
                  <td className="px-6 py-4 hidden sm:table-cell"><div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-24"></div></td>
                  <td className="px-6 py-4 hidden md:table-cell"><div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-32"></div></td>
                  <td className="px-6 py-4"><div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-8 ml-auto"></div></td>
                </tr>
              ))
            ) : history.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-zinc-500 dark:text-zinc-400">
                  <div className="flex flex-col items-center justify-center gap-2">
                     <svg className="w-8 h-8 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                     </svg>
                     <p>No recent transactions found.</p>
                  </div>
                </td>
              </tr>
            ) : (
              history.map((tx) => (
                <tr key={tx.id} className="bg-white dark:bg-zinc-900 border-b dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                  <td className="px-6 py-4 font-medium">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${tx.isSender ? 'bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300' : 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400'}`}>
                      {tx.isSender ? (
                        <><svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg> Sent</>
                      ) : (
                        <><svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg> Received</>
                      )}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-semibold whitespace-nowrap text-zinc-900 dark:text-zinc-100">
                    <span className={tx.isSender ? "" : "text-emerald-500 dark:text-emerald-400"}>
                      {tx.isSender ? "-" : "+"}{tx.amount}
                    </span>
                    <span className="text-zinc-400 text-xs ml-1 font-normal uppercase">{tx.assetType === 'native' ? 'XLM' : tx.assetType}</span>
                  </td>
                  <td className="px-6 py-4 text-zinc-500 dark:text-zinc-400 font-mono text-xs hidden sm:table-cell">
                    {tx.isSender ? shortenPublicKey(tx.to) : shortenPublicKey(tx.from)}
                  </td>
                  <td className="px-6 py-4 text-zinc-500 dark:text-zinc-400 hidden md:table-cell whitespace-nowrap">
                    {new Date(tx.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <a 
                      href={`https://stellar.expert/explorer/testnet/tx/${tx.transactionHash}`} 
                      target="_blank" 
                      rel="noreferrer"
                      className="inline-flex p-2 text-zinc-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg transition-colors"
                      title="View on Stellar Expert"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
