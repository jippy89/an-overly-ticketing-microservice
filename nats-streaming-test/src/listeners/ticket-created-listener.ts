import { Message } from "node-nats-streaming"
import { Listener, Subjects, TicketCreatedEvent } from "@jiptickets/common"

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  readonly subject: Subjects.TicketCreated = Subjects.TicketCreated
  queueGroupName = 'payments-service'
  onMessage(data: TicketCreatedEvent['data'], msg: Message): void {
    console.log('Event Data:', data)

    msg.ack()
  }
}