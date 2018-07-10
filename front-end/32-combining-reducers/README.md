![cf](http://i.imgur.com/7v5ASc8.png) 32: Combining Reducers
===

## Learning Objectives
* Students will learn to combine reducers to simplify the management of complex application state

## Readings
* Read [combine reducers](http://redux.js.org/docs/api/combineReducers.html)

## Outline

### combineReducers
Reducers are a great tool for defining state and changes to the state of your application. However as your application state gets more complex, your reducers become hard to manage. `combineReducers` is a redux method that enables you to create a single reducer, from many reducers, that define sub states and their interactions. A state returned from a combined reducer is an object where each _sub state reducer_ defines a property on that object.
