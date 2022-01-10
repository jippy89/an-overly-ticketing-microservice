import { Listener, OrderCancelledEvent, Subjects } from "@jiptickets/common";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../models/ticket";
import { TicketUpdatedPublisher } from "../publisher/ticket-updated-publisher";
import { QueueGroupNames } from "./queue-group-name";


export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
	readonly subject = Subjects.OrderCancelled;
	queueGroupName = QueueGroupNames.TicketService

	async onMessage(data: OrderCancelledEvent['data'], msg: Message) {
		const ticket = await Ticket.findById(data.ticket.id)
		
		if(!ticket) {
			throw new Error(`Ticket ${data.ticket.id} not found`)
		}

		ticket.set({ orderId: undefined })
		await ticket.save()
		await new TicketUpdatedPublisher(this.client).publish({
			id: ticket.id,
			orderId: ticket.orderId,
			userId: ticket.userId,
			price: ticket.price,
			title: ticket.title,
			version: ticket.version
		})

		msg.ack()
	}
}