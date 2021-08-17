import nats, { Message } from 'node-nats-streaming'
import { randomBytes } from 'crypto'
console.clear()

const stan = nats.connect('ticketing', randomBytes(4).toString('hex'), {
  url: 'http://localhost:4222'
})

stan.on('connect', () => {
  console.log('Listener connected to NATS')

  stan.on('close', () => {
    console.log('NATS Listener is closing...')
    process.exit()
  })

  const options = stan.subscriptionOptions()
    .setManualAckMode(true)
    .setDeliverAllAvailable()
  /**
   * The first argument makes you listen to a "Channel" or "Topic"
   * The second argument includes you to a certain "Queue Group"
   *   So if 1 data coming it will only be received by 1 service. And not multiple.
   * The third argument is an option
   */
  const subscription = stan.subscribe('ticket:created', options)

  subscription.on('message', (msg: Message) => {
    const data = msg.getData()

    if (typeof data === 'string') {
      console.log(`Receved event ${msg.getSequence()}:`, JSON.parse(data))
    }
    // The following method is important when `setManualAckMode` is true.
    // Otherwise NATS Server will not know whether the message has been received or not.
    msg.ack()
  })
})

// On program interruption (like CTRL + C)
process.on('SIGINT', () => stan.close())
// On program termination
process.on('SIGTERM', () => stan.close())