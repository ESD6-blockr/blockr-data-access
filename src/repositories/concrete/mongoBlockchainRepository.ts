import { Block } from "@blockr/blockr-models";
import * as Mongo from "mongodb";
import { IClient, MongoDB } from "../../clients";
import { IClientConfiguration } from "../../configurations";
import { IBlockchainRepository } from "../../repositories";

/**
 * MongoDB blockchain repository implementation
 */
export class MongoBlockchainRepository implements IBlockchainRepository {
    private client: IClient<Mongo.Db>;
    private readonly tableName: string;

    constructor(configuration: IClientConfiguration) {
        this.client = new MongoDB(configuration);
        this.tableName = "blocks";
    }

    public async getBlocksByQueryAsync(queries: [string, string]): Promise<Block[]> {
        try {
            const database = await this.client.connectAsync();
            const allBlocks: Block[] = await database.collection(this.tableName);
            let filteredBlocks: Block[] = new Array();
            for (const block of allBlocks) {
                for (const query of queries) {
                    if (this.paramQueryEqualsToFieldName(query[0])) {
                        if (block.blockHeader.query[0] === query[1]) {
                            filteredBlocks.push(block);
                        }
                    }
                }
            }
            return filteredBlocks;
        } catch (error) {
            throw error;
        } finally {
            await this.client.disconnectAsync();
        }
    }

    public async addBlocksAsync(blocks: Block[]): Promise<void> {
        try {
            const database = await this.client.connectAsync();
            const collection = database.collection(this.tableName);

            await collection.insertMany(blocks);
        } catch (error) {
            throw error;
        } finally {
            this.client.disconnectAsync();
        }
    }

    public async addBlockAsync(block: Block): Promise<void> {
        try {
            const database = await this.client.connectAsync();
            const collection = database.collection(this.tableName);

            await collection.insertOne(block);
        } catch (error) {
            throw error;
        } finally {
            this.client.disconnectAsync();
        }
    }

    private paramQueryEqualsToFieldName(queryName: string): boolean {
        if (queryName === "blockNumber" 
        || queryName === "date" 
        || queryName === "blockHash" 
        || queryName === "parentHash") {
            return true;
        }
        return false;
    }
}
