const SerialPort = require('serialport')
const Readline = SerialPort.parsers.Readline

const serialPath = '/dev/ttyACM0'
const serial = new SerialPort(serialPath)
const parser = new Readline()
serial.pipe(parser)

const statusInterval = 50
let connectionIntervalID
let statusIntervalID

let measurements = require('./mockdata')
let io

const log = (data) => console.log('[teensy]', data)

serial.on('open', () => {
  status.connected = true
  clearInterval(connectionIntervalID)
  console.log('Serial port connection established for teensy')
})
serial.on('close', () => {
  status.connected = false
  console.log('Serial port connection lost for teensy')
  io.emit('GET_STATUS', status)
})
serial.on('error', error => {
  status.connected = false
  console.log('Error in serial port connection', error)
  io.emit('GET_STATUS', status)
})

parser.on('data', log)


let status = {
  serialConnectionStatus: 'Connecting...',
  serialPath: serialPath,
  running: false,
  dataPoints: 0,
  sampleSpeed: 0,
}

let config = {
  cycleCount: 3,
  coefficient: 1
}

let newMeasurement

const datasetNames = [
  "Heidenhain MT-25",
  "Heidenhain ROD-420",
  "Electrical runout"
]

const addNewDataPoint = (x, y, z) => {
  newMeasurement.datasets[0].data.push(x)
  newMeasurement.datasets[1].data.push(y)
  newMeasurement.datasets[2].data.push(z)
  status.dataPoints += 1
}

const readValue = (data) => {
  if (!data.trim()) stopMeasurement()
  
  const sensor1value = data >>> 16
  const sensor2value = data << 16 >>> 16
  const erunout = Math.abs(sensor1value - sensor2value)

  addNewDataPoint(sensor1value, sensor2value, erunout)
}

const stopMeasurement = () => {
  if (status.running) {
    parser.removeListener('data', readValue)
    parser.on('data', log)
    serial.write('STOP');
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

const startMeasurement = () => {
  if (!status.running) {
    status.running = true

    newMeasurement = {
      name: String(Date.now()),
      created: new Date(Date.now()),
      datasets: datasetNames.map(datasetName => ({
        name: datasetName,
        data: []
      }))
    }
    console.log(`Started a new measurement '${newMeasurement.name}'`)
    serial.write(`START ${config.cycleCount}`)
    parser.removeListener('data', log)
    parser.on('data', readValue)

    statusIntervalID = setInterval(() => {
      const elapsedTime = Date.now() - Date.parse(newMeasurement.created)
      status.sampleSpeed = Math.round(status.dataPoints / (elapsedTime / 1000))
      io.emit('GET_STATUS', status)
    }, statusInterval)
  }
}

const restartDevice = () => serial.write('RESTART')

const zeroEncoder = () => serial.write('ZERO')

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

    socket.on('SET_CONFIG', (newConfig) => {
      console.log('Setting config: ', newConfig)
      config = newConfig
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

    socket.on('RESTART_DEVICE', () => {
      console.log('Socket IO: Received a request to shut down teensy')
      restartDevice()
    })

    socket.on('ZERO', () => {
      console.log('Socket IO: Received a request to zero the encoder')
      zeroEncoder()
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