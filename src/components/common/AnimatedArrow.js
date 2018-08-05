import React from 'react'
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown'
import { withStyles } from '@material-ui/core/styles'

const styles = {
  icon: {
    zDepth: '1000',
    width: '100px',
    height: '100px',
    animation: 'arrow-down 3s linear infinite'
  },
  '@keyframes arrow-down': {
    to: {
      opacity: 0,
      transform: 'translateY(25%)'
    }
  }
}

const AnimatedArrow = ({ classes }) => (
  <KeyboardArrowDown className={classes.icon} color="secondary" />
)

export default withStyles(styles)(AnimatedArrow)
