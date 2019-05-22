export class TypeNotImplementedException extends Error {
    constructor(message: string) {
        super(message);

        Object.setPrototypeOf(this, TypeNotImplementedException.prototype);
    }
}
