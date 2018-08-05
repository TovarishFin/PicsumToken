const defaultState = {
  drawerOpen: false,
  notificationOpen: false,
  notificationMessage: ''
}

const reducer = (state = defaultState, action = {}) => {
  switch (action.type) {
    case 'SET_DRAWER':
      return { ...state, drawerOpen: action.payload }
    case 'TOGGLE_DRAWER':
      return { ...state, drawerOpen: !state.drawerOpen }
    case 'SET_NOTIFIER':
      return {
        ...state,
        notificationOpen: true,
        notificationMessage: action.payload
      }
    case 'CLOSE_NOTIFIER':
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
