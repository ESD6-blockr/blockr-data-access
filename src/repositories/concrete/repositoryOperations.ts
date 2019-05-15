import { FilterException } from "../exceptions";

export class RepositoryOperations {
    public async filterCollectionByQueries<T, K>(collection: T[],
                                                 queryable: K,
                                                 queries: object): Promise<T[]> {
        const filteredCollection: T[] = [];

        Object.keys(queries).forEach((queryKey) => {
            const field = queryable[queryKey];

            if (!field) {
                throw new FilterException("Field in query does not exists");
            }

            filteredCollection.push.apply(filteredCollection,
                (collection.filter(() => field === queries[queryKey])));
        });

        return filteredCollection;
    }
}
