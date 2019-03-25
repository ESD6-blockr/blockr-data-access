import { Block } from "@blockr/blockr-models";
import { inject, injectable } from "inversify";
import { IDatabase, LevelDB } from "../../Databases";
import { IBlockchainRepository } from "../interfaces/blockchainRepository";

/**
 * LevelDB blockchain repository implementation
 */
@injectable()
export class LevelBlockchainRepository implements IBlockchainRepository {
    private database: IDatabase;

    constructor(@inject(LevelDB) database: IDatabase) {
        this.database = database;
    }

    public async getBlockchainAsync(): Promise<Block[]> {
        throw new Error("Method not implemented.");
    }

    public async getBlockAsync(): Promise<Block> {
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
