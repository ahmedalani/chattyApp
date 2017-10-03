import React, { Component } from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.currentUser,
      content: ''
    }
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.msgEntered = this.msgEntered.bind(this);
    this.changeContent = this.changeContent.bind(this);
  }

  handleUsernameChange(event) {
    this.setState({username: event.target.value});
  }

  changeContent(event) {
    this.setState({content: event.target.value});
  }

  msgEntered(event) {
    // this.setState({content: event.target.value});
    if (event.key === 'Enter') {
      this.props.getMsgFromChatBarData(this.state.content, this.state.username); 
      this.setState({content: ''});      
    }
  }

  render() {
    return (
      <div>
        <footer className="chatbar">
          <input className="chatbar-username" 
            value={this.state.username} onChange={this.handleUsernameChange}
          />
          <input className="chatbar-message" placeholder="Type a message and hit ENTER"
             value={this.state.content}
             onKeyUp={this.msgEntered}
             onChange={this.changeContent}
            // onKeyPress={check if keyPressed is ENTER, pass the data to the App component} 
          />
        </footer>
      </div>
    );
  }
}

export default ChatBar;