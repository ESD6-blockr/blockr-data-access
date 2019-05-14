import { Transaction } from "@blockr/blockr-models";
import * as Mongo from "mongodb";
import { IClient, MongoDB } from "../../clients";
import { IClientConfiguration } from "../../configurations";
import { ITransactionRepository } from "../../repositories";
import { FilterException } from "../exceptions";

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
            const allTransactions: Transaction[] = database.collection(this.tableName);
            let filteredTransactions: Transaction[] = new Array();
            
            for (const query of queries) {
                const field = allTransactions[0][query[0]];
                            
                if (field) {
                    throw new FilterException("Field in query does not exists");
                }
            
                filteredTransactions.push.apply(filteredTransactions,
                    (allTransactions.filter((transaction) => transaction[query[0]] === query[1])));
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
}
