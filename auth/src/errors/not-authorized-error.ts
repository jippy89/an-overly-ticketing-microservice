import { CustomError } from "../classes/abstracts/custom-error";
import { ErrorMessage } from "../interfaces/error-response";

export class NotAuthorizedError extends CustomError {
  statusCode = 401

  constructor() {
    super('Unauthorized access')
  }
  
  serializeErrors(): ErrorMessage[] {
    return [
      { message: this.message }
    ]
  }
  
}