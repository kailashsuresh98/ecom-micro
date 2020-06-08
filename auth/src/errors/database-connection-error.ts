import { CustomError } from './custom-error';

export class DatabaseConnectionError extends CustomError {
    statusCode = 500;
    reason = "Database Connection error";
    constructor(){
        super('DB connection error');
        Object.setPrototypeOf(this, DatabaseConnectionError.prototype)
    }
    serializeError(){
        return [
            {
                message: this.reason
            }
        ]
    };
}