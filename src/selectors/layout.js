import { pathOr } from 'ramda'

export const drawerOpenSelector = state =>
  pathOr(false, ['layout', 'drawerOpen'], state)

export const notificationOpenSelector = state =>
  pathOr(false, ['layout', 'notificationOpen'], state)

export const notificationMessageSelector = state =>
  pathOr('', ['layout', 'notificationMessage'], state)
