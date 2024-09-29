class Response {
  status = 500
  message = 'Error inesperado'
  data = null

  constructor (status, message, data) {
    this.status = status
    this.message = message
    this.data = data
  }
}

export default Response