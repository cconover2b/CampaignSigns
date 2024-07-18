export class GoogleMapsError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'GoogleMapsError';
    }
}

export class MarkerLibraryError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'MarkerLibraryError';
    }
}

export class UnknownError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'UnknownError';
    }
}