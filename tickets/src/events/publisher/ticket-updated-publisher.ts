import { Subjects, Publisher, TicketUpdatedEvent } from '@jiptickets/common'

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated
}