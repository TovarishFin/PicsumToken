import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import { withStyles } from '@material-ui/core/styles'
import Page from '../layout/Page'
import Grid from '@material-ui/core/Grid'

const styles = {
  spinner: {
    paddingTop: '30vh',
    textAlign: 'center',
    width: '100%'
  }
}

const Loading = ({ classes }) => (
  <Page>
    <Grid align="center" container justify="center">
      <Grid item md={6} xs={12}>
        <CircularProgress
          className={classes.spinner}
          size={200}
          thickness={10}
        />
      </Grid>
    </Grid>
  </Page>
)

export default withStyles(styles)(Loading)
