import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  tokenBalanceSelector,
  userTokensSelector,
  allTokenUrisSelector
} from '../../selectors/contracts'
import { startTransferToken } from '../../actions/contracts'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import withStyles from '@material-ui/core/styles/withStyles'
import { coinbaseSelector } from '../../selectors/network'
import { addressZero } from '../../utils/ethereum'

const styles = {
  tokenUri: {
    width: '10vw'
  },
  card: {
    padding: '2vw'
  }
}
// TODO: REMOVE THIS
// 0x9FeeC52f66A431004Fbc2e4F1Cf13B669d1DF5C1
class Transfer extends Component {
  state = {
    receiver: ''
  }

  handleChange = e => {
    const { name, value } = e.target
    this.setState({
      [name]: value
    })
  }

  transferToken = tokenId => {
    this.props.dispatchTransferToken(tokenId, this.state.receiver)
  }

  render() {
    const {
      classes,
      userTokenBalance,
      userTokens,
      coinbase,
      tokenUris
    } = this.props
    const { receiver } = this.state
    return (
      <div>
        <Paper className={classes.page}>
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
              <Grid key={tokenId} item md={6} lg={3}>
                <Paper className={classes.card} elevation={24}>
                  <Typography variant="display1">TokenId: {tokenId}</Typography>
                  <img className={classes.tokenUri} src={tokenUris[tokenId]} />
                  <TextField
                    fullWidth
                    placeholder={addressZero}
                    type="text"
                    label="receiver"
                    name="receiver"
                    value={receiver}
                    onChange={this.handleChange}
                  />
                  <Button
                    variant="raised"
                    fullWidth
                    color="primary"
                    disabled={!receiver}
                    onClick={() => this.transferToken(tokenId)}
                  >
                    Transfer{' '}
                    {receiver
                      ? `to ${receiver.slice(0, 5) +
                          '...' +
                          receiver.slice(-3)}`
                      : ''}
                  </Button>
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
  userTokenBalance: tokenBalanceSelector(state, coinbaseSelector(state)),
  userTokens: userTokensSelector(state, coinbaseSelector(state)),
  coinbase: coinbaseSelector(state),
  tokenUris: allTokenUrisSelector(state)
})

const mapDispatchToProps = {
  dispatchTransferToken: startTransferToken
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Transfer))
