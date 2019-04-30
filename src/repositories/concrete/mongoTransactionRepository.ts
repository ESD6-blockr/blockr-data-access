import { Transaction } from "@blockr/blockr-models";
import { IClient, MongoDB } from "app/clients";
import { IClientConfiguration } from "app/configurations";
import { ITransactionRepository } from "app/repositories";
import * as Mongo from "mongodb";

/**
 * MongoDB transaction repository implementation
 */
export class MongoTransactionRepository implements ITransactionRepository {
    private client: IClient<Mongo.Db>;
    private readonly tableName: string;

    constructor(configuration: IClientConfiguration) {
        this.client = new MongoDB(configuration);
        this.tableName = "transactions";
    }

    public async getTransactionsAsync(): Promise<Transaction[]> {
        try {
            const database = await this.client.connectAsync();
            const collection = database.collection(this.tableName);

            return await collection.find().toArray();
        } catch (error) {
            throw error;
        } finally {
            await this.client.disconnectAsync();
        }
    }

    public async getTransactionsByAmountAsync(amount: number): Promise<Transaction[]> {
        try {
            const database = await this.client.connectAsync();
            const collection = database.collection(this.tableName);

            return await collection.find({ "transaction.amount": amount }).toArray();
        } catch (error) {
            throw error;
        } finally {
            await this.client.disconnectAsync();
        }
    }

    public async getTransactionsByDatePeriodAsync(beginDate: Date, endDate: Date): Promise<Transaction[]> {
        try {
            const database = await this.client.connectAsync();
            const collection = database.collection(this.tableName);

            return await collection.find({ "transaction.date": { $gt: beginDate, $lt: endDate } }).toArray();
        } catch (error) {
            throw error;
        } finally {
            await this.client.disconnectAsync();
        }
    }

    public async getTransactionsByRecipientKeyAsync(recipientKey: string): Promise<Transaction[]> {
        try {
            const database = await this.client.connectAsync();
            const collection = database.collection(this.tableName);

            return await collection.find({ "transaction.recipientKey": recipientKey }).toArray();
        } catch (error) {
            throw error;
        } finally {
            await this.client.disconnectAsync();
        }
    }

    public async getTransactionsBySenderKeyAsync(senderKey: string): Promise<Transaction[]> {
        try {
            const database = await this.client.connectAsync();
            const collection = database.collection(this.tableName);

            return await collection.find({ "transaction.senderKey": senderKey }).toArray();
        } catch (error) {
            throw error;
        } finally {
            await this.client.disconnectAsync();
        }
    }

    public async getTransactionsBySenderKeyToRecipientKeyAsync(senderKey: string, recipientKey: string):
        Promise<Transaction[]> {
        try {
            const database = await this.client.connectAsync();
            const collection = database.collection(this.tableName);

            return await collection.find({
                "transaction.recipientKey": recipientKey,
                "transaction.senderKey": senderKey,
            }).toArray();
        } catch (error) {
            throw error;
        } finally {
            await this.client.disconnectAsync();
        }
    }

    public async addTransactionsAsync(transactions: Transaction[]): Promise<void> {
        try {
            const database = await this.client.connectAsync();
            const collection = database.collection(this.tableName);

            await collection.insertMany(transactions);
        } catch (error) {
            throw error;
        } finally {
            this.client.disconnectAsync();
        }
    }

    public async addTransactionAsync(transaction: Transaction): Promise<void> {
        try {
            const database = await this.client.connectAsync();
            const collection = database.collection(this.tableName);

            await collection.insertOne(transaction);
        } catch (error) {
            throw error;
        } finally {
            this.client.disconnectAsync();
        }
    }
}
