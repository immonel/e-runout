const config = require('./config').config
const status = require('./status').status
const reconnectionInterval = 5000
let timeoutID

const handlers = (io, serial) => {

  const reconnect = () => {
    clearTimeout(timeoutID)
    console.log(`Attempting to reconnect to MCU...`)
    serial.open((error) => {
      if (error) {
        console.log(`Error connecting to serial port ${config.serialPath}:`, error)
        console.log(`Attempting to reconnect in ${reconnectionInterval}ms`)
        timeoutID = setTimeout(reconnect, reconnectionInterval)
      }
    })
  }

  const rebootDevice = () => serial.write('REBOOT')
  const zeroEncoder = () => serial.write('ZERO')

  io.on('connection', (socket) => {
    console.log('New client connected')

    socket.on("disconnect", () => {
      console.log("Client disconnected")
    })  

    socket.on('RESTART_DEVICE', () => {
      console.log('Socket IO: Received a request to shut down teensy')
      rebootDevice()
    })

    socket.on('RECONNECT', () => {
      console.log('Socket IO: Received a request to reconnect to MCU')
      reconnect()
    })

    socket.on('ZERO', () => {
      console.log('Socket IO: Received a request to zero the encoder')
      zeroEncoder()
    })
  })

  serial.on('open', () => {
    status.serialConnectionStatus = 'Connected'
    clearTimeout(timeoutID)
    console.log('Serial port connection established for teensy')
    io.emit('GET_STATUS', status)
  })

  serial.on('close', () => {
    status.serialConnectionStatus = 'Disconnected'
    console.log('Serial port connection lost for teensy')
    reconnect()
    io.emit('GET_STATUS', status)
  })

  serial.on('error', error => {
    status.serialConnectionStatus = 'Not connected'
    console.log('Error in serial port connection', error)
    reconnect()
    io.emit('GET_STATUS', status)
  })
}

module.exports = {
  handlers
}