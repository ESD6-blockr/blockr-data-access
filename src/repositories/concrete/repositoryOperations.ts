import { FilterException } from "../exceptions";

export class RepositoryOperations {
    public async filterCollectionByQueries<T, K>(collection: T[],
                                                 queryable: K,
                                                 queries: [string, string]): Promise<T[]> {
        const filteredCollection: T[] = [];

        for (const query of queries) {
            const field = queryable[query[0]];
                        
            if (!field) {
                throw new FilterException("Field in query does not exists");
            }
        
            filteredCollection.push.apply(filteredCollection,
                (collection.filter(() => field === query[1])));
        }

        return filteredCollection;
    }
}
