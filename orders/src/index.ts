import mongoose from 'mongoose'
import { app } from './app'
import { natsWrapper } from './nats-wrapper'
import { TicketCreatedListener } from './events/listeners/ticket-created-listener'
import { TicketUpdatedListener } from './events/listeners/ticket-updated-listener'
import { ExpirationCompleteListener } from './events/listeners/expiration-complete-listener'

const start = async () => {
  const PORT = 3000
  if (!process.env.JWT_KEY) {
    throw new Error('`process.env.JWT_KEY variable is not set')
  }

  if (!process.env.MONGO_URI) {
    throw new Error('`process.env.MONGO_URI variable is not set')
  }

  // Check NATS env variables
  if (!process.env.NATS_CLUSTER_ID) {
    throw new Error('`process.env.NATS_CLUSTER_ID variable is not set')
  }
  if (!process.env.NATS_CLIENT_ID) {
    throw new Error('`process.env.NATS_CLIENT_ID variable is not set')
  }
  if (!process.env.NATS_URL) {
    throw new Error('`process.env.NATS_URL variable is not set')
  }

  try {
    await natsWrapper.connect(process.env.NATS_CLUSTER_ID,process.env.NATS_CLIENT_ID, process.env.NATS_URL)
    // Graceful Shutdown
    natsWrapper.client.on('close', () => {
      console.log('NATS Listener is closing...')
      process.exit()
    })
    process.on('SIGINT', () => natsWrapper.client.close())
    process.on('SIGTERM', () => natsWrapper.client.close())

    new TicketCreatedListener(natsWrapper.client).listen()
    new TicketUpdatedListener(natsWrapper.client).listen()
    new ExpirationCompleteListener(natsWrapper.client).listen()

    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })
    console.log('Connected to MongoDB')
  } catch (err) {
    console.error(err)
  }

  app.listen(PORT, () => {
    console.log('Listening on port: ' + PORT)
  })
}

start()