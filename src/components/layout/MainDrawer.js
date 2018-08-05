import React from 'react'
import Drawer from '@material-ui/core/Drawer'
import MenuItem from '@material-ui/core/MenuItem'
import Divider from '@material-ui/core/Divider'
import { connect } from 'react-redux'
import Link from 'redux-first-router-link'
import { drawerOpenSelector } from '../../selectors/layout'
import { coinbaseSelector, networkIdSelector } from '../../selectors/network'
import { closeDrawer } from '../../actions/layout'
import { goToPage } from '../../actions/page'

const coinbaseLink = (number, coinbase) => {
  switch (number) {
    case '3':
      return `https://ropsten.etherscan.io/address/${coinbase}`
    case '4':
      return `https://rinkeby.etherscan.io/address/${coinbase}`
    case '42':
      return `https://kovan.etherscan.io/address/${coinbase}`
    case '1':
      return `https://etherscan.io/address/${coinbase}`
    default:
      return `https://etherscan.io/address/${coinbase}`
  }
}

const MainDrawer = ({
  drawerOpen,
  dispatchCloseDrawer,
  coinbase,
  networkNumber
}) => (
  <div>
    <Drawer onClose={dispatchCloseDrawer} open={drawerOpen} width={300}>
      <MenuItem
        component="a"
        href={coinbaseLink(networkNumber, coinbase)}
        onClick={dispatchCloseDrawer}
        target="_blank"
      >
        {'Account: '}
        {`${coinbase.slice(0, 5)}...${coinbase.slice(coinbase.length - 5)}`}
      </MenuItem>
      <MenuItem
        component={Link}
        exact="true"
        onClick={dispatchCloseDrawer}
        to="/"
      >
        {'Home'}
      </MenuItem>
      <Divider />
    </Drawer>
  </div>
)

const mapStateToProps = state => ({
  drawerOpen: drawerOpenSelector(state),
  coinbase: coinbaseSelector(state),
  networkNumber: networkIdSelector(state)
})

const mapDispatchToProps = {
  dispatchCloseDrawer: closeDrawer,
  dispatchGoToPage: goToPage
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainDrawer)
