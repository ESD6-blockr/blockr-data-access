import { FieldDoesNotExistException } from "../../exceptions/fieldDoesNotExist.exeception";
import { TypeNotImplementedException } from "../../exceptions/typeNotImplemented.exception";

export class MongoDbQueryBuilder {
    public rebuildQuery<T>(urlParams: object, exampleModel: T): object {
        const finalQuery: object[] = [];

        for (const queryKey of Object.keys(urlParams)) {
            try {
                const type = exampleModel[queryKey].constructor.name;
                const filter = {};
                switch (type) {
                    case "Number":
                        filter[queryKey] = parseFloat(urlParams[queryKey]);
                        finalQuery.push(filter);
                        break;
                    case "Date":
                        filter[queryKey] = urlParams[queryKey];
                        finalQuery.push(filter);
                        break;
                    case "String":
                        filter[queryKey] = urlParams[queryKey];
                        finalQuery.push(filter);
                        break;
                    default:
                        throw new TypeNotImplementedException(`Type: ${type} has not been implemented on: ${queryKey}`);
                }
            } catch (error) {
                if (error.message.indexOf("Type") > -1) {
                    throw error;
                }
                throw new FieldDoesNotExistException(`Field: ${queryKey} does not exist on:
                                                        ${exampleModel.constructor.name}`);
            }
        }

        return finalQuery.length === 0 ? { } : { $and: finalQuery };
    }
}
