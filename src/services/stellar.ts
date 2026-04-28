import * as StellarSdk from "@stellar/stellar-sdk";

// Use Horizon testnet per requirements
export const server = new StellarSdk.Horizon.Server("https://horizon-testnet.stellar.org");

export const fetchAccountBalance = async (publicKey: string): Promise<string> => {
  try {
    const account = await server.loadAccount(publicKey);
    // Find the native XLM balance
    const nativeBal = account.balances.find((b) => b.asset_type === "native");
    return nativeBal ? nativeBal.balance : "0";
  } catch (error: any) {
    console.error("Error fetching account balance", error);
    
    // Check if it's a 404 (account not found/funded)
    if (error?.response?.status === 404) {
      throw new Error("Account not found. Please fund it on the Stellar Testnet.");
    }
    
    throw new Error("Failed to fetch balance. Please try again.");
  }
};
