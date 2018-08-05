export const closeDrawer = () => ({
  type: 'SET_DRAWER',
  payload: false
})

export const toggleDrawer = () => ({
  type: 'TOGGLE_DRAWER'
})

export const openDrawer = () => ({
  type: 'SET_DRAWER',
  payload: true
})

export const setNotification = payload => ({
  type: 'SET_NOTIFIER',
  payload
})

export const closeNotification = () => ({
  type: 'CLOSE_NOTIFIER'
})
