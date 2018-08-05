const reducer = (state = 'next', action = {}) => {
  if (!action.meta || !action.meta.location) {
    return state
  }

  const type = action.type
  const prevType = action.meta.location.prev.type

  if (type === prevType) {
    return state
  }

  if (type === 'HOME') {
    return 'back'
  }

  return state
}

export default reducer
