import { BadRequestError, NotAuthorizedError, NotFoundError, requireAuth, validateRequest } from '@jiptickets/common'
import express, { Request, Response } from 'express'
import { body } from 'express-validator'
import { Ticket } from '../models/ticket'
import { TicketUpdatedPublisher } from '../events/publisher/ticket-updated-publisher'
import { natsWrapper } from '../nats-wrapper'

const router = express.Router()

router.put('/api/tickets/:id', [
  requireAuth,
  body('title')
    .not()
    .isEmpty()
    .withMessage('Title is not required'),
  body('price')
    .isFloat({ gt: 0 })
    .withMessage('Price must be provided and must be greater than 0'),
  validateRequest
], async (req: Request, res: Response) => {
  const foundTicket = await Ticket.findById(req.params.id)

  if (!foundTicket) {
    throw new NotFoundError()
  }

  if (foundTicket.orderId) {
    throw new BadRequestError('Cannot edit a reserved ticket')
  }

  if (foundTicket.userId !== req.currentUser!.id) {
    throw new NotAuthorizedError()
  }

  foundTicket.set({
    title: req.body.title,
    price: req.body.price
  })
  await foundTicket.save()
  new TicketUpdatedPublisher(natsWrapper.client).publish({
    id: foundTicket.id,
    title: foundTicket.title,
    price: foundTicket.price,
    userId: foundTicket.userId,
    version: foundTicket.version
  })

  res.send(foundTicket)
})

export { router as updateTicketRouter }