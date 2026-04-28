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
 
    const sourceAccount = await server.loadAccount(sourcePublicKey);

    
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

  
    const xdr = transaction.toXDR();

     
    const signResult = await signTransaction(xdr, {
       networkPassphrase: NETWORK_PASSPHRASE,
    });

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

    const signedTransaction = StellarSdk.TransactionBuilder.fromXDR(
      signedXdr,
      NETWORK_PASSPHRASE
    );

    const response = await server.submitTransaction(signedTransaction as StellarSdk.Transaction);

    return {
      success: true,
      hash: response.hash,
      feeCharged: "100", 
      ledger: response.ledger,
      timestamp: new Date().toISOString(), 
    };
  } catch (error: any) {
    
    console.log("Transaction failed:", error?.message || "Unknown error");
    
    
    if (error?.message?.includes("User declined") || error?.message?.includes("User rejected")) {
       return { success: false, error: "Transaction was rejected by the user in Freighter." };
    }
    
    
    if (error?.response?.data?.extras?.result_codes?.operations?.includes("op_no_destination")) {
       return { success: false, error: "Destination account does not exist on the testnet. (Create it by sending >1 XLM)" };
    }
    
 
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
