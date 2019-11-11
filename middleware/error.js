const ErrorResponse = require('../utils/errorResponse')

const errorHandler = (err, req, res, next) => {
  let error = { ...err } // creating a copy of the err object so we can modify it if we get specific errors we want to handle differently
  // Log error to console for developer
  console.log(err.stack.red)
  console.log(err)

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    // CastError is Mongoose specific and occurs when a badly formatted _id is used to query
    const message = `Resource not found with id of ${err.value}`
    error = new ErrorResponse(message, 404)
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    // 11000 is the error code for duplicate key in Mongo
    const message = 'Duplicate field value entered'
    error = new ErrorResponse(message, 400)
  }

  // Mongoose Validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message)
    error = new ErrorResponse(message, 400)
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error'
  })
}

module.exports = errorHandler
