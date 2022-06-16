let status = {
  serialConnectionStatus: 'Connecting...',
  serialPath: '/dev/ttyACM0',
  running: false,
  dataPoints: 0,
  sampleSpeed: 0,
}

const handlers = (io, serial) => {
  io.on('connection', (socket) => {
    socket.emit('GET_STATUS', status)
    
    socket.on('GET_STATUS', () => {
      socket.emit('GET_STATUS', status)
    })
  })
}

module.exports = {
  status,
  handlers
}