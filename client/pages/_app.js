import 'bootstrap/dist/css/bootstrap.css'
import buildClient from '../api/build-client'

import Header from '../components/header.js'

const AppComponent = ({ Component, pageProps, currentUser }) => {
  return <div>
    <Header currentUser={currentUser} />
    <Component currentUser={currentUser} {...pageProps} />
  </div>
}

AppComponent.getInitialProps = async (appContext) => {
  const client = buildClient(appContext.ctx)
  const { data } = await client.get('/api/users/currentuser')

  let pageProps = {}
  // So the `getInitialProps` inside the `pages/` can run
  // This is how NextJS behave if `getInitialProps` in `_app.js` is being used.
  if ('getInitialProps' in appContext.Component) {
    pageProps = await appContext.Component.getInitialProps(
      appContext.ctx,
      client,
      data.currentUser
    )
  }

  return {
    pageProps,
    ...data
  }
}

export default AppComponent
