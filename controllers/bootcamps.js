/*
  @desc     Get all bootcamps
  @route    GET /api/v1/bootcamps
  @access   Public
*/
exports.getBootcamps = (req, res, next) => {
  res.status(200).json({ success: true, msg: 'Show all bootcamps' })
}

/*
  @desc     Get a single bootcamp
  @route    GET /api/v1/bootcamps/:id
  @access   Public
*/
exports.getBootcamp = (req, res, next) => {
  res.status(200).json({ success: true, msg: `Fetch bootcamp by ID ${req.params.id}`})
}

/*
  @desc     Create a new bootcamp
  @route    POST /api/v1/bootcamps/
  @access   Private
*/
exports.createBootcamp = (req, res, next) => {
  res.status(201).json({ success: true, msg: `creating bootcamp: ${req.body}`})
}

/*
  @desc     Update an existing bootcamp
  @route    PUT /api/v1/bootcamps/:id
  @access   Private
*/
exports.updateBootcamp = (req, res, next) => {
  res.status(201).json({ success: true, msg: `updating bootcamp: ${req.params.id}`})
}

/*
  @desc     Delete a bootcamp
  @route    DELETE /api/v1/bootcamps/:id
  @access   Private
*/
exports.deleteBootcamp = (req, res, next) => {
  res.status(200).json({ success: true, msg: `Deleting bootcamp: ${req.params.id}`})
}