"use client";

import React, { useState } from "react";
import { buildAndSubmitTransaction } from "../services/transaction";
import { TransactionResult } from "../types/transaction";
import { useAddressBook } from "../hooks/useAddressBook";
import { useToast } from "./ToastProvider";

interface SendFormProps {
  sourcePublicKey: string | null;
  onSuccess?: () => void;
  onResult: (result: TransactionResult) => void;
}

export const SendForm: React.FC<SendFormProps> = ({
  sourcePublicKey,
  onSuccess,
  onResult,
}) => {
  const [destination, setDestination] = useState("");
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  
  const { addresses, saveAddress } = useAddressBook();
  const { toast } = useToast();

  const handleSaveContact = () => {
    if (destination.length === 56 && destination.startsWith("G")) {
      const name = prompt("Enter a name for this contact:");
      if (name) {
        if (saveAddress(name, destination)) {
          toast(`Contact "${name}" saved!`, "success");
        } else {
          toast("Failed to save contact.", "error");
        }
      }
    } else {
      toast("Enter a valid Stellar address first.", "error");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    if (!sourcePublicKey) {
      setValidationError("Please connect your wallet first.");
      return;
    }
    
    // Basic validations
    if (!destination || destination.length !== 56 || !destination.startsWith("G")) {
      const errorStr = "Please enter a valid Stellar public key (starts with G, 56 characters).";
      setValidationError(errorStr);
      toast(errorStr, "error");
      return;
    }

    if (destination === sourcePublicKey) {
      const errorStr = "You cannot send XLM to your own address.";
      setValidationError(errorStr);
      toast(errorStr, "error");
      return;
    }

    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      const errorStr = "Please enter a valid amount greater than 0.";
      setValidationError(errorStr);
      toast(errorStr, "error");
      return;
    }

    setIsLoading(true);

    try {
      toast("Building & signing transaction...", "info");
      const result = await buildAndSubmitTransaction({
        sourcePublicKey,
        destinationPublicKey: destination,
        amount: parsedAmount.toString(), // Ensure string format exactly as parsed
      });

      onResult(result);
      
      if (result.success) {
         toast("Transaction successfully submitted!", "success");
         setDestination("");
         setAmount("");
         if (onSuccess) onSuccess();
      } else {
         toast(result.error || "Transaction failed", "error");
      }
    } catch (err: any) {
      const errorMsg = err.message || "An unexpected error occurred";
      toast(errorMsg, "error");
      onResult({
        success: false,
        error: errorMsg,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex justify-center mt-8">
      <div className="w-full max-w-sm p-8 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-sm transition-all duration-300 hover:shadow-xl group">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/40 flex items-center justify-center text-purple-600 dark:text-purple-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </div>
            <h3 className="text-zinc-900 dark:text-white font-semibold flex-1">Transfer XLM</h3>
          </div>
          
          {addresses.length > 0 && (
            <div className="relative inline-block text-left">
              <select 
                className="appearance-none bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 py-1.5 pl-3 pr-8 rounded-lg text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-purple-500 cursor-pointer"
                onChange={(e) => {
                  if(e.target.value) setDestination(e.target.value);
                  e.target.value = "";
                }}
                defaultValue=""
                disabled={isLoading || !sourcePublicKey}
              >
                <option value="" disabled>Address Book</option>
                {addresses.map((a) => (
                  <option key={a.address} value={a.address}>
                    {a.name}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-zinc-500">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-4 relative">
          <div>
            <div className="flex justify-between items-end mb-1.5">
              <label htmlFor="destination" className="block text-xs font-medium text-zinc-500 uppercase tracking-wider">
                Destination Address
              </label>
              <button 
                type="button" 
                onClick={handleSaveContact}
                disabled={isLoading || !sourcePublicKey}
                className="text-[10px] uppercase font-bold text-blue-500 hover:text-blue-600 disabled:opacity-50 transition-colors"
              >
                + Save Address
              </button>
            </div>
            <input
              id="destination"
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value.trim())}
              placeholder="G..."
              className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all text-sm font-mono text-zinc-900 dark:text-zinc-100"
              disabled={isLoading || !sourcePublicKey}
            />
          </div>

          <div>
            <label htmlFor="amount" className="block text-xs font-medium text-zinc-500 mb-1.5 uppercase tracking-wider">
              Amount (XLM)
            </label>
            <div className="relative">
              <input
                id="amount"
                type="number"
                step="0.0000001"
                min="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="1.5"
                className="w-full pl-4 pr-16 py-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all text-sm font-mono text-zinc-900 dark:text-zinc-100"
                disabled={isLoading || !sourcePublicKey}
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-zinc-400 select-none">
                XLM
              </span>
            </div>
          </div>

          {validationError && (
            <div className="text-red-500 text-xs font-medium mt-2 animate-bounce-in">
              {validationError}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading || !sourcePublicKey}
            className="group relative w-full flex justify-center py-3 px-4 mt-6 border border-transparent text-sm font-bold rounded-xl text-white bg-purple-600 hover:bg-purple-700 disabled:bg-zinc-400 dark:disabled:bg-zinc-800 disabled:text-zinc-200 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 shadow-md transition-all active:scale-[0.98] overflow-hidden"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : (
              <span className="flex items-center gap-2 relative z-10">
                Send Payment &rarr;
              </span>
            )}
            
            {/* Hover shine effect */}
            {!isLoading && sourcePublicKey && (
              <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
            )}
          </button>
        </div>
      </div>
      
      {/* Required for shimmer fallback if not strictly configured */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}} />
    </form>
  );
};
