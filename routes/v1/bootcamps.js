// Controllers that gets passed the req, res, and next object to handle our response
const { 
  getBootcamps, 
  getBootcamp, 
  createBootcamp, 
  updateBootcamp, 
  deleteBootcamp
} = require('../../controllers/bootcamps') 

const router = require('express').Router()
/*
  Version 1 Bootcamp Router
  path: /api/v1/bootcamps
*/

/* 
  appending the controllers to the '/api/v1/bootcamps' path so based on the
  requests that's made.
  ex) for GET request, we'll call the getBootcamps fnc & for POST request, we'll call the createBootcamp fnc
*/
router
  .route('/')
  .get(getBootcamps)
  .post(createBootcamp)

router
  .route('/:id')
  .get(getBootcamp)
  .put(updateBootcamp)
  .delete(deleteBootcamp)

module.exports = router