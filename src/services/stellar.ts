import * as StellarSdk from "@stellar/stellar-sdk";


export const server = new StellarSdk.Horizon.Server("https://horizon-testnet.stellar.org");

export const fetchAccountBalance = async (publicKey: string): Promise<string> => {
  try {
    const account = await server.loadAccount(publicKey);
    
    const nativeBal = account.balances.find((b) => b.asset_type === "native");
    return nativeBal ? nativeBal.balance : "0";
  } catch (error: any) {
    console.error("Error fetching account balance", error);
    
   
    if (error?.response?.status === 404) {
      throw new Error("Account not found. Please fund it on the Stellar Testnet.");
    }
    
    throw new Error("Failed to fetch balance. Please try again.");
  }
};
