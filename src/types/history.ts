export interface PaymentHistoryRecord {
  id: string;
  type: string;
  createdAt: string;
  transactionHash: string;
  amount: string;
  assetType: string;
  from: string;
  to: string;
  isSender: boolean; // Computed field to easily determine if connected wallet sent it
  successful: boolean;
}
