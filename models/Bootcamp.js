const mongoose = require('mongoose')
const slugify = require('slugify')

const geocoder = require('../utils/geocoder')

const BootcampSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'], // value then a custom message if the name is not supplied when Bootcamp instance is not made
    unique: true,
    trim: true, // remove any outer white spaces
    maxlength: [50, 'Name cannot be more than 50 characters']
  },
  slug: String, // a Slug is a url friendly version of the name (no white spaces between words and lowercased, etc.)
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  website: {
    type: String,
    match: [
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
      'Please use a valid URL with HTTP or HTTPS'
    ]
  },
  phone: {
    type: String,
    maxlength: [20, 'Phone number cannot be longer than 20 characters']
  },
  email: {
    type: String,
    email: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please use a valid email'
    ]
  },
  address: {
    type: String,
    required: [true, 'Please add an address']
  },
  location: {
    // GeoJSON Point
    type: {
      type: String,
      enum: ['Point'] // enum are the only possible values the type can be. Since there's only Point, Point is the only possible value
    },
    coordinates: {
      type: [Number], // type is an array of numbers (Longitude and Latitude values)
      index: '2dsphere'
    },
    formattedAddress: String,
    street: String,
    city: String,
    state: String,
    zipcode: String,
    country: String
  },
  careers: {
    // Array of strings
    type: [String],
    required: true,
    enum: [
      'Web Development',
      'Mobile Development',
      'UI/UX',
      'Data Science',
      'Business',
      'Other'
    ]
  },
  averageRating: {
    type: Number,
    min: [1, 'Rating must be at least 1'],
    max: [10, 'Rating must maxed out at 10']
  },
  averageCost: Number,
  photo: {
    type: String,
    default: 'no-photo.jpg'
  },
  housing: {
    type: Boolean,
    default: false
  },
  jobAssistance: {
    type: Boolean,
    default: false
  },
  jobGuarantee: {
    type: Boolean,
    default: false
  },
  acceptGi: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

// Create bootcamp slug from the name
BootcampSchema.pre('save', function (next) { // the next function is called to move on to the next middleware
  /*
    have to use regular functions because we're using the "this" keyword. This function basically acts as a method. 
    If we used arrow functions, it would inherits, its "this" would inherit the value of "this" outside the scope
  */
  this.slug = slugify(this.name, { lower: true }) //using the name field to create a slug and assigning it to the slug field 
  next()
})

// Geocode & create location field
BootcampSchema.pre('save', async function (next) {
  const loc = await geocoder.geocode(this.address) //returns an array with a single object containing our data
  this.location = {
    type: 'Point',
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAddress: loc[0].formattedAddress,
    street: loc[0].streetName,
    city: loc[0].city,
    state: loc[0].stateCode,
    zipcode: loc[0].zipcode,
    country: loc[0].countryCode
  }

  // Do not save address in database since we already have the location data
  this.address = undefined
  next()
})


module.exports = mongoose.model('Bootcamp', BootcampSchema)
