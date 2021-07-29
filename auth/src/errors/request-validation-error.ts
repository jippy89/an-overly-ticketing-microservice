import { ValidationError } from "express-validator";
import { CommonError } from "../interfaces/error-response";

export class RequestValidationError extends Error implements CommonError {
  statusCode = 400
  
  constructor(public errors: ValidationError[]) {
    super()

    // Only because we are extending a built-in class
    Object.setPrototypeOf(this, RequestValidationError.prototype)
  }

  serializeErrors () {
    return this.errors.map(error => {
      return { message: error.msg, field: error.param }
    })
  }
}