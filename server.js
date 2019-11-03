const express = require('express')
const dotenv = require('dotenv')

// Load environment variables
dotenv.config({ path: './config/config.env' }) //the path defaults to a root .env file but we put it in a config folder so we need to specify the path that it's in

const app = express()

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))
