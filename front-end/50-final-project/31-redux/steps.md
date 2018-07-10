# How to think about adding Redux to an app

- Think about the actiosn you will suport
  - CRUD?
  - Define payloads
- Implement Reducers
  - remember to define default values
  - add a switch statement to your reducer
  - implement all cases



 # How to think about connecting to the State?
 - Do I need all the state or just a sinple item?
   - All the state -> connect
   - A single item -> reconsider

 - If you are trying to connect to dispatch
   - Be as specific as possible
