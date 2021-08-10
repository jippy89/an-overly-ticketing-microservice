import 'bootstrap/dist/css/bootstrap.css'
import buildClient from '../api/build-client'

const AppComponent = ({ Component, pageProps, currentUser }) => {
  return <div>
    <h1>Header! {currentUser.email}</h1>
    <Component {...pageProps} />
  </div>
}

AppComponent.getInitialProps = async (appContext) => {
  const client = buildClient(appContext.ctx)
  const { data } = await client.get('/api/users/currentuser')

  let pageProps = {}
  // So the `getInitialProps` inside the `pages/` can run
  // This is how NextJS behave if `getInitialProps` in `_app.js` is being used.
  if ('getInitialProps' in appContext.Component) {
    pageProps = await appContext.Component.getInitialProps(appContext.ctx)
  }

  return {
    pageProps,
    ...data
  }
}

export default AppComponent
