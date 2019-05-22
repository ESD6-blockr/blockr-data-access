export class EmptyModelException extends Error {
    constructor(message: string) {
        super(message);

        Object.setPrototypeOf(this, EmptyModelException.prototype);
    }
}
