export interface ErrorMessage {
  message: string,
  field?: string
}

export interface CommonError extends Error {
  serializeErrors: () => ErrorMessage[]
}