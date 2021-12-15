const controlRouter = require('express').Router()
const controller = require('../utils/controller')

controlRouter.get('/status', async (request, response) => {
  response.json({
    "status": controller.started ? "started" : "stopped"
  })
})

controlRouter.post('/start', async (request, response) => {
  controller.startMeasurement()
  response.json({
    "status": "started"
  })
})

controlRouter.post('/stop', async (request, response) => {
  controller.stopMeasurement()
  response.json({
    "status": "stopped"
  })
})

module.exports = controlRouter