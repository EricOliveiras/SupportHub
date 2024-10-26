import {Server, Socket} from 'socket.io';
import { createServer } from "http";
import { app } from "./server";

export const server = createServer(app);
export const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  }
});

io.on('connection', (socket: Socket) => {

  socket.on('ticketUpdated', (ticket) => {
    io.emit('ticketUpdated', ticket);
  });

  socket.on('ticketCreated', (ticket) => {
    io.emit('ticketCreated', ticket);
  });

  socket.on('assignedTicket', (ticket) => {
    io.emit('assignedTicket', ticket);
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});