const v1Router = require('express').Router()

/*
  Version 1 API Router
  path: /api/v1
*/
v1Router.use('/bootcamps', require('./bootcamps'))

module.exports = v1Router