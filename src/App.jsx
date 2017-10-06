import React, { Component } from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      connectedUsers: 0,
      username: '',
      messages: [
        {
          id: '',
          username: '',
          content: ''
        }
      ]
    };

    this.addNewMessage = this.addNewMessage.bind(this);
    this.changeUsername = this.changeUsername.bind(this);
  }

  componentDidMount() {
    this.socket = new WebSocket('ws://0.0.0.0:3001');
    this.socket.onopen = function () {
      console.log('connection open');
    }

    this.socket.onmessage = (event) => {
      const { id, type, content, ...rest } = JSON.parse(event.data);
      switch (type) {
        case 'message': {
          const { username } = rest;
          let newMsg = { id, type, username, content };
          this.setState({ username, messages: this.state.messages.concat(newMsg) });
        }
          break;
        case 'notification': {
          const { newUsername } = rest;
          let newMsg = { id, type, username: newUsername, content };
          this.setState({ username: newUsername, messages: this.state.messages.concat(newMsg) });
        }
          break;
        case 'onlineUser': {
          const { connectedUsers } = rest;
          this.setState({connectedUsers});
        }
          break;
      }
    }
  }

  //when user change info the function get called in the Chatbar component passing
  //the data. the function will send the notification to the server to broadcast
  changeUsername(newName) {
    const { username } = this.state;
    this.setState({ username: newName });
    let newMsg = { type: 'nameChange', username, newUsername: newName };
    this.socket.send(JSON.stringify(newMsg));
  }

  //get the message content and the user from ChatBar and send it to the server
  addNewMessage(msgUsername, msgContent) {
    let newMsg = { type: 'message', username: msgUsername, content: msgContent };
    this.socket.send(JSON.stringify(newMsg));
  }

  render() {
    const { connectedUsers, messages } = this.state
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <div className="connectedUsers"> {connectedUsers} users Online </div>
        </nav>
        <MessageList messages={messages} />
        <ChatBar
          addNewMessage={this.addNewMessage}
          changeUsername={this.changeUsername}
        />
      </div>
    );
  }
}
export default App;