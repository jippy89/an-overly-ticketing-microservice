import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'

interface UserPayload {
  id: string,
  email: string
}

// This is how you modify or add properties
// Tells Typescript inside the Express project, find "Request" interface, and add additional property to it
declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload
    }
  }
}

export const currentUser = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session?.jwt) {
    return next()
  }

  
  try {
    const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!) as UserPayload
    req.currentUser = payload
  } catch (e) {
  }

  next()
}