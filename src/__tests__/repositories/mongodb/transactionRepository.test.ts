import { Transaction, TransactionType } from "@blockr/blockr-models";
import { MongoMemoryServer } from "mongodb-memory-server";
import { IClientConfiguration } from "../../..";
import { MongoBlockchainRepository, MongoTransactionRepository } from "../../../repositories";
import { AMOUNT_OF_BLOCKS, getBlock, getBlocks } from "../../constants";
import { AMOUNT_OF_TRANSACTIONS, getTransactions } from "../../constants";

jest.mock("@blockr/blockr-logger");

let transactionRepository: MongoTransactionRepository;
let blockChainRepository: MongoBlockchainRepository;
let mongo: MongoMemoryServer;

beforeEach(async () => {
    mongo = new MongoMemoryServer();
    const uri = await mongo.getConnectionString();
    const database = await mongo.getDbName();

    const configuration: IClientConfiguration = {
        connectionString: uri,
        database,
    };
    transactionRepository = new MongoTransactionRepository(configuration);
    blockChainRepository = new MongoBlockchainRepository(configuration);
});

afterEach(async () => {
    await mongo.stop();
});

describe("TransactionRepository initialisation", () => {
    it("Should succeed with a valid configuration", () => {
        expect(transactionRepository).not.toBeUndefined();
    });
});

describe("TransactionRepository", () => {
    describe("Get transactions", () => {
        beforeEach(async () => {
            const blocks = getBlocks();

            for (const block of blocks) {
                block.transactions = getTransactions();
            }

            await blockChainRepository.addBlocksAsync(blocks);
        });
        
        it("Should retrieve all existing transactions without a query", async () => {
             const result = await transactionRepository.getTransactionsByQueryAsync();
             
             expect(result).toBeInstanceOf(Array);
             expect(result).toHaveLength(AMOUNT_OF_TRANSACTIONS * AMOUNT_OF_BLOCKS);
        });

        it("Should retrieve the transactions with an query", async () => {
            const block = getBlock();
            block.transactions = [new Transaction(TransactionType.COIN, "key", "key", 1, new Date())];
            
            await blockChainRepository.addBlockAsync(block);

            const query = {
                "transactions.recipientKey": "key",
            };
            const result = await transactionRepository.getTransactionsByQueryAsync(query);
            
            expect(result).toBeInstanceOf(Array);
            expect(result).toHaveLength(block.transactions.length);
        });
    });
});
