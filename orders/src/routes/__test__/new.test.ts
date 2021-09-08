import request from 'supertest'
import { app } from '../../app'
import mongoose from 'mongoose'
import { signup } from '../../test/auth-helper'
import { Ticket } from '../../models/ticket'
import { Order, OrderStatus } from '../../models/order'
import { natsWrapper } from '../../nats-wrapper'
import { Subjects } from '@jiptickets/common'

it('returns an error if ticket does not exist', async () => {
  const ticketId = mongoose.Types.ObjectId()

  await request(app)
    .post('/api/orders')
    .set('Cookie', await signup())
    .send({ ticketId })
    .expect(404)
})

it('returns an error if ticket is already reserved', async () => {
  const ticket = Ticket.build({
    title: 'concert',
    price: 20
  })
  await ticket.save()
  const order = Order.build({
    ticket,
    status: OrderStatus.Created,
    userId: 'asdfasdfas',
    expiresAt: new Date()
  })
  await order.save()

  await request(app)
    .post('/api/orders')
    .set('Cookie', await signup())
    .send({ ticketId: ticket.id })
    .expect(400)
})

it('reserves a ticket', async () => {
  const ticket = Ticket.build({
    title: 'concert',
    price: 20
  })
  await ticket.save()

  await request(app)
    .post('/api/orders')
    .set('Cookie', await signup())
    .send({ ticketId: ticket.id })
    .expect(201)
})

it('emits an order created event', async () => {
  const ticket = Ticket.build({
    title: 'concert',
    price: 20
  })
  await ticket.save()

  const user = await signup()

  const { body: order } = await request(app)
    .post('/api/orders')
    .set('Cookie', user)
    .send({ ticketId: ticket.id })
    .expect(201)

  expect(natsWrapper.client.publish).toHaveBeenCalled()
  // Implement this on a real service.
  // expect(natsWrapper.client.publish).toHaveBeenCalledWith(Subjects.OrderCreated, {
  //   id: order.id,
  //   status: order.status,
  //   userId: order.status,
  // })
})