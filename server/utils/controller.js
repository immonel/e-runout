let measurements = require('./mockdata')
let io

const statusInterval = 50
const dataInterval = 1
const timeout = 1 // minutes

let statusIntervalID
let dataIntervalID

let status = {
  started: false,
  sampleSize: 0,
  sampleSizeLimit: 1000,
  sampleSizeLimited: true,
  sampleSpeed: 0,
  coefficient: 1
}

let newMeasurement

const datasetNames = [
  "Heidenhain MT-25",
  "Heidenhain ROD-420",
  "Electrical runout"
]

let sensor1baseline
let sensor2baseline

const generateNewBaseline = () => {
  sensor1baseline = Math.random() * 100
  sensor2baseline = sensor1baseline - Math.random() * 5
}

const addNewDataPoint = (x, y, z) => {
  newMeasurement.datasets[0].data.push(x)
  newMeasurement.datasets[1].data.push(y)
  newMeasurement.datasets[2].data.push(z)
  status.sampleSize += 1

  if (status.sampleSizeLimited && status.sampleSize >= status.sampleSizeLimit) {
    stopMeasurement()
  }
}

const parserCallback = (data) => {
  const sensor1value = sensor1baseline - Math.random() * 2
  const sensor2value = sensor2baseline - Math.random() * 2
  const erunout = Math.abs(sensor1value - sensor2value)

  addNewDataPoint(sensor1value, sensor2value, erunout)
}

const stopMeasurement = () => {
  if (status.started) {
    status.started = false
    status.sampleSize = 0
    status.sampleSpeed = 0
    measurements.push(newMeasurement)
    console.log(`Created a new measurement '${newMeasurement.name}' (${newMeasurement.datasets[0].data.length} samples)`)
    clearInterval(statusIntervalID)
    clearInterval(dataIntervalID)
    // serialport.close()
    io.emit('GET_STATUS', status)
    io.emit('GET_MEASUREMENTS', measurements)
  }
}

const startMeasurement = () => {
  if (!status.started) {
    status.started = true
    generateNewBaseline()

    newMeasurement = {
      name: String(Date.now()),
      created: new Date(Date.now()),
      datasets: datasetNames.map(datasetName => ({
        name: datasetName,
        data: []
      }))
    }
    console.log(`Started a new measurement '${newMeasurement.name}'`)

    // serialport.on('data', parserCallback)

    statusIntervalID = setInterval(() => {
      const elapsedTime = Date.now() - Date.parse(newMeasurement.created)
      if ((elapsedTime / 1000 / 60) >= timeout) {
        stopMeasurement()
      }
      status.sampleSpeed = Math.round(status.sampleSize / (elapsedTime / 1000))
      io.emit('GET_STATUS', status)
    }, statusInterval)

    dataIntervalID = setInterval(() => {
      parserCallback()
    }, dataInterval)
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

const events = (socketio) => {
  io = socketio
  io.on('connection', (socket) => {
    socket.emit('GET_STATUS', status)
    socket.emit('GET_MEASUREMENTS', measurements)

    socket.on('SET_STATUS', (newStatus) => {
      console.log('Setting status: ', newStatus)
      status = newStatus
      io.emit('GET_STATUS', status)
    })

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
  startMeasurement,
  stopMeasurement,
  getMeasurements,
  deleteMeasurements,
  deleteMeasurement,
  events
}