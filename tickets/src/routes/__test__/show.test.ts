import request from 'supertest'
import { app } from '../../app'
import { signup } from '../../test/auth-helper'
import mongoose from 'mongoose'

it('returns a 404 when the ticket is not found', async () => {
  // Generate a random valid MongoDB ID with mongoose
  const id = new mongoose.Types.ObjectId().toHexString()

  await request(app)
    .get(`/api/tickets/${id}`)
    .send()
    .expect(404)
})

it('shows the ticket when ticket with ID X exist', async () => {
  // There are 2 ways of testing this.
  // 1. Using the `Ticket` model, create it and save.
  // 2. Using the `request(app)` and request to the endpoint
  // Number 2, is chosen because of the instructor preference of "It simulate real app"

  const postTicketResponse = await request(app)
    .post('/api/tickets')
    .set('Cookie', await signup())
    .send({
      title: 'Lorem',
      price: 99
    })
    .expect(201)

  const response = await request(app)
    .get('/api/tickets/' + postTicketResponse.body.id)
    .send()
    .expect(200)

  expect(response.body.title).toBe('Lorem')
  expect(response.body.price).toBe(99)
})