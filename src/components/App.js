import React from 'react'
import { connect } from 'react-redux'
import CssBaseline from '@material-ui/core/CssBaseline'
import withStyles from '@material-ui/core/styles/withStyles'
import Top from './layout/Top'
import Switcher from './layout/Switcher'
import MainDrawer from './layout/MainDrawer'
import Notifier from './layout/Notifier'
import Web3Loading from './layout/Web3Loading'
import { web3ReadySelector } from '../selectors/network'

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
const App = ({ classes, web3Ready }) => (
  <div className={classes.app}>
    {web3Ready ? (
      <React.Fragment>
        <CssBaseline />
        <Top />
        <MainDrawer />
        <Switcher />
        <Notifier />
      </React.Fragment>
    ) : (
      <Web3Loading />
    )}
  </div>
)

const mapStateToProps = state => ({
  web3Ready: web3ReadySelector(state)
})

export default connect(
  mapStateToProps,
  null
)(withStyles(styles)(App))
