import React from 'react'
import Page from '../layout/Page'
import Typography from '@material-ui/core/Typography'

const Error = ({ error }) => (
  <Page paper>
    <Typography align="center" variant="title">
      {'Oops! An error occurred...'}
    </Typography>
    <Typography align="center">{`ERROR: ${error}`}</Typography>
  </Page>
)

export default Error
