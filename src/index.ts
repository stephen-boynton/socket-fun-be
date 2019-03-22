import express from 'express';
import socket from 'socket.io';

const app = express();
const server = require('http').Server(app);
const io = socket(server);

// var app = require('express')();
// var server = require('http').Server(app);
// var io = require('socket.io')(server);

server.listen(3001, () => {
  console.log('Server is on...');
});
// WARNING: app.listen(80) will NOT work here!

app.get('/', async (req, res) => {
  await res.send('hello');
});

io.on('connection', (socket) => {
  console.log('what up what up')
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});
