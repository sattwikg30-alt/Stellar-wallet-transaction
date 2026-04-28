"use client";

import { useState, useEffect } from "react";
import { fetchAccountBalance } from "../services/stellar";

export const useBalance = (publicKey: string | null) => {
  const [balance, setBalance] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!publicKey) {
      setBalance(null);
      setError(null);
      return;
    }

    const getBalance = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const bal = await fetchAccountBalance(publicKey);
        setBalance(bal);
      } catch (err: any) {
        setError(err.message || "Could not fetch balance");
        setBalance(null);
      } finally {
        setIsLoading(false);
      }
    };

    getBalance();
  }, [publicKey]);

  const refreshBalance = async () => {
    if (!publicKey) return;
    setIsLoading(true);
    setError(null);
    try {
      const bal = await fetchAccountBalance(publicKey);
      setBalance(bal);
    } catch (err: any) {
      setError(err.message || "Could not fetch balance");
    } finally {
      setIsLoading(false);
    }
  };

  return { balance, isLoading, error, refreshBalance };
};
