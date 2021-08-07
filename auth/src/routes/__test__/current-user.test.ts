import request from 'supertest'
import { app } from '../../app'

it('response about the current detail about the user', async () => {
  const signupResponse = await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(201)

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