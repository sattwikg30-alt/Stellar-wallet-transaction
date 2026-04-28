import * as StellarSdk from "@stellar/stellar-sdk";
import { signTransaction } from "@stellar/freighter-api";
import { server } from "./stellar";
import { SendTransactionParams, TransactionResult } from "../types/transaction";

const NETWORK_PASSPHRASE = StellarSdk.Networks.TESTNET;

export const buildAndSubmitTransaction = async ({
  sourcePublicKey,
  destinationPublicKey,
  amount,
}: SendTransactionParams): Promise<TransactionResult> => {
  try {
    // 1. Load the sender account to get its current sequence number
    const sourceAccount = await server.loadAccount(sourcePublicKey);

    // 2. Build the transaction
    const transaction = new StellarSdk.TransactionBuilder(sourceAccount, {
      fee: StellarSdk.BASE_FEE,
      networkPassphrase: NETWORK_PASSPHRASE,
    })
      .addOperation(
        StellarSdk.Operation.payment({
          destination: destinationPublicKey,
          asset: StellarSdk.Asset.native(),
          amount: amount,
        })
      )
      .setTimeout(30)
      .build();

    // 3. Convert transaction to XDR string to be signed by Freighter
    const xdr = transaction.toXDR();

    // 4. Request Freighter to sign the transaction
    const signResult = await signTransaction(xdr, {
       networkPassphrase: NETWORK_PASSPHRASE,
    });

    // Check Freighter's response format (string vs object)
    let signedXdr = "";
    if (typeof signResult === "string") {
      signedXdr = signResult;
    } else if (signResult.error) {
      return { success: false, error: signResult.error };
    } else if (signResult.signedTxXdr) {
      signedXdr = signResult.signedTxXdr;
    } else {
      return { success: false, error: "Failed to sign transaction with Freighter." };
    }

    // 5. Build the signed transaction from the signed XDR
    const signedTransaction = StellarSdk.TransactionBuilder.fromXDR(
      signedXdr,
      NETWORK_PASSPHRASE
    );

    // 6. Submit the transaction to the Stellar Network
    const response = await server.submitTransaction(signedTransaction as StellarSdk.Transaction);

    return {
      success: true,
      hash: response.hash,
      feeCharged: "100", // Standard base fee we requested in TransactionBuilder
      ledger: response.ledger,
      timestamp: new Date().toISOString(), // Submission confirmation time
    };
  } catch (error: any) {
    // Only log the message string to avoid Next.js dev overlay jumpscares with Axios errors
    console.log("Transaction failed:", error?.message || "Unknown error");
    
    // Check if user rejected the transaction via Freighter
    if (error?.message?.includes("User declined") || error?.message?.includes("User rejected")) {
       return { success: false, error: "Transaction was rejected by the user in Freighter." };
    }
    
    // Check if destination account does not exist
    if (error?.response?.data?.extras?.result_codes?.operations?.includes("op_no_destination")) {
       return { success: false, error: "Destination account does not exist on the testnet. (Create it by sending >1 XLM)" };
    }
    
    // Parse normal Stellar SDK errors
    const txError = error?.response?.data?.extras?.result_codes?.transaction;
    const opErrors = error?.response?.data?.extras?.result_codes?.operations?.join(", ");
    
    let errorMessage = "An unknown error occurred during the transaction.";
    if (txError) {
      errorMessage = `Transaction Error: ${txError}`;
      if (opErrors) {
        errorMessage += ` | Ops: ${opErrors}`;
      }
    } else if (error?.message) {
      errorMessage = error.message;
    }
      
    return { success: false, error: errorMessage };
  }
};
