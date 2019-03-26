import { Block } from "@blockr/blockr-models";
import { inject, injectable } from "inversify";
import * as Mongo from "mongodb";
import { IClient, MongoDB } from "../../clients";
import { IBlockchainRepository } from "../interfaces/blockchainRepository";

/**
 * MongoDB blockchain repository implementation
 */
@injectable()
export class MongoBlockchainRepository implements IBlockchainRepository {
    private client: IClient<Mongo.Db>;

    constructor(@inject(MongoDB) client: IClient<Mongo.Db>) {
        this.client = client;
    }

    public async getBlockchainAsync(): Promise<Block[]> {
        try {
            const database = await this.client.connectAsync();
            const collection = database.collection("blocks");
            return await collection.find().toArray();
        } catch (error) {
            throw error;
        } finally {
            await this.client.disconnectAsync();
        }
    }

    public async getBlockAsync(blockNumber: number): Promise<Block> {
        throw new Error("Method not implemented.");
    }

    public async setBlocksAsync(blocks: Block[]): Promise<void> {
        throw new Error("Method not implemented.");
    }

    public async setBlockAsync(block: Block): Promise<void> {
        throw new Error("Method not implemented.");
    }

    public async deleteBlocksASync(blockNumbers: number[]): Promise<void> {
        throw new Error("Method not implemented.");
    }

    public async deleteBlockAsync(blockNumber: number): Promise<void> {
        throw new Error("Method not implemented.");
    }
}
