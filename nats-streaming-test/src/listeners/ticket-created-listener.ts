import { Message } from "node-nats-streaming"
import { Listener } from "../classes/Listener"

export class TicketCreatedListener extends Listener {
  subject = 'ticket:created'
  queueGroupName = 'payments-service'
  onMessage(data: any, msg: Message): void {
    console.log('Event Data:', data)

    msg.ack()
  }
}