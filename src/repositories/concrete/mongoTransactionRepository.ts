import { Block, Transaction, TransactionType } from "@blockr/blockr-models";
import * as Mongo from "mongodb";
import { BLOCK_TABLE } from "..";
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
        this.tableName = BLOCK_TABLE;
    }

    public async getTransactionsByQueryAsync(queries?: object): Promise<Transaction[]> {
        try {
            if (queries) {
                queries = this.mongoDbQueryBuilder.rebuildQuery<Transaction>(queries, this.getExampleTransaction());
            }

            const database = await this.client.connectAsync();
            const collection = database.collection(this.tableName);

            const transactions: Transaction[] = [];
            const result =  await collection.find(queries).toArray();

            for (const block of result) {
                transactions.push.apply(transactions, block.transactions);
            }

            return transactions;
        } finally {
            await this.client.disconnectAsync();
        }
    }

    private getExampleTransaction() {
        const transaction = new Transaction(TransactionType.COIN, "1", "2", 1, new Date());
        return transaction;
    }
}
