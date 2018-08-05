import { NOT_FOUND } from 'redux-first-router'

const reducer = (state = 'HOME', action = {}) =>
  components[action.type] || state

const components = {
  HOME: 'Home',
  [NOT_FOUND]: 'NotFound'
}

export default reducer
