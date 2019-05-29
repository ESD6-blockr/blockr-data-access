import { Block, BlockHeader } from "@blockr/blockr-models";
import * as Mongo from "mongodb";
import { IClient, MongoDB } from "../../clients";
import { IClientConfiguration } from "../../configurations";
import { EmptyModelException } from "../../exceptions/emptyModel.exception";
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

    public async getBlocksByQueryAsync(queries?: object): Promise<Block[]> {
        try {
            if (queries) {
                queries = this.mongoDbQueryBuilder.rebuildQuery<Block>(queries, this.getExampleBlock());
            }

            const database = await this.client.connectAsync();
            const collection = database.collection(this.tableName);

            return await collection.find(queries).toArray();
        } finally {
            await this.client.disconnectAsync();
        }
    }

    public async addBlocksAsync(blocks: Block[]): Promise<void> {
        for (const block of blocks) {
            if (Object.keys(block).length === 0) {
                throw new EmptyModelException("Block is empty");
            }
        }

        try {
            const database = await this.client.connectAsync();
            const collection = database.collection(this.tableName);

            await collection.insertMany(blocks);
        } finally {
            await this.client.disconnectAsync();
        }
    }

    public async addBlockAsync(block: Block): Promise<void> {
        if (Object.keys(block).length === 0) {
            throw new EmptyModelException("Block is empty");
        }

        try {
            const database = await this.client.connectAsync();
            const collection = database.collection(this.tableName);

            await collection.insertOne(block);
        } finally {
            await this.client.disconnectAsync();
        }
    }

    public async pruneBlockchainAsync(): Promise<void> {
        try {
            const database = await this.client.connectAsync();
            const collection = await database.collection(this.tableName);

            await collection.deleteMany({});
        } finally {
            await this.client.disconnectAsync();
        }
    }

    private getExampleBlock() {
        return new Block(new BlockHeader("validatorVersion", 1, new Date(), 1), new Set());
    }
}
