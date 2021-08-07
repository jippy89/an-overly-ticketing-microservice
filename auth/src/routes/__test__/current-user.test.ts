import request from 'supertest'
import { app } from '../../app'
import { signup } from '../../test/auth-helper'

it('response about the current detail about the user', async () => {
  const signupResponse = await signup()

  const cookie = signupResponse.get('Set-Cookie')

  const response = await request(app)
    .get('/api/users/currentuser')
    .set('Cookie', cookie)
    .send()
    .expect(200)

  expect(response.body.currentUser.email).toEqual('test@test.com')
})

it('responds with null if user not authenticated', async () => {
  const response = await request(app)
    .get('/api/users/currentuser')
    .send()
    .expect(200)

  expect(response.body.currentUser).toEqual(null)
})