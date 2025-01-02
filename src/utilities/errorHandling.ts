let showAlert = true
export const handleError = (error: any) => {
  let errorMessage = 'Some error occurred, Unable to connect to server'

  if (error.response) {
    const { status } = error.response
    if (status >= 500) {
      errorMessage = 'Server Error Occurred !'
      return errorMessage
    }
  }

  if (error.response && error.response.data) {
    const { status } = error.response
    errorMessage = error.response.data.message

    if (status === 401 && showAlert) {
      showAlert = false
      localStorage.clear()
      alert('Session Expired. Please Login')
      window.location.href = '/login'
    }
  }

  return errorMessage
}
