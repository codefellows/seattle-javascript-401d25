![cf](http://i.imgur.com/7v5ASc8.png) 43: Realtime
===

## Learning Objectives
* Students will learn to add SocketIO to an express app
* Students will learn to add realtime features to their applications

## Resources
* [SocketIO getting started](https://socket.io/get-started/chat/)
* [SocketIO docs](https://socket.io/docs/)

## Outline

### Message Exchange Patterns
In software architecture, a message pattern describes how two diffrent parts of a message communicate with each other. This can be done over a network or between pieces of code. Theses communication patterns usually fall into the `push` or `pull` models. The push model is data driven.  When the serving node has content to be published, it will send the data out without requiring a request from the recieving end. The pull model expects the serving node to wait for data to be requested by the recieving end, before sending it out.

### Publish/Subscribe (Push)
Clients connect to Services and listen for events. Services publish data on events regardless if clients are listening.

### Request/Response (Pull)
Clients connect to Services and make requests. Services respond to the requests directly with data.

### Browser Realtime
##### Websockets
Websockets are a realtime two way communication protocol over a TCP connection. Websockets are part of the HTML5 specification. They are designed to be implemented in browsers and web servers. Websocket connections are interpreted by HTTP servers as as an `UPGRADE` request. Websockets enable interaction between a browser and a webserver with lower overhead, enabling real time data transfer to and from the server. The communications are done over port 80 or 443 in case of TLS(SSL) connectoins.

##### Long Polling
Long polling is a technique used by older browesers to enable them get the effect of subscribing to the server. With long polling, the client makes a request to the server, but the server is not expected to respond immediately. The server will respond only when the information becomes available. This is not technically a true push, but it allows the emulation of a push when websockets is not possible. 

