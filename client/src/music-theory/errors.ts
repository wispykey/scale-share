
export class InvalidMajorKeyError extends Error {
    constructor(tonic: string) {
        super(`Invalid major key: ${tonic} major`);
        this.name = 'InvalidMajorKeyError';
    }
}

export class InvalidMinorKeyError extends Error {
    constructor(tonic: string) {
        super(`Invalid minor key: ${tonic} minor`);
        this.name = 'InvalidMinorKeyError';
    }
}