const { getConfig } = require('./config')
const { v4: uuidv4 } = require('uuid');
const status = require('./status').status
const statusInterval = 50

let statusIntervalID

let measurements = []
let io
let serial
let parser

const addNewDataPoint = (measurement, x, y) => {
  measurement.datasets[0].data.push(x)
  measurement.datasets[1].data.push(y)
  status.dataPoints += 1
}

const createMeasurement = (opts) => {
  const config = getConfig()
  return {
    ...opts,
    created: new Date(Date.now()),
    id: uuidv4(),
    datasets: [
      {
        name: config.ttlSensorName,
        type: 'ttl',
        data: []
      },
      {
        name: config.eddySensorName,
        type: 'eddy',
        data: []
      }
    ]
  }
}

const createNewCalibration = (opts) => {
  measurements.push(createMeasurement({
    name: String(Date.now()),
    type: 'calibration',
    ...opts
  }))
  io.emit('GET_MEASUREMENTS', measurements)
}

const readValue = (data, measurement) => {
  // console.log(data)
  if (data == 0) {
    handleFinishMeasurement()
    return
  }
  if (!isNaN(data)) {
    const sensor1value = Number(BigInt.asIntN(32, BigInt(data) >> 32n))
    const sensor2value = (data >>> 16) & 0xffff
    addNewDataPoint(measurement, sensor1value, sensor2value)
  }
}

const handleStartMeasurement = () => {
  status.running = true
  status.startTime = Date.now()

  statusIntervalID = setInterval(() => {
    io.emit('GET_STATUS', status)
  }, statusInterval)
}

const handleFinishMeasurement = () => {
  parser.removeAllListeners('data')
  status.running = false
  status.dataPoints = 0
  status.startTime = 0

  clearInterval(statusIntervalID)
  io.emit('GET_STATUS', status)
  io.emit('GET_MEASUREMENTS', measurements)
}

const stopMeasurement = () => {
  if (status.running) {
    serial.write('STOP')
    handleFinishMeasurement()
  }
}
const log = (data) => console.log('[teensy]', data)

const addToCalibration = (id) => {
  const config = getConfig()
  const calibration = measurements.find(calibration => calibration.id === id)
  if (calibration && !status.running) {
    handleStartMeasurement()
    const parserCallback = (data) => readValue(data, calibration)
    parser.on('data', parserCallback)

    switch (config.sampleMode) {
      case 'continuous':
        serial.write('SAMPLE_UNTIL')
        break
      case 'cycles':
        serial.write(`SAMPLE_CYCLES ${config.cycleCount}`)
        break
      case 'once':
      default:
        serial.write('SAMPLE_ONCE')
        break
    }
  }
}

const startMeasurement = (opts) => {
  const config = getConfig()
  if (!status.running) {
    handleStartMeasurement()
    const newMeasurement = createMeasurement({
      name: String(Date.now()),
      type: 'measurement',
      regressionCoefficient: config.regressionCoefficient,
      scaleFactor: config.scaleFactor,
      ...opts
    })
    measurements.push(newMeasurement)
    console.log(`Started a new measurement '${newMeasurement.name}'`)
    const parserCallback = (data) => readValue(data, newMeasurement)
    parser.on('data', parserCallback)
    serial.write(`SAMPLE_CYCLES ${config.cycleCount}`)
  }
}

const getMeasurements = () => measurements

const deleteMeasurementsOfType = (type) => {
  measurements = measurements.filter(measurement => (
    measurement.type !== type
  ))
  console.log(`Deleted all measurements of type ${type}`)
}

const deleteMeasurement = (id) => {
  measurements = measurements.filter(measurement => measurement.id !== id)
  console.log(`Deleted measurement '${id}'`)
}

const handlers = (_io, _serial, _parser) => {
  io = _io
  serial = _serial
  parser = _parser

  io.on('connection', (socket) => {
    socket.emit('GET_MEASUREMENTS', measurements)

    socket.on('START_MEASUREMENT', (opts) => {
      console.log('Socket IO: Received request to start measuring')
      startMeasurement(opts)
    })

    socket.on('CREATE_CALIBRATION', (opts) => {
      console.log('Socket IO: Creating a new empty calibration')
      createNewCalibration(opts)
    })

    socket.on('APPEND_CALIBRATION', (id) => {
      console.log(`Socket IO: Appending to existing calibration ${id}`)
      addToCalibration(id)
    })

    socket.on('STOP_MEASUREMENT', () => {
      console.log('Socket IO: Received request to stop measuring')
      stopMeasurement()
    })

    socket.on('DELETE_MEASUREMENT', (id) => {
      console.log('Socket IO: Received request to delete measurement ', id)
      deleteMeasurement(id)
      socket.emit('GET_MEASUREMENTS', measurements)
    })

    socket.on('DELETE_MEASUREMENTS', () => {
      console.log('Socket IO: Received request to delete measurements!')
      deleteMeasurementsOfType('measurement')
      socket.emit('GET_MEASUREMENTS', measurements)
    })

    socket.on('DELETE_CALIBRATIONS', () => {
      console.log('Socket IO: Received request to delete calibrations!')
      deleteMeasurementsOfType('calibration')
      socket.emit('GET_MEASUREMENTS', measurements)
    })
  })
}

module.exports = {
  handlers,
  getMeasurements
}