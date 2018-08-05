export const errOccurred = (message, stack, origin) => ({
  type: 'ERRORS:error-occurred',
  payload: {
    message,
    stack,
    origin
  }
})

export default errOccurred
