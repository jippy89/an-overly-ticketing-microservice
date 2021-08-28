import express, { Request, Response } from "express";
import { BadRequestError, NotFoundError, OrderStatus, requireAuth, validateRequest } from "@jiptickets/common";
import { body } from "express-validator";
import mongoose from "mongoose";
import { Ticket } from "../models/ticket";
import { Order } from "../models/order";

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
  const { ticketId } = req.body
  // Find the ticket
  const ticket = Ticket.findById(ticketId)
  if (!ticket) {
    throw new NotFoundError()
  }

  // Make sure the ticket is not reserved
  const existingOrder = Order.findOne({
    ticket: ticketId,
    $in: [
      OrderStatus.Created,
      OrderStatus.AwaitingPayment,
      OrderStatus.Complete
    ]
  }) 
  if (!existingOrder) {
    throw new BadRequestError('Ticket is already reserved')
  }

  // Calculate expiration date
  // Build the order and save it to database
  // Publish an event that order has been created
  res.send({})
})

export { router as newOrderRouter}