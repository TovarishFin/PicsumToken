// eslint-disable-next-line import/no-unassigned-import
import 'babel-polyfill'
import express from 'express'
import ip from 'ip'
import cors from 'cors'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackHotServerMiddleware from 'webpack-hot-server-middleware'
import clientConfig from '../webpack/client.dev'
import serverConfig from '../webpack/server.dev'

const devEnv = process.env.NODE_ENV === 'development'
const { publicPath } = clientConfig.output
const outputPath = clientConfig.output.path
const app = express()

// UNIVERSAL HMR + STATS HANDLING GOODNESS:

if (devEnv) {
  const multiCompiler = webpack([clientConfig, serverConfig])
  const clientCompiler = multiCompiler.compilers[0]

  app.use(cors())
  app.use(webpackDevMiddleware(multiCompiler, { publicPath }))
  app.use(webpackHotMiddleware(clientCompiler))
  app.use(
    webpackHotServerMiddleware(multiCompiler, {
      serverRendererOptions: { outputPath }
    })
  )

  app.listen(8080, ip.address(), () => {
    // eslint-disable-next-line no-console
    console.log(`Listening @ http://${ip.address()}:8080/`)
  })
} else {
  const clientStats = require('../buildClient/stats.json') // eslint-disable-line import/no-unresolved
  const serverRender = require('../buildServer/main.js').default // eslint-disable-line import/no-unresolved

  app.use(publicPath, express.static(outputPath))
  app.use(serverRender({ clientStats, outputPath }))
}

app.listen(8080, () => {
  // eslint-disable-next-line no-console
  console.log('Listening @ http://localhost:8080/')
})
