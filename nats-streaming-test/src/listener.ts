import nats from 'node-nats-streaming'
import { randomBytes } from 'crypto'
import { TicketCreatedListener } from './listeners/ticket-created-listener'
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

  new TicketCreatedListener(stan).listen()
})

// On program interruption (like CTRL + C)
process.on('SIGINT', () => stan.close())
// On program termination
process.on('SIGTERM', () => stan.close())