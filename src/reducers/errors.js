const defaultState = {
  errors: []
}

const reducer = (state = defaultState, action = {}) => {
  switch (action.type) {
    case 'ERROR':
      return {
        ...state,
        errors: [...state.errors, action.payload]
      }
    default:
      return state
  }
}

export default reducer
