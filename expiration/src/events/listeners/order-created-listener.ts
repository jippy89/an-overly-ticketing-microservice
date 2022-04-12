import { Listener, OrderCreatedEvent, Subjects } from '@jiptickets/common'
import { Message } from 'node-nats-streaming'
import { expirationQueue } from '../../queues/expiration-queue'
import { QueueGroupNames } from './queue-group-name'

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated
  queueGroupName = QueueGroupNames.ExpirationService

  async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
    // logic to mark the order as complete
    console.log('Event data', data)

    await expirationQueue.add({
      orderId: data.id
    })

    msg.ack()
  }
}