import { Subjects, ExpirationCompleteEvent, Listener, OrderStatus } from '@jiptickets/common'
import { Message } from 'node-nats-streaming'
import { Order } from '../../models/order'
import { QueueGroupNames } from './queue-group-names'
import { OrderCancelledPublisher } from '../publishers/order-cancelled-publisher'

export class ExpirationCompleteListener extends Listener<ExpirationCompleteEvent> {
  readonly subject = Subjects.ExpirationComplete
  queueGroupName = QueueGroupNames.OrderService

  async onMessage(data: ExpirationCompleteEvent['data'], msg: Message) {
    const order = await Order.findById(data.orderId).populate('ticket')

    if (!order) {
      throw new Error('Order not found')
    }

    // If it's completed, logically just don't do anything.
    if (order.status === OrderStatus.Complete) {
      return msg.ack()
    }

    order.set({
      status: OrderStatus.Cancelled
    })
    await order.save()
    await new OrderCancelledPublisher(this.client).publish({
      id: order.id,
      version: order.version,
      ticket: {
        id: order.ticket.id
      }
    })

    msg.ack()
  }
}