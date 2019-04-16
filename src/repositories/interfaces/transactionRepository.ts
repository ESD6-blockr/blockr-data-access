import { Transaction } from "@blockr/blockr-models";

export interface ITransactionRepository {
    /**
    * Get all transactions
    * @returns {Promise<Transaction[]>} array of transactions
    */
    getTransactionsAsync(): Promise<Transaction[]>;
    /**
     * Get all transactions by amount
     * @param amount transaction amount
     * @returns {Promise<Transaction[]>} array of transactions
     */
    getTransactionsByAmountAsync(amount: number): Promise<Transaction[]>;
    /**
     * Get all transactions by date
     * @param timestamp transaction timestamp
     * @returns {Promise<Transaction[]>} array of transactions
     */
    getTransactionsByDateAsync(timestamp: number): Promise<Transaction[]>;
    /**
     * Get all transactions in a period
     * @param beginTimestamp starting date
     * @param endTimestamp end date
     * @returns {Promise<Transaction[]>} array of transactions
     */
    getTransactionsByPeriodAsync(beginTimestamp: number, endTimestamp: number): Promise<Transaction[]>;
    /**
     * Get all transactions by recipient
     * @param recipient transaction recipient
     * @returns {Promise<Transaction[]>} array of transactions
     */
    getTransactionsByRecipientAsync(recipient: string): Promise<Transaction[]>;
    /**
     * Get all transactions by sender
     * @param sender transaction sender
     * @returns {Promise<Transaction[]>} array of transactions
     */
    getTransactionsBySenderAsync(sender: string): Promise<Transaction[]>;
    /**
     * Get all transactions by signature
     * @param signature transaction signature
     * @returns {Promise<Transaction[]>} array of transactions
     */
    getTransactionsBySignatureAsync(signature: string): Promise<Transaction[]>;
    /**
     * Get all transactions by route
     * @param sender transaction sender
     * @param recipient transaction recipient
     * @returns {Promise<Transaction[]>} array of transactions
     */
    getTransactionsByRouteAsync(sender: string, recipient: string): Promise<Transaction[]>;
    /**
     * Add multiple transactions to the blockchain
     * @param transaction new transaction
     */
    createTransactionsAsync(transactions: Transaction[]): Promise<void>
    /**
     * Add a single transaction to the blockchain
     * @param transaction new transaction
     */
    createTransactionAsync(transaction: Transaction): Promise<void>;
}