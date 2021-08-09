import buildClient from "../api/build-client"

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
LandingPage.getInitialProps = async (context) => {
  const client = buildClient(context)
  const { data } = await client.get('/api/users/currentuser')
  return data
}

export default LandingPage