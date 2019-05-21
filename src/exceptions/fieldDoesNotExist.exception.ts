export class FieldDoesNotExistException extends Error {
    constructor(message: string) {
        super(message);

        Object.setPrototypeOf(this, FieldDoesNotExistException.prototype);
    }
}
