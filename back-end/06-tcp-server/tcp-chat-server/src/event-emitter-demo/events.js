// this module is just for demo'ing event emitters and should not be used in today's lab

const EventEmitter = require('events');

const event = new EventEmitter();
const event2 = new EventEmitter();

event.on('dog', (breed, dogFood, lol, whatever) => {
  console.log(`Woof! A ${breed} just barked at me! I have ${dogFood}. ${lol}. ${whatever}`);
});

event2.on('event2', () => {
  console.log('INSIDE EVENT 2');
});

event.on('cat', (breed) => {
  console.log(`Meow. A ${breed} just meowed at me.`);
});


event.emit('cat', 'tiger');
event.emit('dog', 'collie', 'dog food', 'lol', 'whatever');
event2.emit('event2');


