import { NextFunction, Request, Response } from "express";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log('Something went wrong')
  console.log('err', err)
  res.status(401).send({
    message: err.message
  })
}