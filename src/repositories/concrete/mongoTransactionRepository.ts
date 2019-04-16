import { Transaction } from "@blockr/blockr-models";
import { inject, injectable } from "inversify";
import * as Mongo from "mongodb";
import { IClient, MongoDB } from "../../clients";
import Logger from "../../utils/logger";
import { ITransactionRepository } from "../interfaces/transactionRepository";

/**
 * MongoDB transaction repository implementation
 */
@injectable()
export class MongoTransactionRepository implements ITransactionRepository {
    private client: IClient<Mongo.Db>;
    private readonly tableName: string;

    constructor(@inject(MongoDB) client: IClient<Mongo.Db>) {
        this.client = client;
        this.tableName = "transactions";
    }

    public async getTransactionsAsync(): Promise<Transaction[]> {
        try {
            Logger.info("Get transactions");

            const database = await this.client.connectAsync();
            const collection = database.collection(this.tableName);

            return await collection.find().toArray();
        } catch (error) {
            Logger.error(error);

            throw error;
        } finally {
            await this.client.disconnectAsync();
        }
    }

    public async getTransactionsByAmountAsync(amount: number): Promise<Transaction[]> {
        try {
            Logger.info(`Get transactions by amount ${amount}`);

            const database = await this.client.connectAsync();
            const collection = database.collection(this.tableName);

            return await collection.find({ "transaction.amount": amount }).toArray();
        } catch (error) {
            Logger.error(error);

            throw error;
        } finally {
            await this.client.disconnectAsync();
        }
    }

    public async getTransactionsByDateAsync(timestamp: number): Promise<Transaction[]> {
        try {
            Logger.info(`Get transactions by date ${timestamp}`);

            const database = await this.client.connectAsync();
            const collection = database.collection(this.tableName);

            return await collection.find({ "transaction.timestamp": timestamp }).toArray();
        } catch (error) {
            Logger.error(error);

            throw error;
        } finally {
            await this.client.disconnectAsync();
        }
    }

    public async getTransactionsByPeriodAsync(beginTimestamp: number, endTimestamp: number): Promise<Transaction[]> {
        try {
            Logger.info(`Get transactions within period ${beginTimestamp} - ${endTimestamp}`);

            const database = await this.client.connectAsync();
            const collection = database.collection(this.tableName);

            return await collection.find({ "transaction.timestamp": { $gt: beginTimestamp, $lt: endTimestamp } })
                .toArray();
        } catch (error) {
            Logger.error(error);

            throw error;
        } finally {
            await this.client.disconnectAsync();
        }
    }

    public async getTransactionsByRecipientAsync(recipient: string): Promise<Transaction[]> {
        try {
            Logger.info(`Get transactions by recipient ${recipient}`);

            const database = await this.client.connectAsync();
            const collection = database.collection(this.tableName);

            return await collection.find({ "transaction.recipient": recipient }).toArray();
        } catch (error) {
            Logger.error(error);

            throw error;
        } finally {
            await this.client.disconnectAsync();
        }
    }

    public async getTransactionsBySenderAsync(sender: string): Promise<Transaction[]> {
        try {
            Logger.info(`Get transactions by sender ${sender}`);

            const database = await this.client.connectAsync();
            const collection = database.collection(this.tableName);

            return await collection.find({ "transaction.sender": sender }).toArray();
        } catch (error) {
            Logger.error(error);

            throw error;
        } finally {
            await this.client.disconnectAsync();
        }
    }

    public async getTransactionsBySignatureAsync(signature: string): Promise<Transaction[]> {
        try {
            Logger.info(`Get transactions by signature ${signature}`);

            const database = await this.client.connectAsync();
            const collection = database.collection(this.tableName);

            return await collection.find({ "transaction.signature": signature }).toArray();
        } catch (error) {
            Logger.error(error);

            throw error;
        } finally {
            await this.client.disconnectAsync();
        }
    }

    public async getTransactionsByRouteAsync(sender: string, recipient: string): Promise<Transaction[]> {
        try {
            Logger.info(`Get transactions by route ${sender} -> ${recipient}`);

            const database = await this.client.connectAsync();
            const collection = database.collection(this.tableName);

            return await collection.find({ "transaction.sender": sender, "transaction.recipient": recipient })
                .toArray();
        } catch (error) {
            Logger.error(error);

            throw error;
        } finally {
            await this.client.disconnectAsync();
        }
    }

    public async createTransactionsAsync(transactions: Transaction[]): Promise<void> {
        try {
            Logger.info("Set multiple transaction");

            const database = await this.client.connectAsync();
            const collection = database.collection(this.tableName);

            await collection.insertMany(transactions);
        } catch (error) {
            Logger.error(error);

            throw error;
        } finally {
            this.client.disconnectAsync();
        }
    }

    public async createTransactionAsync(transaction: Transaction): Promise<void> {
        try {
            Logger.info("Set single transaction");

            const database = await this.client.connectAsync();
            const collection = database.collection(this.tableName);

            await collection.insertOne(transaction);
        } catch (error) {
            Logger.error(error);

            throw error;
        } finally {
            this.client.disconnectAsync();
        }
    }
}
