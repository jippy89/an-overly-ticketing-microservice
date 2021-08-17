import nats, { Message } from 'node-nats-streaming'
import { randomBytes } from 'crypto'
console.clear()

const stan = nats.connect('ticketing', randomBytes(4).toString('hex'), {
  url: 'http://localhost:4222'
})

stan.on('connect', () => {
  console.log('Listener connected to NATS')

  /**
   * The first argument makes you listen to a "Channel" or "Topic"
   * The second argument includes you to a certain "Queue Group"
   *   So if 1 data coming it will only be received by 1 service. And not multiple.
   */
  const subscription = stan.subscribe('ticket:created', 'order-service-queue-group')

  subscription.on('message', (msg: Message) => {
    const data = msg.getData()

    if (typeof data === 'string') {
      console.log(`Receved event ${msg.getSequence()}:`, JSON.parse(data))
    }
  })
})