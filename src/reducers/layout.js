const defaultState = {
  drawerOpen: false,
  notificationOpen: false,
  notificationMessage: ''
}

const reducer = (state = defaultState, action = {}) => {
  switch (action.type) {
    case 'LAYOUT:set-drawer':
      return { ...state, drawerOpen: action.payload }
    case 'LAYOUT:toggle-drawer':
      return { ...state, drawerOpen: !state.drawerOpen }
    case 'LAYOUT:set-notifier':
      return {
        ...state,
        notificationOpen: true,
        notificationMessage: action.payload
      }
    case 'LAYOUT:close-notifier':
      return {
        ...state,
        notificationOpen: false,
        notificationMessage: ''
      }
    default:
      return state
  }
}

export default reducer
