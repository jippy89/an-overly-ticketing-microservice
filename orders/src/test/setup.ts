import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import { app } from '../app'

// Mock `src/nats-wrapper.ts` with the one in `src/__mocks__/nats-wrapper.ts`
jest.mock('../nats-wrapper.ts')

let mongo: MongoMemoryServer
beforeAll(async () => {
  // Clears all mocks https://jestjs.io/docs/jest-object#jestclearallmocks
  jest.clearAllMocks()
  // This is not the best way of doing it, but it does the job for now
  process.env.JWT_KEY = 'randomStringHehe'

  mongo = await MongoMemoryServer.create()
  const mongoUri = await mongo.getUri()

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
})

beforeEach(async () => {
  jest.clearAllMocks()
  const collections = await mongoose.connection.db.collections()

  for (let collection of collections) {
    await collection.deleteMany({})
  }
})

afterAll(async () => {
  await mongo.stop()
  await mongoose.connection.close()
})