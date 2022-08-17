const { getConfig } = require('./config')
const status = require('./status').status
const db = require('./database')
const statusInterval = 50

let statusIntervalID

let io
let serial
let parser

let currentMeasurement

const broadcastMeasurements = async () => {
  const measurements = await db.getAllMeasurements()
  io.emit('GET_MEASUREMENTS', measurements)
}

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

const createNewCalibration = async () => {
  const emptyCalibration = createMeasurement({
    name: String(Date.now()),
    type: 'calibration'
  })
  await db.saveMeasurement(emptyCalibration)
  broadcastMeasurements()
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

const handleFinishMeasurement = async () => {
  parser.removeAllListeners('data')
  status.running = false
  status.dataPoints = 0
  status.startTime = 0

  if (currentMeasurement.type === 'measurement') {
    await db.saveMeasurement(currentMeasurement)
  }
  if (currentMeasurement.type === 'calibration') {
    await db.updateMeasurement(currentMeasurement)
  }
  clearInterval(statusIntervalID)
  io.emit('GET_STATUS', status)
  broadcastMeasurements()
}

const stopMeasurement = () => {
  if (status.running) {
    serial.write('STOP')
    handleFinishMeasurement()
  }
}
const log = (data) => console.log('[teensy]', data)

const addToCalibration = async (id) => {
  const config = getConfig()
  currentMeasurement = await db.getMeasurementById(id)
  if (currentMeasurement && !status.running) {
    handleStartMeasurement()
    const parserCallback = (data) => readValue(data, currentMeasurement)
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
    currentMeasurement = createMeasurement({
      name: config.measurementName || String(Date.now()),
      type: 'measurement',
      regressionCoefficient: config.regressionCoefficient,
      scaleFactor: config.scaleFactor,
      ...(config.componentRef && {
        componentRef: config.componentRef
      })
    })
    console.log(`Started a new measurement '${currentMeasurement.name}'`)
    const parserCallback = (data) => readValue(data, currentMeasurement)
    parser.on('data', parserCallback)
    serial.write(`SAMPLE_CYCLES ${config.cycleCount}`)
  }
}

const handlers = (_io, _serial, _parser) => {
  io = _io
  serial = _serial
  parser = _parser

  io.on('connection', async (socket) => {
    const measurements = await db.getAllMeasurements()
    socket.emit('GET_MEASUREMENTS', measurements)

    socket.on('GET_MEASUREMENT_BY_ID', async (id, callback) => {
      const measurement = await db.getMeasurementById(id)
      callback(measurement)
    })

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

    socket.on('DELETE_MEASUREMENT', async (id) => {
      console.log('Socket IO: Received request to delete measurement ', id)
      await db.deleteMeasurementById(id)
      console.log(`Deleted measurement '${id}'`)
      broadcastMeasurements()
    })

    socket.on('DELETE_MEASUREMENTS', async (type) => {
      console.log(`Socket IO: Received request to delete all measurements of type ${type}!`)
      await db.deleteMeasurementsByType(type)
      console.log(`Deleted all measurements of type ${type}`)
      broadcastMeasurements()
    })
  })
}

module.exports = {
  handlers
}