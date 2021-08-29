import request from 'supertest'
import { app } from '../../app'
import { Order, OrderStatus } from '../../models/order'
import { Ticket } from '../../models/ticket'
import { signup } from '../../test/auth-helper'

it('marks an order as cancelled', async () => {
  const ticket = Ticket.build({
    title: 'concert',
    price: 20
  })
  await ticket.save()

  const user = await signup()

  const { body: createdOrder } = await request(app)
    .post('/api/orders')
    .set('Cookie', user)
    .send({ ticketId: ticket.id })
    .expect(201)

  expect(createdOrder.ticket.title).toEqual(ticket.title)
  expect(createdOrder.ticket.price).toEqual(ticket.price)

  await request(app)
    .delete('/api/orders/' + createdOrder.id)
    .set('Cookie', user)
    .send()
    .expect(204)

  // Checkout the database if "status" is really updated
  const updatedOrder = await Order.findById(createdOrder.id)
  expect(updatedOrder!.status).toEqual(OrderStatus.Cancelled)
})