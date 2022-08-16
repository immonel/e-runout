const mongoose = require('mongoose')

const measurementSchema = mongoose.Schema({
  id: { type: String },
  name: { type: String, required: true },
  type: {
    type: String,
    enum: ['measurement', 'calibration'],
    required: true
  },
  created: { type: String, required: true },
  componentRef: { type: String },
  regressionCoefficient: { type: Number },
  scaleFactor: { type: Number },
  datasets: [{
    name: { type: String, required: true },
    type: {
      type: String,
      enum: ['ttl', 'eddy', 'erunout'],
      required: true
    },
    data: [ Number ]
  }]
},
{
  collection: 'measurements'
})

measurementSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Measurement = mongoose.model('Measurement', measurementSchema)

module.exports = Measurement