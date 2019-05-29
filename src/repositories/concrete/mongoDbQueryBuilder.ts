import { FieldDoesNotExistException } from "../../exceptions";
import { TypeNotImplementedException } from "../../exceptions";

export class MongoDbQueryBuilder {
    public rebuildQuery<T>(urlParams: object, exampleModel: T): object {
        const finalQuery: object[] = [];
        for (const queryKey of Object.keys(urlParams)) {
            try {
                const filter = {};
                const type: string = this.getTypeForKey(exampleModel, queryKey);
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

    private getTypeForKey<T>(model: T, path: string): string {
        const keyDepth = path.split(".");
        if (keyDepth.length === 1) {
            return model[keyDepth[0]].constructor.name;
        }
        for (const key of keyDepth) {
            if (key in model) {
                const type = typeof model[key];
                if (type === "object") {
                    model = model[key];
                    continue;
                }
                return model[key].constructor.name;
            }
        }

        throw new Error("Something went wrong!");
    }
}
