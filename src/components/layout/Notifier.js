import React from 'react'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button'
import Snackbar from '@material-ui/core/Snackbar'
import { closeNotification } from '../../actions/layout'
import {
  notificationOpenSelector,
  notificationMessageSelector
} from '../../selectors/layout'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  snackbarContent: {
    backgroundColor: theme.palette.secondary.main,
    color: '#000000'
  }
})

/* eslint-disable react/jsx-sort-props */

const Notifier = ({
  dispatchCloseNotification,
  notificationOpen,
  notificationMessage,
  classes
}) => (
  <Snackbar
    action={<Button onClick={dispatchCloseNotification}>{'close'}</Button>}
    autoHideDuration={5000}
    message={notificationMessage}
    onClose={dispatchCloseNotification}
    open={notificationOpen}
    SnackbarContentProps={{ className: classes.snackbarContent }}
  />
)

/* eslint-enable react/jsx-sort-props */

const mapStateToProps = state => ({
  notificationOpen: notificationOpenSelector(state),
  notificationMessage: notificationMessageSelector(state)
})

const mapDispatchToProps = {
  dispatchCloseNotification: closeNotification
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Notifier))
