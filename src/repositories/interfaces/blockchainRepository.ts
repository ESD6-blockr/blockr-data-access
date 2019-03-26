import { Block } from "@blockr/blockr-models";

export interface IBlockchainRepository {
    getBlockchainAsync(): Promise<Block[]>;
    getBlockAsync(blockNumber: number): Promise<Block>;
    setBlocksAsync(blocks: Block[]): Promise<void>;
    setBlockAsync(block: Block): Promise<void>;
    deleteBlocksASync(blockNumbers: number[]): Promise<void>;
    deleteBlockAsync(blockNumber: number): Promise<void>;
}
