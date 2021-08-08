import { useState } from 'react'
import axios from 'axios'
import useRequest from '../../hooks/user-request.js'

const signUp = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { doRequest, errors } = useRequest({
    url: '/api/users/signup',
    method: 'post',
    data: {
      email, password
    }
  })

  const onSubmit = async e => {
    e.preventDefault()
    doRequest()
  }
  return (
    <form onSubmit={onSubmit}>
      <h1>Sign Up</h1>
      <div className="form-group">
        <label>Email Address</label>
        <input value={email} onChange={e => setEmail(e.target.value)} className="form-control" />
      </div>

      <div className="form-group">
        <label>Password</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="form-control" />
      </div>

      {errors}
      <button className="btn btn-primary">Sign Up</button>
    </form>
  )
}

export default signUp