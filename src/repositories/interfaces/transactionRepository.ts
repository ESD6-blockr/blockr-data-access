import { Transaction } from "@blockr/blockr-models";

export interface ITransactionRepository {
    /**
     * Get all transactions by filter
     * @returns {Promise<Transaction[]>} array of transactions
     */
    getTransactionsByQueryAsync(queries: [string, string]): Promise<Transaction[]>;
    /**
     * Add a single transaction to the blockchain
     * @param transaction new transaction
     */
    addTransactionAsync(transaction: Transaction): Promise<void>;
}
