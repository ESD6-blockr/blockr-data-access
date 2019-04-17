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
     * Get all transactions in a period of dates
     * @param beginDate starting date
     * @param endDate end date
     * @returns {Promise<Transaction[]>} array of transactions
     */
    getTransactionsByDatePeriodAsync(beginDate: Date, endDate: Date): Promise<Transaction[]>;
    /**
     * Get all transactions by recipient key
     * @param recipientKey transaction recipient key
     * @returns {Promise<Transaction[]>} array of transactions
     */
    getTransactionsByRecipientKeyAsync(recipientKey: string): Promise<Transaction[]>;
    /**
     * Get all transactions by sender key
     * @param senderKey transaction sender key
     * @returns {Promise<Transaction[]>} array of transactions
     */
    getTransactionsBySenderKeyAsync(senderKey: string): Promise<Transaction[]>;
    /**
     * Get all transactions by sender- to recipientKey
     * @param senderKey transaction sender key
     * @param recipientKey transaction recipient key
     * @returns {Promise<Transaction[]>} array of transactions
     */
    getTransactionsBySenderKeyToRecipientKeyAsync(senderKey: string, recipientKey: string): Promise<Transaction[]>;
    /**
     * Add multiple transactions to the blockchain
     * @param transaction new transaction
     */
    addTransactionsAsync(transactions: Transaction[]): Promise<void>;
    /**
     * Add a single transaction to the blockchain
     * @param transaction new transaction
     */
    addTransactionAsync(transaction: Transaction): Promise<void>;
}
