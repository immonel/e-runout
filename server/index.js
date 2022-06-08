const app = require('./app')
const http = require('http')
const { Server } = require("socket.io", { rememberTransport: false, transports: ['WebSocket', 'Flash Socket', 'AJAX long-polling'] })
const SerialPort = require('serialport')
const Readline = SerialPort.parsers.Readline
const config = require('./utils/config').config
const serial = new SerialPort(config.serialPath)
const parser = new Readline()
serial.pipe(parser)

const log = (data) => console.log('[teensy]', data)

const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3001",
    methods: ["GET", "POST"]
  }
});

require('./utils/status').handlers(io, serial)
require('./utils/config').handlers(io, serial)
require('./utils/connections').handlers(io, serial)
require('./utils/measurement').handlers(io, serial, parser)

server.listen(3000, () => {
  console.log(`Server running on port ${3000}`)
})