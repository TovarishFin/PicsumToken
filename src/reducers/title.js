const reducer = (state = name, action = {}) => {
  switch (action.type) {
    case 'HOME':
      return name
    default:
      return state
  }
}

const name = 'PicsumTokens'

export default reducer
