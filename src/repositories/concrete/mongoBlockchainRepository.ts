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
    private readonly tableName: string;

    constructor(@inject(MongoDB) client: IClient<Mongo.Db>) {
        this.client = client;
        this.tableName = "blocks";
    }

    public async getBlockchainAsync(): Promise<Block[]> {
        try {
            Logger.info("Get blockchain");

            const database = await this.client.connectAsync();
            const collection = database.collection(this.tableName);

            return await collection.find().toArray();
        } catch (error) {
            Logger.error(error);

            throw error;
        } finally {
            await this.client.disconnectAsync();
        }
    }

    public async getBlocksByPeriodAsync(beginTimestamp: number, endTimestamp: number): Promise<Block[]> {
        try {
            Logger.info(`Get blocks within period ${beginTimestamp} - ${endTimestamp}`);

            const database = await this.client.connectAsync();
            const collection = database.collection(this.tableName);

            return await collection.find({ "blockHeader.timestamp": { $gt: beginTimestamp, $lt: endTimestamp } })
                .toArray();
        } catch (error) {
            Logger.error(error);

            throw error;
        } finally {
            this.client.disconnectAsync();
        }
    }

    public async getBlocksByDateAsync(timestamp: number): Promise<Block[]> {
        try {
            Logger.info(`Get blocks by date ${timestamp}`);

            const database = await this.client.connectAsync();
            const collection = database.collection(this.tableName);

            return await collection.find({ "blockHeader.timestamp": timestamp }).toArray();
        } catch (error) {
            Logger.error(error);

            throw error;
        } finally {
            this.client.disconnectAsync();
        }
    }

    public async getBlocksByHashAsync(blockHash: string): Promise<Block[]> {
        try {
            Logger.info(`Get blocks by hash ${blockHash}`);

            const database = await this.client.connectAsync();
            const collection = database.collection(this.tableName);

            return await collection.find({ "blockHeader.blockHash": blockHash }).toArray();
        } catch (error) {
            Logger.error(error);

            throw error;
        } finally {
            this.client.disconnectAsync();
        }
    }

    public async getBlockAsync(blockNumber: number): Promise<Block> {
        try {
            Logger.info(`Get block by number ${blockNumber}`);

            const database = await this.client.connectAsync();
            const collection = database.collection(this.tableName);

            return new Promise((resolve, reject) => {
                collection.findOne({ "blockHeader.blockNumber": blockNumber }).then((result) => {
                    if (result) {
                        resolve(result);
                    }

                    reject(`Block not found ${blockNumber}`);
                });
            });
        } catch (error) {
            Logger.error(error);

            throw error;
        } finally {
            this.client.disconnectAsync();
        }
    }

    public async getPreviousBlockAsync(parentHash: string): Promise<Block> {
        try {
            Logger.info(`Get previous block by parent hash ${parentHash}`);

            const database = await this.client.connectAsync();
            const collection = database.collection(this.tableName);

            return new Promise((resolve, reject) => {
                collection.findOne({ "blockHeader.blockHash": parentHash }).then((result) => {
                    if (result) {
                        resolve(result);
                    }

                    reject(`No previous block found for hash ${parentHash}`);
                });
            });
        } catch (error) {
            Logger.error(error);

            throw error;
        } finally {
            this.client.disconnectAsync();
        }
    }

    public async getNextBlockAsync(blockHash: string): Promise<Block> {
        try {
            Logger.info(`Get next block by block hash ${blockHash}`);

            const database = await this.client.connectAsync();
            const collection = database.collection(this.tableName);

            return new Promise((resolve, reject) => {
                collection.findOne({ "blockHeader.parentHash": blockHash }).then((result) => {
                    if (result) {
                        resolve(result);
                    }

                    reject(`No next block found for hash ${blockHash}`);
                });
            });
        } catch (error) {
            Logger.error(error);

            throw error;
        } finally {
            this.client.disconnectAsync();
        }
    }

    public async createBlocksAsync(blocks: Block[]): Promise<void> {
        try {
            Logger.info("Set multiple blocks");

            const database = await this.client.connectAsync();
            const collection = database.collection(this.tableName);

            await collection.insertMany(blocks);
        } catch (error) {
            Logger.error(error);

            throw error;
        } finally {
            this.client.disconnectAsync();
        }
    }

    public async createBlockAsync(block: Block): Promise<void> {
        try {
            Logger.info("Set single block");

            const database = await this.client.connectAsync();
            const collection = database.collection(this.tableName);

            await collection.insertOne(block);
        } catch (error) {
            Logger.error(error);

            throw error;
        } finally {
            this.client.disconnectAsync();
        }
    }

    public async deleteBlocksAsync(blockNumbers: number[]): Promise<void> {
        try {
            Logger.info("Delete multiple blocks");

            const database = await this.client.connectAsync();
            const collection = database.collection(this.tableName);

            await collection.deleteMany({ "blockHeader.blockNumber": blockNumbers });
        } catch (error) {
            Logger.error(error);

            throw error;
        } finally {
            this.client.disconnectAsync();
        }
    }

    public async deleteBlockAsync(blockNumber: number): Promise<void> {
        try {
            Logger.info("Delete single block");

            const database = await this.client.connectAsync();
            const collection = database.collection(this.tableName);

            await collection.deleteOne({ "blockHeader.blockNumber": blockNumber });
        } catch (error) {
            Logger.error(error);

            throw error;
        } finally {
            this.client.disconnectAsync();
        }
    }
}
