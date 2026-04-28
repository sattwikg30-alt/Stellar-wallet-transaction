"use client";

import React, { useState } from "react";
import { shortenPublicKey } from "../services/wallet";
import { useToast } from "./ToastProvider";

interface WalletButtonProps {
  publicKey: string | null;
  isConnecting?: boolean;
  onConnect: () => void;
  onDisconnect: () => void;
}

export const WalletButton: React.FC<WalletButtonProps> = ({
  publicKey,
  isConnecting,
  onConnect,
  onDisconnect,
}) => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (publicKey) {
      navigator.clipboard.writeText(publicKey);
      toast("Wallet address copied!", "info");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex items-center gap-3">
      {/* Network Badge */}
      <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 rounded-full">
        <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div>
        <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">Testnet</span>
      </div>

      {publicKey ? (
        <>
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-4 py-2 bg-zinc-100/80 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/50 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-full transition-all group"
            title="Copy Address"
          >
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse hidden sm:block"></div>
            <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200 font-mono">
              {shortenPublicKey(publicKey)}
            </span>
            <svg className={`w-3.5 h-3.5 transition-colors ${copied ? 'text-emerald-500' : 'text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {copied ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              )}
            </svg>
          </button>
          <button
            onClick={onDisconnect}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-full transition-all duration-200 shadow-sm hover:shadow-md focus:ring-2 focus:ring-red-500"
          >
            Disconnect
          </button>
        </>
      ) : (
        <button
          onClick={onConnect}
          disabled={isConnecting}
          className="group relative flex items-center justify-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-sm font-semibold rounded-full transition-all duration-200 shadow-md hover:shadow-lg disabled:cursor-not-allowed"
        >
          {isConnecting ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Connecting...
            </>
          ) : (
            <>
              <svg className="w-4 h-4 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
              Connect Freighter
            </>
          )}
        </button>
      )}
    </div>
  );
};
