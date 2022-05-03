import { useState } from 'react'
import Route from 'next/router'
import useRequest from '../../hooks/use-request.js'

const signIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { doRequest, errors } = useRequest({
    url: '/api/users/signin',
    method: 'post',
    data: {
      email, password
    }
  })

  const onSubmit = async e => {
    e.preventDefault()
    
    const response = await doRequest()

    console.log(response)

    if (response && 'status' in response && response.status === 200) {
      Route.push('/')
    }
  }
  return (
    <form onSubmit={onSubmit}>
      <h1>Sign In</h1>
      <div className="form-group">
        <label>Email Address</label>
        <input value={email} onChange={e => setEmail(e.target.value)} className="form-control" />
      </div>

      <div className="form-group">
        <label>Password</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="form-control" />
      </div>

      {errors}
      <button className="btn btn-primary">Sign In</button>
    </form>
  )
}

export default signIn