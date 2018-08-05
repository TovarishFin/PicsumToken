import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { networkSelector } from '../../selectors/network'

const styles = {
  link: {
    width: '219px',
    height: '13px',
    opacity: 0.8,
    color: '#000000',
    fontSize: '15px',
    fontWeight: 300,
    lineHeight: '17px'
  }
}

const networkNumberToLinkBase = number => {
  switch (number) {
    case '3':
      return `https://ropsten.etherscan.io`
    case '4':
      return `https://rinkeby.etherscan.io`
    case '42':
      return `https://kovan.etherscan.io`
    case '1':
      return `https://etherscan.io`
    default:
      return `https://etherscan.io`
  }
}

const chooseDisplayText = (full, children, hash) => {
  switch (true) {
    case full:
      return hash
    case children:
      return children
    default:
      return `${hash.slice(0, 5)}...${hash.slice(hash.length - 5)}`
  }
}

const EtherscanLink = ({
  classes,
  hash,
  type,
  networkNumber,
  full,
  children
}) => (
  <a
    className={classes.link}
    href={
      type === 'address'
        ? `${networkNumberToLinkBase(networkNumber)}/address/${hash}`
        : `${networkNumberToLinkBase(networkNumber)}/tx/${hash}`
    }
    rel="noopener noreferrer"
    target="_blank"
  >
    {chooseDisplayText(full, children, hash)}
  </a>
)

const mapStateToProps = state => ({
  networkNumber: networkSelector(state)
})

export default connect(mapStateToProps)(withStyles(styles)(EtherscanLink))
