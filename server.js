const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const colors = require('colors')

// Load environment variables
dotenv.config({ path: './config/config.env' }) //the path defaults to a root .env file but we put it in a config folder so we need to specify the path that it's in

const app = express()
// Connecting app to database
const connectDB = require('./config/db')
connectDB(app)

// Middleware
app.use(express.json({ extended: false }))
// Development Only Middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// Mount API
app.use('/api', require('./routes'))

const PORT = process.env.PORT || 5000

app.on('ready', () => {
  app.listen(PORT, () =>
    console.log(
      `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
        .bold
    )
  )
})

// handle db connection failures and terminates the server
app.on('dbConnectionFailure', err => {
  console.log(`Error: ${err.reason}`.red)
  process.exit(1)
})

// Final error handling middleware
app.use((err, req, res, next) => {
  const status = err.status || 500
  const msg = err.message || 'Server Error'
  res.status(status).json({ msg, success: false })
})
