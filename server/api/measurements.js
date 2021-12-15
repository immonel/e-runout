const measurementsRouter = require('express').Router()
const controller = require('../utils/controller')

const downloadHeaders = (name) => ({
  "Content-Type": "application/json",
  "Content-Disposition": `${name}.json`
})

measurementsRouter.get('/', (request, response) => {
  response.json(controller.getMeasurements())
})

measurementsRouter.delete('/', (request, response) => {
  controller.deleteMeasurements()
  response.json({
    "message": "deleted everything"
  })
})

measurementsRouter.get('/:name', (request, response) => {
  const data = controller.getMeasurements().find(measurement => measurement.name === request.params.name)
  if (data) {
    if (request.query.download) {
      response.set(downloadHeaders(request.params.name))
    }
    response.json(data)
  } else {
    response.status(404).send({
      "error": "measurement not found"
    })
  }
})

measurementsRouter.delete('/:name', (request, response) => {
  controller.deleteMeasurement(request.params.name)
  response.json({
    "message": `deleted ${request.params.name}`
  })
})

module.exports = measurementsRouter