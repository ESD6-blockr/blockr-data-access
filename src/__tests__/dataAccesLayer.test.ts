import { DataAccessLayer } from "../dataAccessLayer";
import { DataSource } from "../clients";
import { IClientConfiguration } from "../configurations";
import { Block, BlockHeader, Transaction, TransactionType, State } from "@blockr/blockr-models";
import { MongoMemoryServer } from 'mongodb-memory-server-core';

jest.mock("@blockr/blockr-logger");

const mongod = new MongoMemoryServer();

const getBlock = (): Block => {
    const blockNumer = Math.floor(Math.random() * 1000) + 1;
    const amount = Math.floor(Math.random() * 100) + 11;
    
    const blockHeader: BlockHeader = new BlockHeader("1", blockNumer, new Date(), amount);
    return new Block(blockHeader, new Set());
}

const getTransaction = (): Transaction => {
    const amount = Math.floor(Math.random() * 1000) + 1;
    return new Transaction(TransactionType.COIN, "recipient", "sender", amount, new Date());
};

const getState = (publicKey?: string): State => {
    const coin =  Math.floor(Math.random() * 1000) + 1;
    const stake =  Math.floor(Math.random() * 1000) + 1;
    publicKey = publicKey || "public";
    return new State(publicKey, coin, stake);
};

describe("DataAccesLayer with DataSource MongoDB", () => {
    let mongodbDataAccesLayer: DataAccessLayer;

    beforeAll(async (done) => {
        const uri = await mongod.getConnectionString();

        const configuration: IClientConfiguration = {
            connectionString: uri,
            database: "database"
        }
        mongodbDataAccesLayer = new DataAccessLayer(DataSource.MONGO_DB, configuration);
        expect(mongodbDataAccesLayer).not.toBeUndefined();
        done();
    });
    
    it("Should still be instanciated", () => {
        expect(mongodbDataAccesLayer).not.toBeUndefined();
    });

    it("Should add a block", () => {
        const result = mongodbDataAccesLayer.addBlockAsync(getBlock());
        expect(result).toBeInstanceOf(Promise);
    });

    it("Should add multiple blocks", () => {
        const blocks: Block[] = [];
        for (let i = 0; i < 5; i++) {
            blocks.push(getBlock());
        }
        const result = mongodbDataAccesLayer.addBlocksAsync(blocks);
        expect(result).toBeInstanceOf(Promise);
    });

    it("Shoud get blocks by query", async () => {
        // TODO: The getBlocksByQueryAsync method isn't working right now @dane had an idea on how to fix this
        const block: Block = getBlock();
        await mongodbDataAccesLayer.addBlockAsync(block);
        const result = await mongodbDataAccesLayer.getBlocksByQueryAsync({});
        expect(result.length).toBeGreaterThan(1);
    });

    it("Should add a transaction", () => {
        const result = mongodbDataAccesLayer.addTransactionAsync(getTransaction());
        expect(result).toBeInstanceOf(Promise);
    })

    it("Shoud get blocks by query", async () => {
        const transaction: Transaction = getTransaction();
        await mongodbDataAccesLayer.addTransactionAsync(transaction);
        const result = await mongodbDataAccesLayer.getTransactionsByQueryAsync({
            amount: transaction.amount
        });
        expect(result.length).toBe(1);
    });
    
    it("Should set states", () => {
        const states: State[] = [];
        for (let i = 0; i < 5; i++) {
            states.push(getState());
        }
        const result = mongodbDataAccesLayer.setStatesAsync(states);
        expect(result).toBeInstanceOf(Promise);
    });

    it("Should get states", async () => {
        const result = await mongodbDataAccesLayer.getStatesAsync();
        expect(result.length).toBe(5);
    });

    it("Should get states", async () => {
        const state: State = getState("PublicKeyForThisTest");
        await mongodbDataAccesLayer.setStatesAsync([state]);
        const retrievedState: State = await mongodbDataAccesLayer.getStateAsync(state.publicKey);
        expect(retrievedState.publicKey).toBe(state.publicKey);
    });
});

describe("DataAccesLayer with DataSource LevelDB", () => {
    it("Should not be iplemented yet", () => {
        const configuration: IClientConfiguration = {
            connectionString: "...",
            database: "..."
        }
        try {
            new DataAccessLayer(DataSource.LEVEL_DB, configuration);
            fail("No errors were thrown");
        } catch (error) {
            expect(error.message).toContain("Not yet implemented");
        }
    });
});
