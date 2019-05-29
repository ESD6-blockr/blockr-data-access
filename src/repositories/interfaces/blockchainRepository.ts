import { Block } from "@blockr/blockr-models";

export interface IBlockchainRepository {
    /**
     * Get the full blockchain
     * @returns {Promise<Block[]>} array of blocks
     */
    getBlocksByQueryAsync(queries?: object): Promise<Block[]>;
    /**
     * Add multiple blocks
     * @param blocks array of blocks
     */
    addBlocksAsync(blocks: Block[]): Promise<void>;
    /**
     * Add a single block
     * @param block block
     */
    addBlockAsync(block: Block): Promise<void>;
    /**
     * Prune the blockchain
     */
    pruneBlockchainAsync(): Promise<void>;
}
