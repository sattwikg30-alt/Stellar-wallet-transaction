import {
  isConnected,
  requestAccess,
  setAllowed,
} from "@stellar/freighter-api";

export const checkWalletConnection = async (): Promise<boolean> => {
  try {
    const result = await isConnected();
    return typeof result === "boolean" ? result : !!(result as any).isConnected;
  } catch (error) {
    console.error("Error checking wallet connection", error);
    return false;
  }
};

export const connectWallet = async (): Promise<string | null> => {
  try {
    const isWalletConnected = await checkWalletConnection();
    if (!isWalletConnected) {
      throw new Error("Freighter wallet is not installed or accessible");
    }
    
    
    await setAllowed();
    
    let result = await requestAccess();
    
    
    if (typeof result === "string") {
       return result;
    } else if (result && result.address) {
       return result.address;
    } else if ((result as any).error) {
       throw new Error((result as any).error);
    }
    
    throw new Error("Could not retrieve public key from Freighter");
  } catch (error) {
    console.error("Error connecting to wallet", error);
    throw error;
  }
};

export const shortenPublicKey = (publicKey: string): string => {
  if (!publicKey) return "";
  return `${publicKey.slice(0, 5)}...${publicKey.slice(-4)}`;
};
