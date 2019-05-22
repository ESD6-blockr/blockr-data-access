import { Transaction } from "@blockr/blockr-models";
import { MongoMemoryServer } from "mongodb-memory-server";
import { IClientConfiguration } from "../../..";
import { MongoTransactionRepository } from "../../../repositories";
import * as TRC from "../../constants/transactionRepository.constants";

jest.mock("@blockr/blockr-logger");

let transactionRepository: MongoTransactionRepository;
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
    describe("Adding a transaction", () => {
        it("Should succeed with a valid transaction", async () => {
            try {
                const result = await transactionRepository.addTransactionAsync(TRC.getTransaction());
                expect(result).toBeUndefined();
            } catch {
                fail();
            }
        });

        it("Should fail with an invalid transaction", async () => {
            try {
                await transactionRepository.addTransactionAsync({} as Transaction);
                fail("Expected to throw an error because of an invalid Transaction");
            } catch (error) {
                expect(error.message).toContain("Transaction is empty");
            }
        });
    });

    describe("Get transactions", () => {
        beforeEach(async () => {
            for (const transaction of TRC.getTransactions()) {
                await transactionRepository.addTransactionAsync(transaction);
            }
        });
        it("Should retrieve all existing transactions when passing an empty query object", async () => {
             const result = await transactionRepository.getTransactionsByQueryAsync({});
             expect(result.length).toBe(TRC.AMOUNT_OF_TRANSACTIONS);
        });
    });
});
