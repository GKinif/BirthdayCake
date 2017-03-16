// eslint-disable-next-line
export class InvalidTokenError extends Error {
    constructor(message) {
        super(message);
        this.message = message;
        this.name = 'InvalidTokenError';
    }
}
