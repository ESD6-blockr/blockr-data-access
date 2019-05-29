import { Block, BlockHeader } from "@blockr/blockr-models";

export const AMOUNT_OF_BLOCKS: number = 5;

export const getBlock = (blockNumber?: number): Block => {
    blockNumber = blockNumber || Math.floor(Math.random() * 1000) + 1;
    const amount = Math.floor(Math.random() * 100) + 11;

    const blockHeader: BlockHeader = new BlockHeader("1", blockNumber, new Date(), amount);
    return new Block(blockHeader, []);
};

export const getBlocks = (): Block[] => {
    const blocks: Block[] = [];
    for (let i = 0; i < AMOUNT_OF_BLOCKS; i++) {
        blocks.push(getBlock());
    }
    return blocks;
};
