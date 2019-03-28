import { Block } from "@blockr/blockr-models";
import { inject, injectable } from "inversify";
import * as Mongo from "mongodb";
import { IClient, MongoDB } from "../../clients";
import Logger from "../../logger/logger";
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
            Logger.info("Get blockchain");

            const database = await this.client.connectAsync();
            const collection = database.collection("blocks");

            return await collection.find().toArray();
        } catch (error) {
            Logger.error(error);

            throw error;
        } finally {
            await this.client.disconnectAsync();
        }
    }

    public async getBlockAsync(blockNumber: number): Promise<Block> {
        try {
            Logger.info("Get block by number");

            const database = await this.client.connectAsync();
            const collection = database.collection("blocks");

            return await collection.findOne({ "blockHeader.blockNumber": blockNumber });
        } catch (error) {
            throw error;
        } finally {
            this.client.disconnectAsync();
        }
    }

    public async setBlocksAsync(blocks: Block[]): Promise<void> {
        try {
            Logger.info("Set multiple blocks");

            const database = await this.client.connectAsync();
            const collection = database.collection("blocks");

            await collection.insertMany(blocks);
        } catch (error) {
            throw error;
        } finally {
            this.client.disconnectAsync();
        }
    }

    public async setBlockAsync(block: Block): Promise<void> {
        try {
            Logger.info("Set single block");

            const database = await this.client.connectAsync();
            const collection = database.collection("blocks");

            await collection.insertOne(block);
        } catch (error) {
            throw error;
        } finally {
            this.client.disconnectAsync();
        }
    }

    public async deleteBlocksASync(blockNumbers: number[]): Promise<void> {
        try {
            Logger.info("Delete multiple blocks");

            const database = await this.client.connectAsync();
            const collection = database.collection("blocks");

            await collection.deleteOne({"blockHeader.blockNumber": blockNumbers})
        }
    }

    public async deleteBlockAsync(blockNumber: number): Promise<void> {
        throw new Error("Method not implemented.");
    }
}
