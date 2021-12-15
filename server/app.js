const express = require('express')
const app = express()
const measurementsRouter = require('./api/measurements')
const controlRouter = require('./api/control')
const middleware = require('./utils/middleware')
const cors = require('cors')

app.use(express.static('../client/build'))
app.use(express.json())
app.use(cors())

app.use('/api/measurements', measurementsRouter)
app.use('/api/control', controlRouter)

app.use(middleware.errorHandler)
app.use(middleware.unknownEndpoint)

module.exports = app