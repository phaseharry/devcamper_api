class ErrorResponse extends Error {
  constructor(message, statusCode) {
    super(message) // calling the Error class we're extending and passing the message property down so it has it
    this.statusCode = statusCode
  }
}

module.exports = ErrorResponse
