import { NotFoundError } from '@jiptickets/common'
import express, { Request, Response } from 'express'
import { Ticket } from '../models/ticket'

const router = express.Router()

router.get('/api/tickets/:id', async (req: Request, res: Response) => {
  const foundTicket = await Ticket.findById(req.params.id)

  if (!foundTicket) {
    throw new NotFoundError()
  }

  return res.send(foundTicket)
})

export { router as showTicketRouter }