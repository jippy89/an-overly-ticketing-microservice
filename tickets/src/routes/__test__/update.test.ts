import request from 'supertest'
import { app } from '../../app'
import mongoose from 'mongoose'
import { signup } from '../../test/auth-helper'

it('returns 404 if the provided id does not exist', async () => {
  const id = mongoose.Types.ObjectId().toHexString()

  await request(app)
    .put(`/api/tickets/${id}`)
    .set('Cookie', await signup())
    .send({
      title: 'Iron Man',
      price: 90
    })
    .expect(404)
})

it('returns 401 if the user is not authenticated', async () => {
  const id = mongoose.Types.ObjectId().toHexString()

  await request(app)
    .put(`/api/tickets/${id}`)
    .send({
      title: 'Iron Man',
      price: 90
    })
    .expect(401)
})

it('returns 404 if the user does not own the ticket', async () => {
  const response = await request(app)
    .post(`/api/tickets`)
    .set('Cookie', await signup())
    .send({
      title: 'Abcdef',
      price: 90
    })


  expect(typeof response.body.id).toBe('string')
  expect(response.body.title).toBe('Abcdef')
  expect(response.body.price).toBe(90)

  await request(app)
    .put('/api/tickets/' + response.body.id)
    .set('Cookie', await signup())
    .send({
      title: 'Fedcba',
      price: 100
    })
    .expect(401)
})

describe('Request body validation', () => {
  
  it('returns 409 if the title is invalid', async () => {
  })
  
  it('returns 409 if the price is invalid', async () => {
  })
})