import { CustomError } from "../classes/abstracts/custom-error"

export  class ConflictError extends CustomError {
  statusCode = 409

  constructor (message: string) {
    super(message)
  }

  serializeErrors () {
    return [
      { message: this.message }
    ]
  }
}