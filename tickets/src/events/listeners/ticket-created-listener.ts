import { Message } from 'node-nats-streaming'
import { Subjects, Listener, TicketCreatedEvent } from '@jiptickets/common'
import { Ticket } from '../../models/ticket'
import { QueueGroupNames } from './queue-group-names'

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated
  queueGroupName = QueueGroupNames.OrderService

  async onMessage(data: TicketCreatedEvent['data'], msg: Message) {
    const { id, title, price } = data
    const ticket = Ticket.build({
      id, title, price
    })
    await ticket.save()
    msg.ack()
  }
}