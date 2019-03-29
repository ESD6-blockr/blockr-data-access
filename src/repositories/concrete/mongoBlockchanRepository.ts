import { Block } from "@blockr/blockr-models";
import { inject, injectable } from "inversify";
import * as Mongo from "mongodb";
import { IClient, MongoDB } from "../../clients";
import Logger from "../../utils/logger";
import { IBlockchainRepository } from "../interfaces/blockchainRepository";

/**
 * MongoDB blockchain repository implementation
 */
@injectable()
export class MongoBlockchainRepository implements IBlockchainRepository {
    private client: IClient<Mongo.Db>;
    private readonly blocks: string;

    constructor(@inject(MongoDB) client: IClient<Mongo.Db>) {
        this.client = client;
        this.blocks = "blocks";
    }

    public async getBlockchainAsync(): Promise<Block[]> {
        try {
            Logger.info("Get blockchain");

            const database = await this.client.connectAsync();
            const collection = database.collection(this.blocks);

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
            Logger.info(`Get block by number ${blockNumber}`);

            const database = await this.client.connectAsync();
            const collection = database.collection(this.blocks);

            return new Promise((resolve, reject) => {
                collection.findOne({ "blockHeader.blockNumber": blockNumber }).then((result) => {
                    if (result) {
                        resolve(result);
                    }

                    reject(`Block not found ${blockNumber}`);
                });
            });
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
            const collection = database.collection(this.blocks);

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
            const collection = database.collection(this.blocks);

            await collection.insertOne(block);
        } catch (error) {
            throw error;
        } finally {
            this.client.disconnectAsync();
        }
    }

    public async deleteBlocksAsync(blockNumbers: number[]): Promise<void> {
        try {
            Logger.info("Delete multiple blocks");

            const database = await this.client.connectAsync();
            const collection = database.collection(this.blocks);

            await collection.deleteMany({ "blockHeader.blockNumber": blockNumbers });
        } catch (error) {
            throw error;
        } finally {
            this.client.disconnectAsync();
        }
    }

    public async deleteBlockAsync(blockNumber: number): Promise<void> {
        try {
            Logger.info("Delete single block");

            const database = await this.client.connectAsync();
            const collection = database.collection(this.blocks);

            await collection.deleteOne({ "blockHeader.blockNumber": blockNumber });
        } catch (error) {
            throw error;
        } finally {
            this.client.disconnectAsync();
        }
    }
}
