export interface TransactionResult {
  success: boolean;
  hash?: string;
  error?: string;
}

export interface SendTransactionParams {
  sourcePublicKey: string;
  destinationPublicKey: string;
  amount: string;
}
