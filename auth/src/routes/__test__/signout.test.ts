import request from 'supertest'
import { app } from '../../app'

it('clears the cookie after signing out', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(201)

  const response = await request(app)
    .post('/api/users/signout')
    .send({})
    .expect(200)

  console.log(response.get('Set-Cookie'))

  // Option 1: Totally fine, the value not might change after all
  expect(response.get('Set-Cookie')[0]).toEqual('express:sess=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly')

  // Option 2: Just check if `Set-Cookie` header is set, if you prefer a more 'generic' approach
  // expect(response.get('Set-Cookie')).toBeDefined()
})