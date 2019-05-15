import { FieldDoesNotExist } from "../../exceptions/fieldDoesNotExist.exeception";
import { TypeNotImplementedException } from "../../exceptions/typeNotImplemented.exception";

export class MongoDbQueryBuilder {
    public rebuildQuery<T>(urlParams: object, exampleModel: T): object {
        const finalQuery: object[] = [];

        for (const queryKey of Object.keys(urlParams)) {
            try {
                const type = exampleModel[queryKey].constructor.name;
                const filer = {};
                switch (type) {
                    case "Number":
                        filer[queryKey] = parseFloat(urlParams[queryKey]);
                        finalQuery.push(filer);
                        break;
                    case "Date":
                        filer[queryKey] = urlParams[queryKey];
                        finalQuery.push(filer);
                        break;
                    case "String":
                        filer[queryKey] = urlParams[queryKey];
                        finalQuery.push(filer);
                        break;
                    default:
                        throw new TypeNotImplementedException(`Type: ${type} has not been implemented on: ${queryKey}`);
                }
            } catch (err) {
                throw new FieldDoesNotExist(`Field: ${queryKey} does not exist on: ${exampleModel.constructor.name}`);
            }
        }

        return finalQuery.length < 1 ? {} : { $and: finalQuery };
    }
}
