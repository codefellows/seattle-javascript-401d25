![cf](http://i.imgur.com/7v5ASc8.png) 36: Asynchronous Actions
===

## Learning Objectives
* Students will be able to create thunk middleware for redux
* Students will be able to create asynchronous actions

## Readings
* [async actions](http://redux.js.org/docs/advanced/AsyncActions.html)

## Outline

### Redux Thunk
Redux thunk middleware allows you to dispatch function actions. Function actions will have access to `dispatch`, and `getState`. These function actions can trigger async events that dispatch new actions when they are completed. This is often used to make AJAX requests to the an HTTP server.

### Thunk Middleware Example
``` javascript
// thunk middleware
export default store => next => action =>
  typeof action === 'function'
  ? action(store.dispatch, store.getState)
  : next(action)
```
