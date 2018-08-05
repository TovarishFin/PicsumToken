import { NOT_FOUND } from 'redux-first-router'

// try dispatching these from the redux devTools

export const goToPage = (type, category) => ({
  type,
  payload: category && { category }
})

export const goHome = () => ({
  type: 'HOME'
})

export const goToAdmin = () => ({
  type: 'ADMIN'
})

export const notFound = () => ({
  type: NOT_FOUND
})

const actions = {
  goToPage,
  goHome,
  goToAdmin,
  notFound
}

export default actions
