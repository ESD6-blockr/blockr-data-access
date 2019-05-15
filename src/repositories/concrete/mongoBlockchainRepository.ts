import { Block } from "@blockr/blockr-models";
import * as Mongo from "mongodb";
import { IClient, MongoDB } from "../../clients";
import { IClientConfiguration } from "../../configurations";
import { IBlockchainRepository } from "../../repositories";
import { FilterException } from "../exceptions";
import { RepositoryOperations } from "./repositoryOperations";

/**
 * MongoDB blockchain repository implementation
 */
export class MongoBlockchainRepository implements IBlockchainRepository {
    private readonly client: IClient<Mongo.Db>;
    private readonly tableName: string;
    private readonly repositoryOperations: RepositoryOperations;

    constructor(configuration: IClientConfiguration) {
        this.client = new MongoDB(configuration);
        this.tableName = "blocks";
        this.repositoryOperations = new RepositoryOperations();
    }

    public async getBlocksByQueryAsync(queries: object): Promise<Block[]> {
        try {
            const database = await this.client.connectAsync();
            const collection = database.collection(this.tableName);

            const blocks: Block[] = await collection.find().toArray();

            if (Object.keys(queries).length < 1) {
                return blocks;
            }

            return this.repositoryOperations.filterCollectionByQueries(blocks, blocks[0].blockHeader, queries);
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
