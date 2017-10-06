import React, { Component } from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      connectedUsers: 0,
      username: 'Anonymous',
      messages: [
        // {
        //   id: '',
        //   username: '',
        //   content: ''
        // }
      ]
    };
  }

  componentDidMount() {
    this.socket = new WebSocket(`ws://${location.hostname}:3001`);
    this.socket.onopen = function () {
      console.log('connection open');
    }

    this.socket.onmessage = (event) => {
      const { id, type, content, ...rest } = JSON.parse(event.data);
      switch (type) {
        case 'message': {
          const { username } = rest;
          let newMsg = { id, type, username, content };
          this.appendMessage(newMsg);
        }
          break;
        case 'notification': {
          const { newUsername } = rest;
          let newMsg = { id, type, username: newUsername, content };
          this.appendMessage(newMsg);
        }
          break;
        case 'onlineUser': {
          const { connectedUsers } = rest;
          this.setState({ connectedUsers });
        }
          break;
      }
    }
  }

  appendMessage(message) {
    this.setState({ messages: [...this.state.messages, message]});
  }

  sendData(payload) {
    this.socket.send(JSON.stringify(payload));
  }

  //when user change info the function get called in the Chatbar component passing
  //the data. the function will send the notification to the server to broadcast
  changeUsername = (newUsername) => {
    const { username } = this.state;
    this.setState({ username: newUsername });
    this.sendData({ type: 'nameChange', username, newUsername });
  }

  //get the message content and the user from ChatBar and send it to the server
  addNewMessage = (content) => {
    this.sendData({ type: 'message', username: this.state.username, content });
  }

  render() {
    const { connectedUsers, messages, username } = this.state
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <div className="connectedUsers"> {connectedUsers} users Online </div>
        </nav>
        <MessageList messages={messages} />
        <ChatBar
          username={username}
          addNewMessage={this.addNewMessage}
          changeUsername={this.changeUsername}
        />
      </div>
    );
  }
}