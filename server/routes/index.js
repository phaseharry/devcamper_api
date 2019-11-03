const apiRouter = require('express').Router()

/*
  Main API Router
  path: /api
*/

apiRouter.use('/v1', require('./v1'))

module.exports = apiRouter