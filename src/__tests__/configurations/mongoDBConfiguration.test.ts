import "reflect-metadata";

import { MongoDBConfiguration } from "../../configurations";
import { CONNECTION_STRING, DATABASE } from "../constants";

describe("MongoDBConfiguraion", () => {
    it("Should instantsiate with valid parameters", () => {
        const config = new MongoDBConfiguration(CONNECTION_STRING, DATABASE);
        expect(config).toBeInstanceOf(MongoDBConfiguration);
    });
});
