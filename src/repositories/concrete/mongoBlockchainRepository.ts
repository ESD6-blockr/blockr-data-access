import { Block } from "@blockr/blockr-models";
import * as Mongo from "mongodb";
import { IClient, MongoDB } from "../../clients";
import { IClientConfiguration } from "../../configurations";
import { IBlockchainRepository } from "../../repositories";
import { MongoDbQueryBuilder } from "./mongoDbQueryBuilder";

/**
 * MongoDB blockchain repository implementation
 */
export class MongoBlockchainRepository implements IBlockchainRepository {
    private readonly client: IClient<Mongo.Db>;
    private readonly mongoDbQueryBuilder: MongoDbQueryBuilder;
    private readonly tableName: string;

    constructor(configuration: IClientConfiguration) {
        this.client = new MongoDB(configuration);
        this.mongoDbQueryBuilder = new MongoDbQueryBuilder();
        this.tableName = "blocks";
    }

    public async getBlocksByQueryAsync(queries: object): Promise<Block[]> {
        try {
            // TODO: Fix this query
            const results: Block[] = [];
            return results;
        } finally {
            this.client.disconnectAsync();
        }
    }

    public async addBlocksAsync(blocks: Block[]): Promise<void> {
        try {
            const database = await this.client.connectAsync();
            const collection = database.collection(this.tableName);

            await collection.insertMany(blocks);
        } finally {
            this.client.disconnectAsync();
        }
    }

    public async addBlockAsync(block: Block): Promise<void> {
        try {
            const database = await this.client.connectAsync();
            const collection = database.collection(this.tableName);

            await collection.insertOne(block);
        } finally {
            this.client.disconnectAsync();
        }
    }
}
