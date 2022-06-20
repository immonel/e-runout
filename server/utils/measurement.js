const { getConfig } = require('./config')
const status = require('./status').status
const statusInterval = 50

let statusIntervalID

let measurements = []
let calibrations = []
let io
let serial
let parser

const addNewDataPoint = (measurement, x, y) => {
  measurement.datasets[0].data.push(x)
  measurement.datasets[1].data.push(y)
  status.dataPoints += 1
}

const createMeasurement = (name, type) => {
  const config = getConfig()
  return {
    name,
    created: new Date(Date.now()),
    type,
    datasets: [
      {
        name: config.ttlSensorName,
        coefficient: config.ttlSensorCoefficient,
        data: []
      },
      {
        name: config.eddySensorName,
        coefficient: config.eddySensorCoefficient,
        data: []
      }
    ]
  }
}

const createNewCalibration = () => {
  calibrations.push(createMeasurement(String(Date.now()), 'calibration'))
  io.emit('GET_CALIBRATIONS', calibrations)
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

const handleFinishMeasurement = () => {
  parser.removeAllListeners('data')
  status.running = false
  status.dataPoints = 0

  clearInterval(statusIntervalID)
  io.emit('GET_STATUS', status)
  io.emit('GET_MEASUREMENTS', measurements)
  io.emit('GET_CALIBRATIONS', calibrations)
}

const stopMeasurement = () => {
  if (status.running) {
    serial.write('STOP')
    handleFinishMeasurement()
  }
}
const log = (data) => console.log('[teensy]', data)

const addToCalibration = (calibrationName) => {
  const config = getConfig()
  const calibration = calibrations.find(calibration => calibration.name === calibrationName)
  if (calibration && !status.running) {
    status.running = true
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

    statusIntervalID = setInterval(() => {
      io.emit('GET_STATUS', status)
    }, statusInterval)
  }
}

const startMeasurement = () => {
  const config = getConfig()
  if (!status.running) {
    status.running = true

    const newMeasurement = createMeasurement(String(Date.now()), 'measurement')
    measurements.push(newMeasurement)
    console.log(`Started a new measurement '${newMeasurement.name}'`)
    const parserCallback = (data) => readValue(data, newMeasurement)
    parser.on('data', parserCallback)
    serial.write(`SAMPLE_CYCLES ${config.cycleCount}`)

    statusIntervalID = setInterval(() => {
      io.emit('GET_STATUS', status)
    }, statusInterval)
  }
}

const getMeasurements = () => measurements

const deleteMeasurements = () => {
  measurements = []
  console.log("Deleted all measurements")
}

const deleteMeasurement = (name) => {
  measurements = measurements.filter(measurement => measurement.name !== name)
  console.log(`Deleted measurement '${name}'`)
}

const handlers = (_io, _serial, _parser) => {
  io = _io
  serial = _serial
  parser = _parser

  io.on('connection', (socket) => {
    socket.emit('GET_MEASUREMENTS', measurements)
    socket.emit('GET_CALIBRATIONS', calibrations)

    socket.on('START_MEASUREMENT', () => {
      console.log('Socket IO: Received request to start measuring')
      startMeasurement()
    })

    socket.on('CREATE_CALIBRATION', () => {
      console.log('Socket IO: Creating a new empty calibration')
      createNewCalibration()
    })

    socket.on('APPEND_CALIBRATION', (calibrationName) => {
      console.log(`Socket IO: Appending to existing calibration ${calibrationName}`)
      addToCalibration(calibrationName)
    })

    socket.on('STOP_MEASUREMENT', () => {
      console.log('Socket IO: Received request to stop measuring')
      stopMeasurement()
    })

    socket.on('DELETE_MEASUREMENT', (message) => {
      console.log('Socket IO: Received request to delete ', message.value)
      deleteMeasurement(message)
      socket.emit('GET_MEASUREMENTS', measurements)
    })

    socket.on('DELETE_MEASUREMENTS', () => {
      console.log('Socket IO: Received request to delete everything!')
      deleteMeasurements()
      socket.emit('GET_MEASUREMENTS', measurements)
    })
  })
}

module.exports = {
  handlers,
  getMeasurements
}