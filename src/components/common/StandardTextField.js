import React from 'react'
import TextField from '@material-ui/core/TextField'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  root: {
    width: '300px',
    margin: '1vh',
    [theme.breakpoints.up('md')]: {
      width: props => (props.fullWidth ? '(calc(100% - 2vh))' : '300px')
    }
  }
})

const StandardTextField = props => (
  <TextField className={props.classes.standardTextField} {...props} />
)

export default withStyles(styles)(StandardTextField)
