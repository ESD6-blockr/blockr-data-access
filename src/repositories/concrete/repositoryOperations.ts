import { Block } from "@blockr/blockr-models";
import * as Mongo from "mongodb";
import { IClient } from "../../clients";
import { FilterException } from "../exceptions";

export class RepositoryOperations {
    public async getObjectByQueryAsync<T>(client: IClient<Mongo.Db>, tableName: string, queries: [string, string]): Promise<T[]> {
        try {
            const database = await client.connectAsync();
            const allObjects: T[] = database.collection(tableName);
            const filteredObjects: T[] = new Array();
            
            for (const query of queries) {
                let field = allObjects[0][query[0]];
                if (tableName === "blocks") {
                    field = (allObjects[0] as Block).blockHeader[query[0]];
                }
                            
                if (field) {
                    throw new FilterException("Field in query does not exists");
                }
            
                if (tableName === "blocks"){
                    filteredObjects.push.apply(filteredObjects,
                        (allObjects.filter((block) => (block as Block).blockHeader[query[0]] === query[1])));
                }

                if (tableName === "transactions"){
                    filteredObjects.push.apply(filteredObjects,
                        (allObjects.filter((transaction) => transaction[query[0]] === query[1])));
                }
            }

            return filteredObjects;
        } catch (error) {
            throw error;
        } finally {
            await client.disconnectAsync();
        }
    }
}