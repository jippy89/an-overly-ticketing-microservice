import request from 'supertest'
import { app } from '../../app'

it("fails when an email doesn't exist is supplied", async () => {
  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@test.com',
      password: 'pasword'
    })
    .expect(409)
})

it("fails when an incorrect password is supplied", async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(201)

  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@test.com',
      password: 'asjdkflasdjfl'
    })
    .expect(409)
})

it('sets a cookie after successful signin', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(201)
  
  const response = await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(200)

  // Get's a header
  expect(response.get('Set-Cookie')).toBeDefined()
})