const app = require('./app')
const http = require('http')
const { Server } = require("socket.io", { rememberTransport: false, transports: ['WebSocket', 'Flash Socket', 'AJAX long-polling'] })

const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3001",
    methods: ["GET", "POST"]
  }
});

require('./utils/controller.js').events(io)

io.on("connection", (socket) => {
  console.log("New client connected")
  socket.on("disconnect", () => {
    console.log("Client disconnected")
  })
})

server.listen(3000, () => {
  console.log(`Server running on port ${3000}`)
})