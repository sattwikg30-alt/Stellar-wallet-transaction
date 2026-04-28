"use client";

import { useState, useEffect, useCallback } from "react";
import { fetchRecentPayments } from "../services/history";
import { PaymentHistoryRecord } from "../types/history";

export const useHistory = (publicKey: string | null) => {
  const [history, setHistory] = useState<PaymentHistoryRecord[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getHistory = useCallback(async () => {
    if (!publicKey) {
      setHistory([]);
      setError(null);
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const records = await fetchRecentPayments(publicKey);
      setHistory(records);
    } catch (err: any) {
      setError(err.message || "Could not fetch history");
    } finally {
      setIsLoading(false);
    }
  }, [publicKey]);

  useEffect(() => {
    getHistory();
  }, [getHistory]);

  return { history, isLoading, error, refreshHistory: getHistory };
};
