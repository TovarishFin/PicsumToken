import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  totalSupplySelector,
  tokenNameSelector,
  tokenSymbolSelector,
  tokenBalanceSelector,
  userTokensSelector,
  allTokenUrisSelector
} from '../../selectors/contracts'
import {
  getTotalSupply,
  getTokenName,
  getTokenSymbol
} from '../../actions/contracts'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import withStyles from '@material-ui/core/styles/withStyles'
import { coinbaseSelector } from '../../selectors/network'

const styles = {
  tokenUri: {
    width: '50vw'
  },
  page: {
    // height: '100%',
    // width: '100%'
  }
}

class Home extends Component {
  componentDidMount() {
    this.props.dispatchGetTotalSupply()
    this.props.dispatchGetTokenName()
    this.props.dispatchGetTokenSymbol()
  }

  render() {
    const {
      classes,
      totalSupply,
      tokenName,
      tokenSymbol,
      userTokenBalance,
      userTokens,
      coinbase,
      tokenUris
    } = this.props
    return (
      <div>
        <Paper className={classes.page}>
          <Typography variant="display4">Picsum Token</Typography>
          <Typography gutterBottom variant="body1">
            This is an ERC721 compliant non-fungible token. Each token
            represents a unique photo taken from{' '}
            <a
              rel="noopener noreferrer"
              target="_blank"
              href="https://picsum.photos/"
            >
              picsum.photos
            </a>
            . It is meant to be a simple example implementation of ERC721.
          </Typography>

          <Typography variant="display3">Token Contract Information</Typography>
          <List>
            <ListItem>
              <ListItemText>total supply is: {totalSupply}</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>token name is: {tokenName}</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>token symbol is: {tokenSymbol}</ListItemText>
            </ListItem>
          </List>

          <Typography variant="display3">Account Information</Typography>
          <List>
            <ListItem>
              <ListItemText>your address is: {coinbase}</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                your token balance is: {userTokenBalance}
              </ListItemText>
            </ListItem>
          </List>

          <Typography variant="display2">Token Images</Typography>
          {userTokens.map(tokenId => (
            <React.Fragment key={tokenId}>
              <Typography variant="display1">TokenId: {tokenId}</Typography>
              <img className={classes.tokenUri} src={tokenUris[tokenId]} />
            </React.Fragment>
          ))}
          </Paper>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  totalSupply: totalSupplySelector(state),
  tokenName: tokenNameSelector(state),
  tokenSymbol: tokenSymbolSelector(state),
  userTokenBalance: tokenBalanceSelector(state, coinbaseSelector(state)),
  userTokens: userTokensSelector(state, coinbaseSelector(state)),
  coinbase: coinbaseSelector(state),
  tokenUris: allTokenUrisSelector(state)
})

const mapDispatchToProps = {
  dispatchGetTotalSupply: getTotalSupply,
  dispatchGetTokenName: getTokenName,
  dispatchGetTokenSymbol: getTokenSymbol
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Home))
