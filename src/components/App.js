import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import { withStyles } from '@material-ui/core/styles'
import Top from './layout/Top'
import Switcher from './layout/Switcher'
import MainDrawer from './layout/MainDrawer'
import Notifier from './layout/Notifier'
const styles = {
  '@global': {
    body: {
      width: '100%',
      height: '100%',
      background: 'transparent',
      margin: 0,
      padding: 0,
      fontFamily: ['Open Sans', 'sans-serif'],
      fontSize: '22.5px'
    },
    html: {
      width: '100%',
      height: '100%',
      background: 'transparent',
      margin: 0,
      padding: 0,
      fontFamily: ['Open Sans', 'sans-serif']
    }
  },
  app: {
    margin: '0px',
    height: '100%',
    width: '100%'
  }
}
const App = ({ classes }) => (
  <div className={classes.app}>
    <CssBaseline />
    <Top />
    <MainDrawer />
    <Switcher />
    <Notifier />
  </div>
)

export default withStyles(styles)(App)
