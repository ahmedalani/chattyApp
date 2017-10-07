const express = require('express');
const SocketServer = require('ws').Server;
const uid = require('uuid');

const WebSocket = require('ws');
// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
  // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', () => console.log(`Listening on ${PORT}`));

// Create the WebSockets server
const wss = new SocketServer({ server });


//get the message from Client and parse it, add give it ID
//call Broadcast function passing the msg JSON Stringfyed
function handleMessage(data) {
  const { id = uid(), type, ...rest } = JSON.parse(data);
  switch (type) {
    case 'message': {
      const { content, username } = rest;
      if (!username) {
        return;  
      }
      const msgToBroadcast = { id, type, username, content };
      wss.broadcast(msgToBroadcast);
    }
      break;
    case 'nameChange': {
      const { username, newUsername } = rest;
      let content = ``;
      if (username === newUsername) {
        content = ``;
      } else {
        content = `${username} changed to: ${newUsername}`;
      }
      const msgToBroadcast = { id, type: 'notification', newUsername, content };
      wss.broadcast(msgToBroadcast);
    }
      break;
  }
}

function onlineUsers() {
  const onlineUsers = { type: 'onlineUser', connectedUsers: wss.clients.size };
  wss.broadcast(onlineUsers);
}

wss.broadcast = function broadcast(data) {
  const payload = JSON.stringify(data);
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(payload);
    }
  });
};

function notifyAll(content) {
  wss.broadcast({ type: 'notification', id: uid(), content });
}

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  onlineUsers();
  console.log('Client connected');
  notifyAll("New user connected")
  ws.on('message', handleMessage);
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    onlineUsers();
    console.log('Client disconnected');
    notifyAll("User had disconnected")
  });
});