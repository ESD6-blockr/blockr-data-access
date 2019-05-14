import { IModel } from "@blockr/blockr-models";
import { IClient } from "../../clients";
import { FilterException } from "../exceptions";

export class RepositoryOperations {
    public async filterCollectionByQueries<T, K>(collection: T[], queryable: K, queries: [string, string]): Promise<T[]> {
        let filteredCollection: T[] = [];

        for (let i = 0; i < queries.length; i++) {
            const field = queryable[queries[i][0]];
                        
            if (!field) {
                throw new FilterException("Field in query does not exists");
            }
        
            filteredCollection.push.apply(filteredCollection,
                (collection.filter(() => field === queries[i][1])));
        }

        return filteredCollection;
    }
}