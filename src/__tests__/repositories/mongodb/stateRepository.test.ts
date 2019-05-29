import { State } from "@blockr/blockr-models";
import { MongoMemoryServer } from "mongodb-memory-server";
import { IClientConfiguration } from "../../..";
import { MongoStateRepository } from "../../../repositories";
import { AMOUNT_OF_STATES, getState, getStates, PUBLIC_KEY } from "../../constants";

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

    it("Should get single state by a valid key", async () => {
        const state = getState(PUBLIC_KEY);
        await stateRepository.setStatesAsync([state]);

        const result = await stateRepository.getStateAsync(PUBLIC_KEY);
        
        expect(result).toBeInstanceOf(State);
        expect((result as State).coin).toBe(state.coin);
        expect((result as State).publicKey).toBe(state.publicKey);
        expect((result as State).stake).toBe(state.stake);
    });

    it("Should fail to get state with an invalid key", async () => {
        const state = getState(PUBLIC_KEY);
        await stateRepository.setStatesAsync([state]);
       
        const result = await stateRepository.getStateAsync(`${PUBLIC_KEY}-INVALID`);
     
        expect(result).toBeUndefined();
    });
  
    it("Should get states", async () => {
        await stateRepository.setStatesAsync(getStates());
        const result = await stateRepository.getStatesAsync();
        expect(result.length).toBe(AMOUNT_OF_STATES);
    });
});
