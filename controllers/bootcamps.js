const Bootcamp = require('../models/Bootcamp')

/*
  @desc     Get all bootcamps
  @route    GET /api/v1/bootcamps
  @access   Public
*/
exports.getBootcamps = (req, res, next) => {
  Bootcamp.find()
    .then(bootcamps =>
      res
        .status(200)
        .json({ success: true, count: bootcamps.length, data: bootcamps })
    )
    .catch(err => {
      err.status = 400
      next(err)
    })
}

/*
  @desc     Get a single bootcamp
  @route    GET /api/v1/bootcamps/:id
  @access   Public
*/
exports.getBootcamp = (req, res, next) => {
  Bootcamp.findById(req.params.id)
    .then(bootcamp => {
      if (!bootcamp) {
        // if bootcamp is not found, send a 400 response now since ID passed in as a param is a bad ID
        return res.status(400).json({ success: false })
      }
      res.status(200).json({ success: true, data: bootcamp })
    })
    .catch(err => {
      err.status = 400
      next(err)
    })
}

/*
  @desc     Create a new bootcamp
  @route    POST /api/v1/bootcamps/
  @access   Private
*/
exports.createBootcamp = (req, res, next) => {
  Bootcamp.create(req.body)
    .then(data => {
      res.status(201).json({
        success: true,
        data
      })
    })
    .catch(err => {
      err.status = 400
      console.error(err)
      next(err)
    })
}

/*
  @desc     Update an existing bootcamp
  @route    PUT /api/v1/bootcamps/:id
  @access   Private
*/
exports.updateBootcamp = (req, res, next) => {
  Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  })
    .then(updatedBootcamp => {
      if (!updatedBootcamp) {
        // if bootcamp does not exist, return a 400 response
        return res.status(400).json({ success: false })
      }
      res.status(200).json({
        success: true,
        data: updatedBootcamp
      })
    })
    .catch(err => {
      next(err)
    })
}

/*
  @desc     Delete a bootcamp
  @route    DELETE /api/v1/bootcamps/:id
  @access   Private
*/
exports.deleteBootcamp = (req, res, next) => {
  Bootcamp.findByIdAndDelete(req.params.id)
    .then(deletedBootcamp => {
      // .findByIdAndDelete returns the deleted bootcamp prior to its deletion
      if (!deletedBootcamp) {
        // if there was no bootcamp to be found then we send back a 400 error
        return res.status(400).json({ success: false })
      }
      res.status(200).json({ success: true, data: {} })
    })
    .catch(err => {
      next(err)
    })
}
