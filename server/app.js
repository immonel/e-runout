const express = require('express')
const app = express()
const middleware = require('./utils/middleware')
const measurementsRouter = require('./api/measurements')
const cors = require('cors')

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('public'))
} else {
  app.use(express.static('../client/build'))
  app.use(cors())
}
app.use(express.json())
app.use('/api/measurements', measurementsRouter)

app.use(middleware.errorHandler)
app.use(middleware.unknownEndpoint)

module.exports = app