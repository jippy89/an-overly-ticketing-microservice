import Link from 'next/link'

const LandingPage = ({ currentUser, tickets }) => {
  const ticketList = tickets.map(ticket => (
    <tr key={ticket.id}>
      <td>{ticket.title}</td>
      <td>{ticket.price}</td>
      <td>
        <Link href="/tickets/[ticketId]"
          as={`/tickets/${ticket.id}`}
        >
          <a>View</a>
        </Link>
      </td>
    </tr>
  ))

  return (
    <div>
      <h1>Tickets</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>
          {ticketList}
        </tbody>
      </table>
    </div>
  )
}

/**
 * Calling '/api/users/currentuser' will be requested to 'https://localhost:80/api/users/currentuser' of CLIENT container
 * So in order to request to other services there's 2 way:
 * 1. Use the ClusterIP name, so make request to `https://auth-service-clusterip/api/users/currentuser
 * 2. Request to `ingress-nginx` from the current pod. With format of `https://<service-name>.<namespace-name>.svc.cluster.local`
 * There's a way to shorten the URL if it takes too long, by creating a service called "External Name Service"
 * However, such service is out of scope from this lecture.
 */
LandingPage.getInitialProps = async (context, client, currentUser) => {
  const { data } = await client.get('/api/tickets')
  console.log(data)
  return { tickets: data }
}

export default LandingPage