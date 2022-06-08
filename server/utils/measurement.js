const status = require('./status').status
const config = require('./config').config
const statusInterval = 50

let statusIntervalID

let measurements = []
let io
let serial
let parser

let newMeasurement

const addNewDataPoint = (x, y) => {
  newMeasurement.datasets[0].data.push(x)
  newMeasurement.datasets[1].data.push(y)
  status.dataPoints += 1
}

const readValue = (data) => {
  // console.log(data)
  if (data == 0) stopMeasurement()
  if (!isNaN(data)) {
    const sensor1value = Number(BigInt.asIntN(32, BigInt(data) >> 32n))
    const sensor2value = (data >>> 16) & 0xffff
    addNewDataPoint(sensor1value, sensor2value)
  }
}

const stopMeasurement = () => {
  if (status.running) {
    serial.write('STOP')
    parser.removeListener('data', readValue)
    status.running = false
    status.dataPoints = 0
    status.sampleSpeed = 0
    measurements.push(newMeasurement)
    console.log(`Created a new measurement '${newMeasurement.name}' (${newMeasurement.datasets[0].data.length} samples)`)
    clearInterval(statusIntervalID)
    io.emit('GET_STATUS', status)
    io.emit('GET_MEASUREMENTS', measurements)
  }
}
const log = (data) => console.log('[teensy]', data)

const startMeasurement = () => {
  if (!status.running) {
    status.running = true

    newMeasurement = {
      name: String(Date.now()),
      created: new Date(Date.now()),
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
    serial.write(`START ${config.cycleCount}`)
    parser.on('data', readValue)
    

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
      startMeasurement()
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