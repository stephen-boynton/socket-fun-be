import express from 'express';
import socket from 'socket.io';
import uuid = require('uuid');

const app = express();
const server = require('http').Server(app);
const io = socket(server);

server.listen(3001, () => {
  console.log('Server is on...');
});

app.get('/', async (req, res) => {
  await res.send('hello');
});

io.on('connection', (socket) => {
  console.log('connected', socket.id);
  socket.on('host', () => {
    const newRoom: string = uuid.v4();
    socket.emit('joined', newRoom);
    socket.join(newRoom);
  });

  socket.on('join', () => {
    console.log(io.sockets.adapter.rooms);
  })
});
