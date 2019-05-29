import { Transaction } from "@blockr/blockr-models";

export interface ITransactionRepository {
    /**
     * Get all transactions by filter
     * @returns {Promise<Transaction[]>} array of transactions
     */
    getTransactionsByQueryAsync(queries?: object): Promise<Transaction[]>;
}
