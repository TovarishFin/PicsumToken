import React from 'react'
import Typography from '@material-ui/core/Typography'
import Page from '../layout/Page'

const NotFound = () => (
  <Page paper>
    <Typography align="center" variant="title">
      {'PAGE NOT FOUND - 404'}
    </Typography>
    <Typography align="center">
      {'The page you are looking for does not exist.'}
    </Typography>
  </Page>
)

export default NotFound
