const Bootcamp = require('../models/Bootcamp')
const ErrorResponse = require('../utils/errorResponse')

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
        // if bootcamp is not found (but the _id is formatted correctly), pass it to the custom errorHandling middleware
        return next(
          new ErrorResponse(
            `Bootcamp not found with id of ${req.params.id}`,
            404
          )
        )
      }
      res.status(200).json({ success: true, data: bootcamp })
    })
    .catch(err => {
      // if the _id is not formatted correctly, then this .catch will run
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
        return next(
          new ErrorResponse(
            `Bootcamp not found with id of ${req.params.id}`,
            404
          )
        )
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
        return next(
          new ErrorResponse(
            `Bootcamp not found with id of ${req.params.id}`,
            404
          )
        )
      }
      res.status(200).json({ success: true, data: {} })
    })
    .catch(err => {
      next(err)
    })
}
