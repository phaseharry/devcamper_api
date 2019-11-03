const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')

// Load environment variables
dotenv.config({ path: './config/config.env' }) //the path defaults to a root .env file but we put it in a config folder so we need to specify the path that it's in

const app = express()

// Middleware
app.use(express.json({ extended: false }))
// Development Only Middleware
if(process.env.NODE_ENV === 'development'){
  app.use(morgan('dev')) 
}

// Mount API
app.use('/api', require('./routes'))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))
