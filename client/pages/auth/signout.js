import { useEffect } from 'react'
import userRequest from '../../hooks/use-request'
import Router from 'next/router'

const signOut = () => {
  const { doRequest } = userRequest({
    url: '/api/users/signout',
    method: 'post',
    data: {}
  })

  useEffect(async () => {
    try {
      const response = await doRequest()

      if (response && 'status' in response && response.status === 200) {
        Router.push('/')
      }
    } catch (err) {
    }
  }, [])

  return <div>Signing you out...</div>
}

export default signOut