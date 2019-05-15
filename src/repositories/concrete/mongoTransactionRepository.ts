import { Transaction, TransactionType } from "@blockr/blockr-models";
import * as Mongo from "mongodb";
import { IClient, MongoDB } from "../../clients";
import { IClientConfiguration } from "../../configurations";
import { ITransactionRepository } from "../../repositories";
import { MongoDbQueryBuilder } from "./mongoDbQueryBuilder";

/**
 * MongoDB transaction repository implementation
 */
export class MongoTransactionRepository implements ITransactionRepository {
    private readonly client: IClient<Mongo.Db>;
    private readonly tableName: string;
    private readonly mongoDbQueryBuilder: MongoDbQueryBuilder;

    constructor(configuration: IClientConfiguration) {
        this.client = new MongoDB(configuration);
        this.mongoDbQueryBuilder = new MongoDbQueryBuilder();
        this.tableName = "transactions";
    }

    public async getTransactionsByQueryAsync(queries: object): Promise<Transaction[]> {
        try {
            const exampleTransaction = this.getExampleTransaction();
            queries = this.mongoDbQueryBuilder.rebuildQuery<Transaction>(queries, exampleTransaction);
            const database = await this.client.connectAsync();
            const collection = database.collection(this.tableName);

            return await collection.find(queries).toArray();
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

    private getExampleTransaction() {
        const transaction = new Transaction(TransactionType.COIN, "1", "2", 123, new Date());
        transaction.signature = "signature";
        return transaction;
    }
}
