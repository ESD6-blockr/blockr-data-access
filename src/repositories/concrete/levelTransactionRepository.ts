import { Transaction } from "@blockr/blockr-models";
import { inject, injectable } from "inversify";
import { IClient, LevelDB } from "../../clients";
import { ITransactionRepository } from "../interfaces/transactionRepository";

/**
 * LevelDB transaction repository implementation
 */
@injectable()
export class LevelTransactionRepository implements ITransactionRepository {
    private client: IClient<void>;

    constructor(@inject(LevelDB) client: IClient<void>) {
        this.client = client;
    }

    public async getTransactionsAsync(): Promise<Transaction[]> {
        throw new Error("Method not implemented.");
    }

    public async getTransactionsByAmountAsync(amount: number): Promise<Transaction[]> {
        throw new Error("Method not implemented.");
    }

    public async getTransactionsByDatePeriodAsync(beginDate: Date, endDate: Date): Promise<Transaction[]> {
        throw new Error("Method not implemented.");
    }

    public async getTransactionsByRecipientKeyAsync(recipientKey: string): Promise<Transaction[]> {
        throw new Error("Method not implemented.");
    }

    public async getTransactionsBySenderKeyAsync(senderKey: string): Promise<Transaction[]> {
        throw new Error("Method not implemented.");
    }

    public async getTransactionsBySenderKeyToRecipientKeyAsync(senderKey: string, recipientKey: string):
        Promise<Transaction[]> {
        throw new Error("Method not implemented.");
    }

    public async addTransactionsAsync(transactions: Transaction[]): Promise<void> {
        throw new Error("Method not implemented.");
    }

    public async addTransactionAsync(transaction: Transaction): Promise<void> {
        throw new Error("Method not implemented.");
    }
}
