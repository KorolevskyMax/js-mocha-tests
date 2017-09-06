const webpack = require('webpack')
const webpackDev = require('webpack-dev-middleware')
const webpackHot = require('webpack-hot-middleware')
const express = require('express')
const webpackConfig = require('./webpack.config')

const app = express()

function src(req, res) {
  res.send(`
    <html>
      <head>
        <title>Onboarding App</title>
        <script async defer type="text/javascript" src="/bundle.js"> </script>
      </head>
      <body> <div id='app'/> </body>
    </html>
  `)
}

app.get('/login', src)
app.get('/signup', src)

const compiler = webpack(webpackConfig)
const webDev = webpackDev(compiler, {noInfo: true})
app.use(webDev)
app.use(webpackHot(compiler))

const webpackCompiled = new Promise((resolve, reject) => {
  webDev.waitUntilValid(() => {
    resolve()
  })
})

const port = process.env.PORT || 3000

const serverStarted = new Promise((resolve, reject) => {
  app.listen(port, function() {
    resolve()
  })
})

Promise.all([webpackCompiled, serverStarted]).then(() => {
  console.log(`App listening on port ${port}.`) // eslint-disable-line no-console
})
