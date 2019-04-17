import { Block } from "@blockr/blockr-models";

export interface IBlockchainRepository {
    /**
     * Get the full blockchain
     * @returns {Promise<Block[]>} array of blocks
     */
    getBlockchainAsync(): Promise<Block[]>;
    /**
     * Get the blocks in the blockchain within a period of dates
     * @param beginDate starting date
     * @param endDate end date
     * @returns {Promise<block[]>} array of blocks
     */
    getBlocksByDatePeriodAsync(beginDate: Date, endDate: Date): Promise<Block[]>;
    /**
     * Get the blocks in the blockchain by date
     * @param date date of the block
     * @returns {Promise<block[]>} array of blocks
     */
    getBlocksByDateAsync(date: Date): Promise<Block[]>;
    /**
     * Get the blocks in the blockchain by hash
     * @param blockHash hash of the block
     * @returns {Promise<block>} array of blocks
     */
    getBlocksByHashAsync(blockHash: string): Promise<Block[]>;
    /**
     * Get the next blocks in the blockchain
     * @param blockHash hash of block in the blockchain
     * @returns {Promise<Block[]>} array of blocks
     */
    getBlockAsync(blockNumber: number): Promise<Block>;
    /**
     * Get the previous block
     * @param parentHash parent hash of block
     * @returns {Promise<Block>} single block
     */
    getPreviousBlockAsync(parentHash: string): Promise<Block>;
    /**
     * Get the next block
     * @param blockHash hash of block
     * @returns {Promise<Block>} single block
     */
    getNextBlockAsync(blockHash: string): Promise<Block>;
    /**
     * Create multiple blocks
     * @param blocks array of blocks
     */
    createBlocksAsync(blocks: Block[]): Promise<void>;
    /**
     * Create a single block
     * @param block block
     */
    createBlockAsync(block: Block): Promise<void>;
    /**
     * Delete multiple blocks by number
     * @param blockNumbers array of block numbers
     */
    deleteBlocksByNumbersAsync(blockNumbers: number[]): Promise<void>;
    /**
     * Delete single block by number
     * @param blockNumber block number
     */
    deleteBlockByNumberAsync(blockNumber: number): Promise<void>;
}
