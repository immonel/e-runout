const status = require('./status').status
const statusInterval = 50

let statusIntervalID

let measurements = []
let calibrations = []
let io
let serial
let parser

let newMeasurement

const addNewDataPoint = (measurement, x, y) => {
  measurement.datasets[0].data.push(x)
  measurement.datasets[1].data.push(y)
  status.dataPoints += 1
}

const readValue = (data) => {
  // console.log(data)
  if (data == 0) stopMeasurement()
  if (!isNaN(data)) {
    const sensor1value = Number(BigInt.asIntN(32, BigInt(data) >> 32n))
    const sensor2value = (data >>> 16) & 0xffff
    addNewDataPoint(newMeasurement, sensor1value, sensor2value)
  }
}

const stopMeasurement = () => {
  if (status.running) {
    serial.write('STOP')
    parser.removeListener('data', readValue)
    status.running = false
    status.dataPoints = 0
    status.sampleSpeed = 0

    if (newMeasurement.type === 'measurement') {
      measurements.push(newMeasurement)
      io.emit('GET_MEASUREMENTS', measurements)
    } else if (newMeasurement.type === 'calibration') {
      calibrations.push(newMeasurement)
      io.emit('GET_CALIBRATIONS', calibrations)
    }
    console.log(`Created a new measurement '${newMeasurement.name}' (${newMeasurement.datasets[0].data.length} samples)`)
    clearInterval(statusIntervalID)
    io.emit('GET_STATUS', status)
  }
}
const log = (data) => console.log('[teensy]', data)

const startMeasurement = (type) => {
  const config = require('./config').getConfig()
  if (!status.running) {
    status.running = true
    console.log(config)

    newMeasurement = {
      name: String(Date.now()),
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
    console.log(`Started a new measurement '${newMeasurement.name}'`)
    parser.on('data', readValue)
    
    if (type === 'calibration') {
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
    } else {
      serial.write(`SAMPLE_CYCLES ${config.cycleCount}`)
    }

    statusIntervalID = setInterval(() => {
      const elapsedTime = Date.now() - Date.parse(newMeasurement.created)
      status.sampleSpeed = Math.round(status.dataPoints / (elapsedTime / 1000))
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

    socket.on('START_MEASUREMENT', () => {
      console.log('Socket IO: Received request to start measuring')
      startMeasurement('measurement')
    })

    socket.on('START_CALIBRATION', () => {
      console.log('Socket IO: Received request to start calibration')
      startMeasurement('calibration')
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