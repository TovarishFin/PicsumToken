import React from 'react'
import ReactDOM from 'react-dom/server'
import { Provider } from 'react-redux'
import { flushChunkNames } from 'react-universal-component/server'
import flushChunks from 'webpack-flush-chunks'
import configureStore from './configureStore'
import App from '../src/components/App'
import {
  MuiThemeProvider,
  createMuiTheme,
  createGenerateClassName
} from '@material-ui/core/styles'
import { SheetsRegistry } from 'react-jss/lib/jss'
import JssProvider from 'react-jss/lib/JssProvider'
import themeConfig from '../src/config/mui'

const main = ({ clientStats }) => async (req, res) => {
  const store = await configureStore(req, res)
  if (!store) return // no store means redirect was already served

  const createdTheme = createMuiTheme(themeConfig)
  const generateClassName = createGenerateClassName()
  const sheetsRegistry = new SheetsRegistry()
  const createdApp = createApp(
    App,
    store,
    createdTheme,
    generateClassName,
    sheetsRegistry
  )
  const appString = ReactDOM.renderToString(createdApp)
  const stateJson = JSON.stringify(store.getState())
  const chunkNames = flushChunkNames()
  const { js, styles, cssHash } = flushChunks(clientStats, { chunkNames })

  // eslint-disable-next-line no-console
  console.log('REQUESTED PATH:', req.path)
  // eslint-disable-next-line no-console
  console.log('CHUNK NAMES', chunkNames)

  return res.send(
    `<!doctype html>
      <html>
        <head>
          <!-- Global site tag (gtag.js) - Google Analytics -->
          <script async src="https://www.googletagmanager.com/gtag/js?id=UA-105330212-2"></script>
          <script>
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'UA-105330212-2');
          </script>

          <meta charset="utf-8">
          <meta name="PicsumToken: Proof of Concept ERC721 Token">
          <meta name="keywords" content="ethereum DApp, ERC721">
          <meta name="author" content="TovarishFin">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <title>PicsumToken</title>
          ${styles}
          <style id="jss-server-side">${sheetsRegistry.toString()}</style>
          <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">
        </head>
        <body>
          <script>window.REDUX_STATE = ${stateJson}</script>
          <div style="height: 100%;" id="root">${appString}</div>
          ${cssHash}
          <script type='text/javascript' src='/static/vendor.js'></script>
          ${js}
        </body>
      </html>`
  )
}

const createApp = (
  CreatedApp,
  store,
  theme,
  generateClassName,
  sheetsRegistry
) => (
  <Provider store={store}>
    <JssProvider
      generateClassName={generateClassName}
      registry={sheetsRegistry}
    >
      <MuiThemeProvider sheetsManager={new Map()} theme={theme}>
        <CreatedApp />
      </MuiThemeProvider>
    </JssProvider>
  </Provider>
)

export default main
