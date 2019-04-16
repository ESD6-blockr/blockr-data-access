import { Block } from "@blockr/blockr-models";
import { inject, injectable } from "inversify";
import { IClient, LevelDB } from "../../clients";
import { IBlockchainRepository } from "../interfaces/blockchainRepository";

/**
 * LevelDB blockchain repository implementation
 */
@injectable()
export class LevelBlockchainRepository implements IBlockchainRepository {
    private client: IClient<void>;

    constructor(@inject(LevelDB) client: IClient<void>) {
        this.client = client;
    }

    public async getBlockchainAsync(): Promise<Block[]> {
        throw new Error("Method not implemented.");
    }

    public async getBlocksByPeriodAsync(beginTimestamp: number, endTimestamp: number): Promise<Block[]> {
        throw new Error("Method not implemented.");
    }

    public async getBlocksByDateAsync(timestamp: number): Promise<Block[]> {
        throw new Error("Method not implemented.");
    }

    public async getBlocksByHashAsync(blockHash: string): Promise<Block[]> {
        throw new Error("Method not implemented.");
    }

    public async getBlockAsync(blockNumber: number): Promise<Block> {
        throw new Error("Method not implemented.");
    }

    public async getPreviousBlockAsync(parentHash: string): Promise<Block> {
        throw new Error("Method not implemented.");
    }

    public async getNextBlockAsync(blockHash: string): Promise<Block> {
        throw new Error("Method not implemented.");
    }

    public async createBlocksAsync(blocks: Block[]): Promise<void> {
        throw new Error("Method not implemented.");
    }

    public async createBlockAsync(block: Block): Promise<void> {
        throw new Error("Method not implemented.");
    }

    public async deleteBlocksAsync(blockNumbers: number[]): Promise<void> {
        throw new Error("Method not implemented.");
    }

    public async deleteBlockAsync(blockNumber: number): Promise<void> {
        throw new Error("Method not implemented.");
    }
}
