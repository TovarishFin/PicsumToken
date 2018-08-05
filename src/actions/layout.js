export const closeDrawer = () => ({
  type: 'LAYOUT:set-drawer',
  payload: false
})

export const toggleDrawer = () => ({
  type: 'LAYOUT:toggle-drawer'
})

export const openDrawer = () => ({
  type: 'LAYOUT:set-drawer',
  payload: true
})

export const setNotification = payload => ({
  type: 'LAYOUT:set-notifier',
  payload
})

export const closeNotification = () => ({
  type: 'LAYOUT:close-notifier'
})
