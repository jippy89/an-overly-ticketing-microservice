import express from 'express'

const app = express()

// Routers
import { currentUserRouter } from './routes/current-user'
import { signinRouter } from './routes/signin'
import { signoutRouter } from './routes/signout'
import { signupRouter } from './routes/signup'

const PORT = 3000
app.use(express.json())

app.use(currentUserRouter)
app.use(signinRouter)
app.use(signoutRouter)
app.use(signupRouter)

app.listen(PORT, () => {
  console.log('Listening on port: ' + PORT)
})