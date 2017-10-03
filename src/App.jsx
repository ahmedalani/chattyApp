import React, { Component } from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

const data = {
  currentUser: { name: "Bob" }, // optional. if currentUser is not defined, it means the user is Anonymous
  messages: [
    {
      username: "Bob",
      content: "Has anyone seen my marbles?",
      id: 1
    },
    {
      username: "Anonymous",
      content: "No, I think you lost them. You lost your marbles Bob. You lost them for good.",
      id: 2
    }
  ]
}


class App extends Component {
  constructor(props) {
    super(props);
    this.state = data;

    this.addNewMessage = this.addNewMessage.bind(this);
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages})
    }, 1000);
  }

  //get the message content and the user from ChatBar and concatnate the new message to the state
  addNewMessage(msgContent, msgUsername) {
    const {messages} = this.state;
    let newMsg = {username: msgUsername, content: msgContent, id: messages.length +1};
    this.setState({messages: messages.concat(newMsg)});

  }
  render() {
    const {messages, currentUser} = this.state
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messages={messages}/>
        <ChatBar 
          currentUser={currentUser.name}
          getMsgFromChatBarData={this.addNewMessage}
        />
      </div>
    );
  }
}
export default App;
