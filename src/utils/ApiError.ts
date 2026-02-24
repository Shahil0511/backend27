export class ApiError extends Error {
    public statusCode: number;
    public isOperational: boolean;

    constructor(statusCode = 500, message = 'Internal Server Error') {
        super(message);
        this.name = 'ApiError';
        this.statusCode = statusCode;
        this.isOperational = true;
        if (Error.captureStackTrace) Error.captureStackTrace(this, this.constructor);
    }

    toJSON() {
        return { statusCode: this.statusCode, message: this.message };
    }
}