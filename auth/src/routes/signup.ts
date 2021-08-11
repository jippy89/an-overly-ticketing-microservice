import express, { Request, Response } from 'express'
import { body } from 'express-validator'
import { validateRequest, ConflictError } from '@jiptickets/common'
import { User } from '../models/user'
import jwt from 'jsonwebtoken'

const router = express.Router()

router.post('/api/users/signup', [
  body('email')
    .isEmail()
    .withMessage('Email must be valid'),
  body('password')
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage('Password must be between min 4 to 20 characters')
],
validateRequest,
async (req: Request, res: Response) => {
  const { email, password } = req.body

  const existingUser = await User.findOne({ email })

  if (existingUser) {
    throw new ConflictError('Email is already used')
  }

  const createdUser = User.build({ email, password })
  await createdUser.save()

  // Generate JWT
  const userJwt = jwt.sign({
    id: createdUser.id,
    email: createdUser.email
  }, process.env.JWT_KEY!)

  // Store it on session object
  req.session = {
    jwt: userJwt
  }

  return res.status(201).send({
    message: 'User has been created',
    user: createdUser
  })
})

export { router as signupRouter }