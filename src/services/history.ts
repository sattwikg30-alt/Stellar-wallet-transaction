import { server } from "./stellar";
import { PaymentHistoryRecord } from "../types/history";

export const fetchRecentPayments = async (publicKey: string): Promise<PaymentHistoryRecord[]> => {
  try {
    
    const response = await server
      .payments()
      .forAccount(publicKey)
      .order("desc")
      .limit(10)
      .call();

    return response.records
      .filter((record: any) => record.type === "payment" || record.type === "create_account")
      .map((record: any) => {
        
        const isCreateAccount = record.type === "create_account";
        const from = isCreateAccount ? record.funder : record.from;
        const to = isCreateAccount ? record.account : record.to;
        const amount = isCreateAccount ? record.starting_balance : record.amount;
        const assetType = isCreateAccount ? "native" : record.asset_type;

        return {
          id: record.id,
          type: record.type,
          createdAt: record.created_at,
          transactionHash: record.transaction_hash,
          amount: amount,
          assetType: assetType,
          from: from,
          to: to,
          isSender: from === publicKey,
          successful: record.transaction_successful,
        };
      });
  } catch (error: any) {
    console.error("Error fetching payment history:", error);
    
    throw new Error("Failed to load transaction history.");
  }
};
