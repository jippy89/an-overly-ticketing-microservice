import express, { Request, Response } from "express";
import { BadRequestError, NotFoundError, OrderStatus, requireAuth, validateRequest } from "@jiptickets/common";
import { body } from "express-validator";
import mongoose from "mongoose";
import { Ticket } from "../models/ticket";
import { Order } from "../models/order";

const router = express.Router()

const EXPIRATION_WINDOW_SECONDS = 15 * 60

router.post('/api/orders', [
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
  const ticket = await Ticket.findById(ticketId)
  if (!ticket) {
    throw new NotFoundError()
  }

  // Make sure the ticket is not reserved
  const isReserved = await ticket.isReserved()
  if (isReserved) {
    throw new BadRequestError('Ticket is already reserved')
  }

  // Calculate expiration date
  const expiration = new Date()
  expiration.setSeconds(expiration.getSeconds() + EXPIRATION_WINDOW_SECONDS)

  // Build the order and save it to database
  const order = Order.build({
    userId: req.currentUser!.id,
    status: OrderStatus.Created,
    expiresAt: expiration,
    ticket
  })
  await order.save()

  // Publish an event that order has been created
  res.status(201).send(order)
})

export { router as newOrderRouter}