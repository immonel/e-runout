const config = require('./config').config
const status = require('./status').status
let connectionIntervalID

const handlers = (io, serial) => {

  const restartDevice = () => serial.write('RESTART')
  const zeroEncoder = () => serial.write('ZERO')

  io.on('connection', (socket) => {
    console.log('New client connected')
    socket.emit('GET_STATUS', status)
    socket.emit('GET_CONFIG', config)

    socket.on("disconnect", () => {
      console.log("Client disconnected")
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

  serial.on('open', () => {
    status.serialConnectionStatus = 'Connected'
    clearInterval(connectionIntervalID)
    console.log('Serial port connection established for teensy')
  })

  serial.on('close', () => {
    status.serialConnectionStatus = 'Disconnected'
    console.log('Serial port connection lost for teensy')
    io.emit('GET_STATUS', status)
  })

  serial.on('error', error => {
    status.serialConnectionStatus = 'Not connected'
    console.log('Error in serial port connection', error)
    io.emit('GET_STATUS', status)
  })
}

module.exports = {
  handlers
}