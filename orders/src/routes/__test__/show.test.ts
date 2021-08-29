import request from 'supertest'
import { app } from '../../app'
import { Ticket } from '../../models/ticket'
import { signup } from '../../test/auth-helper'

it('Fetches an order', async () => {
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

  const response = await request(app)
    .get('/api/orders/' + order.id)
    .set('Cookie', user)
    .send()
    .expect(200)

  expect(response.body.id).toEqual(order.id)
  expect(response.body.ticket.id).toEqual(ticket.id)
  expect(response.body.ticket.title).toEqual(ticket.title)
})

it('Returns error if user request an order he does not own', async () => {
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

  await request(app)
    .get('/api/orders/' + order.id)
    .set('Cookie', await signup())
    .send()
    .expect(401)
})