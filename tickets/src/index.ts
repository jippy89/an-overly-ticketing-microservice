import mongoose from 'mongoose'
import { app } from './app'
import { natsWrapper } from './nats-wrapper'

const start = async () => {
  const PORT = 3000
  if (!process.env.JWT_KEY) {
    throw new Error('`process.env.JWT_KEY variable is not set')
  }

  if (!process.env.MONGO_URI) {
    throw new Error('`process.env.MONGO_URI variable is not set')
  }

  try {
    await natsWrapper.connect('ticketing', 'asdfasd', 'http://nats-streaming-service-clusterip:4222')
    // Graceful Shutdown
    natsWrapper.client.on('close', () => {
      console.log('NATS Listener is closing...')
      process.exit()
    })
    process.on('SIGINT', () => natsWrapper.client.close())
    process.on('SIGTERM', () => natsWrapper.client.close())

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