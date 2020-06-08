import { ValidationError } from 'express-validator';
import { CustomError } from './custom-error';

export class RequestValidationError extends CustomError{
    statusCode = 400;
    constructor(public errors: ValidationError[]){
        super('request template validation error');
        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }
   
    serializeError(){
        return this.errors.map(error => {
            return { message: error.msg, field: error.param}
        });

    }

}