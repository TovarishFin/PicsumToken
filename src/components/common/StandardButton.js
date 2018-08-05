import React from 'react'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'

const styles = () => ({
  root: {
    borderRadius: '20px',
    margin: '1vh',
    minWidth: '250px'
  }
})

const StandardButton = props => (
  <Button className={props.classes.standardButton} variant="raised" {...props}>
    {props.children}
  </Button>
)

export default withStyles(styles)(StandardButton)
