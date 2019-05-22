import { MongoDbQueryBuilder } from "../../../repositories/concrete/mongoDbQueryBuilder";

jest.mock("@blockr/blockr-logger");

const queryBuilder: MongoDbQueryBuilder = new MongoDbQueryBuilder();
const exampleObject = {
    date: new Date(),
    name: "exampleString",
    number: 123,
};

describe("QueryBuilder", () => {
    it("Should pass empty query when none is passed", () => {
        const outputQuery = queryBuilder.rebuildQuery({}, {});
        expect(outputQuery).toStrictEqual({});
    });

    it("Should create query with the right type", () => {
        const inputQuery = {
            name: "exampleString",
        };

        const expectedOutputQuery = {
            $and: [
                {
                    name: "exampleString",
                },
            ],
        };

        const outputQuery = queryBuilder.rebuildQuery(inputQuery, exampleObject);

        expect(outputQuery).toStrictEqual(expectedOutputQuery);
    });

    it("Should create query with different types (multiple)", () => {
        const inputQuery = {
            name: "exampleString",
            number: "123",
        };

        const expectedOutputQuery = {
            $and: [
                {
                    name: "exampleString",
                },
                {
                    number: 123,
                },
            ],
        };

        const outputQuery = queryBuilder.rebuildQuery(inputQuery, exampleObject);

        expect(outputQuery).toStrictEqual(expectedOutputQuery);
    });

    it("Should throw error when field does not exist on exampleObject", () => {
        const inputQuery = {
            notExistingField: "...",
        };

        try {
            queryBuilder.rebuildQuery(inputQuery, exampleObject);
        } catch (error) {
            expect(error.message).toContain("does not exist on");
        }
    });

    it("Should throw error when type is not implemented", () => {
        const exampleObjectTest = {
            promise: {},
        };

        const inputQuery = {
            promise: "...",
        };

        try {
            queryBuilder.rebuildQuery(inputQuery, exampleObjectTest);
        } catch (error) {
            expect(error.message).toContain("has not been implemented on");
        }
    });
});
