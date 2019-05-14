export class FilterException extends Error {
    constructor(message: string) {
        super(message);

        Object.setPrototypeOf(this, FilterException.prototype);
    }
}
