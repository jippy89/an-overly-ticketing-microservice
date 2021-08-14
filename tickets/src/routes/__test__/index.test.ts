import request from 'supertest'
import { app } from '../../app'
import { signup } from '../../test/auth-helper'

it('returns existing tickets', async () => {
  const cookie = await signup()

  const tickets = [
    { title: 'Iron Man', price: 15 },
    { title: 'The Flash', price: 15 },
    { title: 'Kungfu Panda', price: 15 }
  ]

  await Promise.all(
    tickets.map(ticket => request(app)
      .post('/api/tickets')
      .set('Cookie', cookie)
      .send(ticket)
    )
  )

  const response = await request(app)
    .get('/api/tickets')
    .send()
    .expect(200)

  expect(response.body.length).toBe(3)
})