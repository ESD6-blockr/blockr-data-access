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

    public async getTransactionsByDatePeriodAsync(beginDate: Date, endDate: Date): Promise<Transaction[]> {
        try {
            Logger.info(`Get transactions within date period ${beginDate} - ${endDate}`);

            const database = await this.client.connectAsync();
            const collection = database.collection(this.tableName);

            return await collection.find({ "transaction.date": { $gt: beginDate, $lt: endDate } }).toArray();
        } catch (error) {
            Logger.error(error);

            throw error;
        } finally {
            await this.client.disconnectAsync();
        }
    }

    public async getTransactionsByRecipientKeyAsync(recipientKey: string): Promise<Transaction[]> {
        try {
            Logger.info(`Get transactions by recipientKey ${recipientKey}`);

            const database = await this.client.connectAsync();
            const collection = database.collection(this.tableName);

            return await collection.find({ "transaction.recipientKey": recipientKey }).toArray();
        } catch (error) {
            Logger.error(error);

            throw error;
        } finally {
            await this.client.disconnectAsync();
        }
    }

    public async getTransactionsBySenderKeyAsync(senderKey: string): Promise<Transaction[]> {
        try {
            Logger.info(`Get transactions by senderKey ${senderKey}`);

            const database = await this.client.connectAsync();
            const collection = database.collection(this.tableName);

            return await collection.find({ "transaction.senderKey": senderKey }).toArray();
        } catch (error) {
            Logger.error(error);

            throw error;
        } finally {
            await this.client.disconnectAsync();
        }
    }

    public async getTransactionsBySenderKeyToRecipientKeyAsync(senderKey: string, recipientKey: string):
        Promise<Transaction[]> {
        try {
            Logger.info(`Get transactions by senderKey to recipientKey ${senderKey} -> ${recipientKey}`);

            const database = await this.client.connectAsync();
            const collection = database.collection(this.tableName);

            return await collection.find({
                "transaction.recipientKey": recipientKey,
                "transaction.senderKey": senderKey,
            }).toArray();
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
