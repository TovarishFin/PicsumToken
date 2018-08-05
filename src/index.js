import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import createHistory from 'history/createBrowserHistory'
import AppContainer from 'react-hot-loader/lib/AppContainer'
import App from './components/App'
import configureStore from './configureStore'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import themeConfig from './config/mui'

const history = createHistory()
const { store } = configureStore(history, window.REDUX_STATE)

if (typeof window === 'object' && window.document) {
  const jssStyles = document.getElementById('jss-server-side')
  if (jssStyles && jssStyles.parentNode) {
    jssStyles.parentNode.removeChild(jssStyles)
  }
}

// eslint-disable-next-line no-shadow
const render = App => {
  const root = document.getElementById('root')

  ReactDOM.hydrate(
    <AppContainer>
      <MuiThemeProvider theme={createMuiTheme(themeConfig)}>
        <Provider store={store}>
          <App />
        </Provider>
      </MuiThemeProvider>
    </AppContainer>,
    root
  )
}

render(App)

if (module.hot && process.env.NODE_ENV === 'development') {
  module.hot.accept('./components/App', () => {
    // eslint-disable-next-line
    const App = require('./components/App').default

    render(App)
  })
}
