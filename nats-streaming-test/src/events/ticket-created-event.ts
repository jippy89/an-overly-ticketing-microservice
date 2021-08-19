import { Subjects } from "./subjects";
import { Event } from './event'

export interface TicketCreatedEvent extends Event {
  subject: Subjects.TicketCreated
  data: {
    id: string,
    title: string,
    price: number
  }
}