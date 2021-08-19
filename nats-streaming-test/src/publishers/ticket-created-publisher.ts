import { Publisher } from "../classes/Publisher"
import { TicketCreatedEvent } from "../events/ticket-created-event"
import { Subjects } from "../events/subjects"

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated
}