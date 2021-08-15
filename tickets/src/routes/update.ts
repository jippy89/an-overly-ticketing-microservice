import { NotFoundError, requireAuth } from '@jiptickets/common'
import express, { Request, Response } from 'express'
import { Ticket } from '../models/ticket'

const router = express.Router()

router.put('/api/tickets/:id', [
  requireAuth,
], async (req: Request, res: Response) => {
  const foundTicket = await Ticket.findById(req.params.id)

  if (!foundTicket) {
    throw new NotFoundError()
  }

  res.send(foundTicket)
})

export { router as updateTicketRouter }