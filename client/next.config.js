// An additional config that tells NextJS to reread file every 300ms
// This is done because sometimes NextJS did not read some file changes

module.exports = {
  webpackDevMiddleware (config) {
    config.watchOptions.poll = 300
    return config
  }
}