const mongoose = require('mongoose')

const measurementSchema = mongoose.Schema({
  name: { type: String, required: true },
  data: [{
    timestamp: { type: Date, required: true },
    values: [{
      name: { type: String, required: true },
      value: { type: Number, required: true }
    }]
  }]
})

const Measurement = mongoose.model('Measurement', measurementSchema)

module.exports = Measurement