import express, { Request, Response } from "express";
import { requireAuth, validateRequest } from "@jiptickets/common";
import { body } from "express-validator";
import mongoose from "mongoose";

const router = express.Router()

router.get('/api/orders', [
  requireAuth,
  body('ticketId')
    .not()
    .isEmpty()
    .withMessage(`'ticketId' is empty`)
    .custom((input:string) => mongoose.isValidObjectId(input)),
  validateRequest
] , async (req: Request, res: Response) => {
  res.send({})
})

export { router as newOrderRouter}