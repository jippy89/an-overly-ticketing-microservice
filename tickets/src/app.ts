import express from 'express'
import 'express-async-errors'
import cookieSession from 'cookie-session'
import { errorHandler, NotFoundError } from '@jiptickets/common'

const app = express()

import { createTicketRouter } from './routes/new'

app.set('trust proxy', true)
app.use(express.json())
app.use(cookieSession({
  signed: false,
  secure: process.env.NODE_ENV !== 'test'
}))

app.use(createTicketRouter)

app.all('*', async () => {
  throw new NotFoundError()
})

app.use(errorHandler)

export { app }