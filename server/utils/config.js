let config = {
  cycleCount: 1,
  ttlSensorName: 'Heidenhain MT-25',
  ttlSensorCoefficient: 0.01,
  eddySensorName: 'Eddy Current Probe',
  eddySensorCoefficient: 1,
  serialPath: '/dev/ttyACM0'
}

const handlers = (io, serial) => {
  io.on('connection', (socket) => {

    socket.on('SET_CONFIG', (newConfig) => {
      console.log('Setting config: ', newConfig)
      config = newConfig
      io.emit('GET_CONFIG', config)
    })
  
    socket.on('GET_CONFIG', () => {
      socket.emit('GET_CONFIG', config)
    })
  })
}

const getConfig = () => config

module.exports = {
  config,
  getConfig,
  handlers
}