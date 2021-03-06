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
import Grid from '@material-ui/core/Grid'
import withStyles from '@material-ui/core/styles/withStyles'
import { coinbaseSelector } from '../../selectors/network'

const styles = {
  tokenUri: {
    width: '35vw'
  },
  card: {
    padding: '2vw'
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
              <ListItemText>Total Supply: {totalSupply}</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>Token Name: {tokenName}</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>Token Symbol: {tokenSymbol}</ListItemText>
            </ListItem>
          </List>

          <Typography variant="display3">Account Information</Typography>
          <List>
            <ListItem>
              <ListItemText>Your address: {coinbase}</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                Your token balance: {userTokenBalance}
              </ListItemText>
            </ListItem>
          </List>

          <Typography gutterBottom variant="display2">
            Your Associated Token Images
          </Typography>
          <Grid container spacing={40} alignItems="center">
            {userTokens.map(tokenId => (
              <Grid key={tokenId} item md={12} lg={6}>
                <Paper className={classes.card} elevation={24}>
                  <Typography variant="display1">TokenId: {tokenId}</Typography>
                  <img className={classes.tokenUri} src={tokenUris[tokenId]} />
                </Paper>
              </Grid>
            ))}
          </Grid>
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
