export class FieldDoesNotExist extends Error {
    constructor(message: string) {
        super(message);

        Object.setPrototypeOf(this, FieldDoesNotExist.prototype);
    }
}
