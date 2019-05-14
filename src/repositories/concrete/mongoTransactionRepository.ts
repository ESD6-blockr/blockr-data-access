import { Transaction } from "@blockr/blockr-models";
import * as Mongo from "mongodb";
import { IClient, MongoDB } from "../../clients";
import { IClientConfiguration } from "../../configurations";
import { ITransactionRepository } from "../../repositories";

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

    public async getTransactionsByQueryAsync(queries: [string, string]): Promise<Transaction[]> {
        try {
            const database = await this.client.connectAsync();
            const allTransactions: Transaction[] = await database.collection(this.tableName);
            let filteredTransactions: Transaction[] = new Array();
            for (const transaction of allTransactions) {
                for (const query of queries) {
                    if (this.paramQueryEqualsToFieldName(query[0])) {
                        if (transaction.query[0] === query[1]) {
                            filteredTransactions.push(transaction);
                        }
                    }
                }
            }
            return filteredTransactions;
        } catch (error) {
            throw error;
        } finally {
            await this.client.disconnectAsync();
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

    private paramQueryEqualsToFieldName(queryName: string): boolean {
        if (queryName === "recipientKey" 
        || queryName === "senderKey" 
        || queryName === "amount" 
        || queryName === "date" 
        || queryName === "signature"
        || queryName === "blockHash") {
            return true;
        }
        return false;
    }
}
