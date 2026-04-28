export interface TransactionResult {
  success: boolean;
  hash?: string;
  error?: string;
  feeCharged?: string;
  ledger?: number;
  timestamp?: string;
}

export interface SendTransactionParams {
  sourcePublicKey: string;
  destinationPublicKey: string;
  amount: string;
}
