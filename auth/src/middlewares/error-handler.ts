import { NextFunction, Request, Response } from "express";
import { DatabaseConnectionError } from '../errors/database-connection-error'
import { CustomError } from "../classes/abstracts/custom-error";
import { ErrorMessage } from "../interfaces/error-response";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  const errorResponses: { errors: ErrorMessage[] } = { errors: [] }

  if (err instanceof CustomError) {
    const formattedErrors: ErrorMessage[] = err.serializeErrors()
    return res.status(err.statusCode).send({ errors: formattedErrors })
  }

  errorResponses.errors = [
    { message: 'Something went wrong' }
  ]

  res.status(501).send(errorResponses)
}