import React, { Component } from 'react'
import { connect } from 'react-redux'
import { totalSupplySelector } from '../../selectors/contracts'
import { getTotalSupply } from '../../actions/contracts'

class Home extends Component {
  componentDidMount() {
    this.props.dispatchGetTotalSupply()
  }

  render() {
    const { totalSupply } = this.props

    return <div>total supply is: {totalSupply}</div>
  }
}

const mapStateToProps = state => ({
  totalSupply: totalSupplySelector(state)
})

const mapDispatchToProps = {
  dispatchGetTotalSupply: getTotalSupply
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
