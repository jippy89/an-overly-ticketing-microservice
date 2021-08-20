import { Subjects, Publisher, TicketCreatedEvent } from '@jiptickets/common'

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated
}