import express, { Request, Response } from "express";
import { requireAuth } from "@jiptickets/common";

const router = express.Router()

router.post('/api/tickets', [
  requireAuth
], (req: Request, res: Response) => {
  res.send({})
})

export { router as createTicketRouter }