const mongoose = require('mongoose')

/**
 * Connect Express app to MongoDB
 * @param {import('express').Express} expressApp
 */

const connectDB = async expressApp => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    })
    console.log(
      `MongoDB connected: ${conn.connection.host}`.cyan.underline.bold
    )
    expressApp.emit('ready')
  } catch (err) {
    expressApp.emit('dbConnectionFailure', err)
  }
}

module.exports = connectDB
