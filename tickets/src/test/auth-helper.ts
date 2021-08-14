import jwt from 'jsonwebtoken'

export const signup = async () => {
  // Build a JWT Token. { id, email }
  const payload = {
    id: 'ajskdlfjalsd',
    email: 'test@test.com'
  }

  // Create the JWT
  const token = jwt.sign(payload, process.env.JWT_KEY!)

  // Build a session object { jwt: ajsdklfajsdAKDFJ }
  const session = {
    jwt: token
  }

  // Turn it to JSON
  const sessionJSON = JSON.stringify(session)

  // Take the JSON and encode it as base64
  const base64 = Buffer.from(sessionJSON).toString('base64')

  // Return a strings thas the cookie with the encoded data
  // Why in arrays? Well it's required because of supertest deal with cookies as an array
  return [`express:sess=${base64}`]
}