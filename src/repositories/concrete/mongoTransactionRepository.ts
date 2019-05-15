import { Transaction } from "@blockr/blockr-models";
import * as Mongo from "mongodb";
import { IClient, MongoDB } from "../../clients";
import { IClientConfiguration } from "../../configurations";
import { ITransactionRepository } from "../../repositories";
import { FilterException } from "../exceptions";
import { RepositoryOperations } from "./repositoryOperations";

/**
 * MongoDB transaction repository implementation
 */
export class MongoTransactionRepository implements ITransactionRepository {
    private readonly client: IClient<Mongo.Db>;
    private readonly tableName: string;
    private readonly repositoryOperations: RepositoryOperations;

    constructor(configuration: IClientConfiguration) {
        this.client = new MongoDB(configuration);
        this.tableName = "transactions";
        this.repositoryOperations = new RepositoryOperations();
    }

    public async getTransactionsByQueryAsync(queries: object): Promise<Transaction[]> {
        try {
            const database = await this.client.connectAsync();
            const collection = database.collection(this.tableName);

            const transactions: Transaction[] = await collection.find().toArray();

            if (Object.keys(queries).length < 1) {
                return transactions;
            }

            return this.repositoryOperations.filterCollectionByQueries(transactions, transactions[0], queries);
        } finally {
            this.client.disconnectAsync();
        }
    }

    public async addTransactionAsync(transaction: Transaction): Promise<void> {
        try {
            const database = await this.client.connectAsync();
            const collection = database.collection(this.tableName);

            await collection.insertOne(transaction);
        } finally {
            this.client.disconnectAsync();
        }
    }
}
