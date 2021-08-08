import axios from 'axios'
import { useState } from 'react'

const userRequest = ({
  url,
  method,
  data,
  ...config
}) => {
  const [errors, setErrors] = useState([])

  const doRequest = async () => {
    try {
      setErrors([])
      const response = await axios({
        url,
        method,
        data,
        ...config
      })
      
      return response
    } catch (err) {
      setErrors(
        <div className="alert alert-danger">
          <h4>Ooops...</h4>
          <ul className="my-0">
            {err.response.data.errors.map(err => <li key={err.message}>{err.message}</li>)}
          </ul>
        </div>
      )
    }
  }

  return {
    doRequest,
    errors
  }
}

export default userRequest