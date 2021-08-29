import request from 'supertest'
import { app } from '../../app'
import mongoose from 'mongoose'
import { signup } from '../../test/auth-helper'
import { Ticket } from '../../models/ticket'
import { Order, OrderStatus } from '../../models/order'

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

it.todo('emits an order created event')