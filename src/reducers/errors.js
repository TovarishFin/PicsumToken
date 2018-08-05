const defaultState = {
  errors: []
}

const reducer = (state = defaultState, action = {}) => {
  switch (action.type) {
    case 'ERRORS:error-occurred':
      return {
        ...state,
        errors: [...state.errors, action.payload]
      }
    default:
      return state
  }
}

export default reducer
