import React from 'react'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

const Page = ({ children, classes, paper }) => (
  <div className={classes.flexContainer}>
    <Grid container justify="center">
      {paper ? (
        <Grid item lg={8} md={12} sm={12} xl={8} xs={12}>
          <Paper>{children}</Paper>
        </Grid>
      ) : (
        <Grid item lg={4} md={5} sm={6} xl={3} xs={12}>
          {children}
        </Grid>
      )}
    </Grid>
  </div>
)

export default Page
