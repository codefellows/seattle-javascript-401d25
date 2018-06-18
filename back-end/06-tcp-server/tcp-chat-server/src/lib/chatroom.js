'use strict';
const EventEmitter = require('events');
const net = require('net');
const logger = require('./logger');
const User = require('./../model/user');


const PORT = process.env.PORT || 3000;

const server = net.createServer();
const event = new EventEmitter();
const socketPool = {};

const parseData = (buffer) => {
  let text = buffer.toString().trim();
  if (!text.startsWith('@')) return null;
  text = text.split(' '); // this makes a new array shaped like [ '@command', 'message'] where it splits the string ino an array based on a passed in "seperator", in this case white space


  // const command = text[0];

  // this is the same as above line
  const [command] = text;
  // text.slice(1) = ['message']
  // const ['message'] = text.slice(1);
   // text.slice(1).join(' ') = 'message'
  const message = text.slice(1).join(' '); // changes an array such as ['i', 'entered', 'a', 'chatroom'] to "I entered a chatroom"
  
  logger.log(logger.INFO, `THIS IS THE MESSAGE: ${command}`);
  logger.log(logger.INFO, `THIS IS THE MESSAGE: ${message}`);

  // return {
  //   command: command,
  //   message: message,
  // }

  // same as above with ES6 object destructuring
  return {
    command,
    message,
  };
  // this will return an object that looks like this:
  /*
  {
    command: '@all',
    message: 'something',
  }

  */
};

const dispatchAction = (user, buffer) => {
  const entry = parseData(buffer);
  console.log(entry, 'THIS IS THE ENTRY');
  if (entry) event.emit(entry.command, entry, user);
};

// these are all the event listeners
event.on('@all', (data, user) => {
  logger.log(logger.INFO, data);
  Object.keys(socketPool).forEach((userIdKey) => {
    const targetedUser = socketPool[userIdKey];
    targetedUser.socket.write(`<${user.nickname}>: ${data.message}`);
  });
});

event.on('@nick', (data, user) => {
  logger.log(logger.INFO, data);
  socketPool[user._id].nickname = data.message;
  user.socket.write(`You have changed your user name to ${data.message}\n`);
});

// returns a list of all users in the chat
event.on('@users', (data, user) => {
  logger.log(logger.INFO, data);
  Object.keys(socketPool).forEach((userIdKey) => {
    user.socket.write(`${socketPool[userIdKey].nickname}\n`);
  });
});

server.on('connection', (socket) => {
  const user = new User(socket);
  socket.write(`Welcome to the chatroom, ${user.nickname}!\n`);
  // keep a record of that user in our socketPool by making a  new key value pair that looks like this:
  // { 'dafsaed922919101: { 
  //   _id: dafsaed922919101,
  //   nickname: User no. dafsaed922919101,
  //   socket: really big object
  // }}
  socketPool[user._id] = user;
  logger.log(logger.INFO, `A new user ${user.nickname} has entered the chatroom!`);

  socket.on('data', (buffer) => {
    dispatchAction(user, buffer);
  });
});

server.listen(PORT, () => {
  logger.log(logger.INFO, `Server up on PORT: ${PORT}`);
});



