const mongoose = require('mongoose')
const status = require('./status').status
const Measurement = require('../models/measurement')
const DEV_MONGODB_URI =
  `mongodb://${process.env.DEV_MONGODB_USERNAME}:${process.env.DEV_MONGODB_PASSWORD}@localhost:27017/erunout`
const MONGODB_URI = process.env.NODE_ENV === 'development' ?
  DEV_MONGODB_URI :
  process.env.MONGODB_URI

console.log('Connecting to database ', MONGODB_URI)
mongoose.connect(MONGODB_URI)
  .then(result => {
    console.log('Connected to MongoDB')
    status.dbConnectionStatus = 'Connected'
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
    status.dbConnectionStatus = 'Error connecting'
  })

const getAllMeasurements = async () => {
  const measurements = await Measurement.find({}).exec()
    .catch(error => console.log(error))
  return measurements
}

const getMeasurementsByType = async (type) => {
  const measurements = await Measurement.find({ type }).exec()
    .catch(error => console.log(error))
  return measurements
}

const getMeasurementById = async (id) => {
  const measurement = await Measurement.findById(id).exec()
    .catch(error => console.log(error))
  return measurement
}

const saveMeasurement = async (measurement) => {
  const newMeasurement = new Measurement(measurement)
  await newMeasurement.save()
    .catch(error => console.log(error))
}

const updateMeasurement = async (measurement) => {
  await Measurement.findByIdAndUpdate(measurement._id, measurement, { new: true }).exec()
    .catch(error => console.log(error))
}

const deleteMeasurementsByType = async (type) => {
  await Measurement.deleteMany({ type }).exec()
    .catch(error => console.log(error))
}

const deleteMeasurementById = async (id) => {
  await Measurement.findByIdAndRemove(id).exec()
    .catch(error => console.log(error))
}

module.exports = {
  getAllMeasurements,
  getMeasurementsByType,
  getMeasurementById,
  saveMeasurement,
  updateMeasurement,
  deleteMeasurementsByType,
  deleteMeasurementById
}