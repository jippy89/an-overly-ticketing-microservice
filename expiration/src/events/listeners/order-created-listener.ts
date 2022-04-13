import { Listener, OrderCreatedEvent, Subjects } from '@jiptickets/common'
import { Message } from 'node-nats-streaming'
import { expirationQueue } from '../../queues/expiration-queue'
import { QueueGroupNames } from './queue-group-name'

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated
  queueGroupName = QueueGroupNames.ExpirationService

  async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
    const delay = new Date(data.expiresAt).getTime() - new Date().getTime()
    console.log("Waiting this miliseconds to process the job: ", delay)

    await expirationQueue.add({
      orderId: data.id
    }, {
      delay: delay
    })

    msg.ack()
  }
}