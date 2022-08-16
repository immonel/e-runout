import { io } from "socket.io-client"
const baseUrl = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3000'
export const socket = io(baseUrl, { transports: ['websocket', 'polling'] })