import { Block, State } from "@blockr/blockr-models";
import { MongoMemoryServer } from "mongodb-memory-server";
import { IClientConfiguration } from "../../..";
import { MongoBlockchainRepository, MongoStateRepository } from "../../../repositories";
import { AMOUNT_OF_STATES, getState, getStates } from "../../constants/stateRepository.constants";

jest.mock("@blockr/blockr-logger");

let stateRepository: MongoStateRepository;
let mongo: MongoMemoryServer;

beforeEach(async () => {
    mongo = new MongoMemoryServer();
    const uri = await mongo.getConnectionString();
    const database = await mongo.getDbName();

    const configuration: IClientConfiguration = {
        connectionString: uri,
        database,
    };
    stateRepository = new MongoStateRepository(configuration);
});

afterEach(async () => {
    await mongo.stop();
});

describe("StateRepository initialisation", () => {
    it("Should succeed with a valid configuration", () => {
        expect(stateRepository).not.toBeUndefined();
    });
});

describe("StateRepository", () => {
    it("Should set states", async () => {
        const result = await stateRepository.setStatesAsync(getStates());
        expect(result).toBeUndefined();
    });

    it("Should get states", async () => {
        await stateRepository.setStatesAsync(getStates());
        const result = await stateRepository.getStatesAsync();
        expect(result.length).toBe(AMOUNT_OF_STATES);
    });

    it("Should get states", async () => {
        const state: State = getState("PublicKeyForThisTest");
        await stateRepository.setStatesAsync([state]);
        const retrievedState: State = await stateRepository.getStateAsync(state.publicKey);
        expect(retrievedState.publicKey).toBe(state.publicKey);
    });

    
});
