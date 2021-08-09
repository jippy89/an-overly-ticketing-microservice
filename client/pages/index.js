import axios from 'axios'

const LandingPage = ({ currentUser }) => {
  console.log('currentUser', currentUser)
  return <h1>Landing page</h1>
}

/**
 * Calling '/api/users/currentuser' will be requested to 'https://localhost:80/api/users/currentuser' of CLIENT container
 * So in order to request to other services there's 2 way:
 * 1. Use the ClusterIP name, so make request to `https://auth-service-clusterip/api/users/currentuser
 * 2. Request to `ingress-nginx` from the current pod. With format of `https://<service-name>.<namespace-name>.svc.cluster.local`
 * There's a way to shorten the URL if it takes too long, by creating a service called "External Name Service"
 * However, such service is out of scope from this lecture.
 */
LandingPage.getInitialProps = async ({ req }) => {
  if (typeof window === 'undefined') {
    const { data } = await axios.get('http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser', {
      headers: req.headers
    })
    return data
  } else {
    const { data } = await axios.get('/api/users/currentuser')
    return data
  }

  return {}
}

export default LandingPage