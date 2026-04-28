"use client";

import { useState } from "react";
import { connectWallet } from "../services/wallet";

export const useWallet = () => {
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState<boolean>(false);

  const connect = async () => {
    setIsConnecting(true);
    setError(null);
    try {
      const key = await connectWallet();
      setPublicKey(key);
    } catch (err: any) {
      setError(err.message || "Failed to connect wallet");
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnect = () => {
    setPublicKey(null);
    setError(null);
  };

  return { publicKey, isConnecting, connect, disconnect, error };
};
