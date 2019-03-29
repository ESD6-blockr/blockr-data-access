import { Block } from "@blockr/blockr-models";

export interface IBlockchainRepository {
    /**
     * Get the full blockchain
     * @returns {Prmise<Block[]>} array of blocks
     */
    getBlockchainAsync(): Promise<Block[]>;
    /**
     * Get a single block by number
     * @param blockNumber number of the block
     * @returns {Promise<block>} single block
     */
    getBlockAsync(blockNumber: number): Promise<Block>;
    /**
     * Set multiple blocks
     * @param blocks array of blocks
     */
    setBlocksAsync(blocks: Block[]): Promise<void>;
    /**
     * Set a single block
     * @param block block
     */
    setBlockAsync(block: Block): Promise<void>;
    /**
     * Delete multiple blocks by number
     * @param blockNumbers array of block numbers
     */
    deleteBlocksAsync(blockNumbers: number[]): Promise<void>;
    /**
     * Delete single block by number
     * @param blockNumber block number
     */
    deleteBlockAsync(blockNumber: number): Promise<void>;
}
