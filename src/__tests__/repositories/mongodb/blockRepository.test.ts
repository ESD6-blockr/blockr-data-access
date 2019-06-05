import { Block } from "@blockr/blockr-models";
import { MongoMemoryServer } from "mongodb-memory-server";
import { IClientConfiguration } from "../../..";
import { MongoBlockchainRepository } from "../../../repositories";
import { AMOUNT_OF_BLOCKS, getBlock, getBlocks } from "../../constants";
import { AMOUNT_OF_TRANSACTIONS, getTransactions } from "../../constants";

jest.mock("@blockr/blockr-logger");

let blockRepository: MongoBlockchainRepository;
let mongo: MongoMemoryServer;

beforeEach(async () => {
    mongo = new MongoMemoryServer();
    const uri = await mongo.getConnectionString();
    const database = await mongo.getDbName();

    const configuration: IClientConfiguration = {
        connectionString: uri,
        database,
    };
    blockRepository = new MongoBlockchainRepository(configuration);
});

afterEach(async () => {
    await mongo.stop();
});

describe("BlockchainRepository initialisation", () => {
    it("Should succeed with a valid configuration", () => {
        expect(blockRepository).toBeDefined();
    });
});

describe("BlockchainRepository", () => {
    describe("Adding a block", () => {
        it("Should succeed with a valid block", async () => {
            try {
                const result = await blockRepository.addBlockAsync(getBlock());
                expect(result).toBeUndefined();
            } catch {
                fail();
            }
        });

        it("Should succeed with a valid block containing transactions", async () => {
            const blockNumber = 432;
            const block = getBlock(blockNumber);
            block.transactions = getTransactions();

            await blockRepository.addBlockAsync(block);
            
            const query = {
                "blockHeader.blockNumber": blockNumber,
            };
            const result = await blockRepository.getBlocksByQueryAsync(query);

            expect(result[0].blockHeader.blockNumber).toBe(blockNumber);
            expect(result[0].transactions).toBeInstanceOf(Array);
            expect(result[0].transactions).toHaveLength(AMOUNT_OF_TRANSACTIONS);
        });

        it("Should fail with an invalid block", async () => {
            try {
                await blockRepository.addBlockAsync({} as Block);
                fail("Expected to throw an error because of an invalid Block");
            } catch (error) {
                expect(error.message).toContain("Block is empty");
            }
        });
    });

    describe("Adding multiple blocks", () => {
        it("Should succeed with valid blocks", async () => {
            try {
                const result = await blockRepository.addBlocksAsync(getBlocks());
                expect(result).toBeUndefined();
            } catch {
                fail();
            }
        });

        it("Should fail with an invalid block", async () => {
            try {
                const blocks: Block[] = getBlocks();
                blocks.push({} as Block);
                await blockRepository.addBlocksAsync(blocks);
                fail("Expected to throw an error because of an invalid Block");
            } catch (error) {
                expect(error.message).toContain("Block is empty");
            }
        });
    });

    describe("Get blocks", () => {
        beforeEach(async () => {
            blockRepository.addBlocksAsync(getBlocks());
        });

        it("Should retrieve all existing transactions when passing an empty query object", async () => {
            const result = await blockRepository.getBlocksByQueryAsync({});
            expect(result.length).toBe(AMOUNT_OF_BLOCKS);
        });

        it("Should retrieve all existing transactions corresponding with the passed query", async () => {
            const blockNumber: number = 999;
            const block = getBlock(blockNumber);
            await blockRepository.addBlockAsync(block);
            const query = {
                "blockHeader.blockNumber": blockNumber,
            };
            const result: Block[] = await blockRepository.getBlocksByQueryAsync(query);
            expect(result[0].blockHeader.blockNumber).toBe(blockNumber);
        });
    });

    describe("Prune blockchain",  () => {
        beforeEach(async () => {
            blockRepository.addBlocksAsync(getBlocks());
        });

        it("Should succeed", async () => {
            await blockRepository.pruneBlockchainAsync();

            const result = await blockRepository.getBlocksByQueryAsync();

            expect(result).toBeInstanceOf(Array);
            expect(result).toHaveLength(0);
        });
    });
});
