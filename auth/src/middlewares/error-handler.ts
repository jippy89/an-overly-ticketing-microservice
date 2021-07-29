import { NextFunction, Request, Response } from "express";
import { DatabaseConnectionError } from '../errors/database-connection-error'
import { RequestValidationError } from '../errors/request-validation-error'
import { ErrorMessage } from "../interfaces/error-response";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  const errorResponses: { errors: ErrorMessage[] } = { errors: [] }

  if (err instanceof RequestValidationError) {
    const formattedErrors: ErrorMessage[] = err.serializeErrors()
    return res.status(err.statusCode).send({ errors: formattedErrors })
  }

  if (err instanceof DatabaseConnectionError) {
    errorResponses.errors = err.serializeErrors()
    return res.status(err.statusCode).send(errorResponses)
  }

  errorResponses.errors = [
    { message: 'Something went wrong' }
  ]

  res.status(501).send(errorResponses)
}