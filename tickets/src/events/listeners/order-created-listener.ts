import { Listener, OrderCreatedEvent, Subjects } from "@jiptickets/common";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../models/ticket";
import { QueueGroupNames } from "./queue-group-name";
import { TicketUpdatedPublisher } from "../publisher/ticket-updated-publisher";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated

  queueGroupName = QueueGroupNames.TicketService

  async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
    // Find the ticket that the order is reserving
    const ticket = await Ticket.findById(data.ticket.id)

    // If no ticket, throw error
    if (!ticket) {
      throw new Error('Ticket not found')
    }

    // Mark the ticket as being reserved by setting its `orderId` property
    ticket.set({ orderId: data.id })

    // Save the ticket
    await ticket.save()
    await new TicketUpdatedPublisher(this.client).publish({
      id: ticket.id,
      price: ticket.price,
      title: ticket.title,
      userId: ticket.userId,
      orderId: ticket.orderId,
      version: ticket.version
    })

    // Ack the message
    msg.ack()
  }
}