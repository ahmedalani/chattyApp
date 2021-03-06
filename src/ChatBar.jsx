import React, { Component, PropTypes } from 'react';

class ChatBar extends Component {
  static propTypes = {
    username: PropTypes.string,
    changeUsername: PropTypes.func,
    addNewMessage: PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      username: props.username,
      content: ''
    }
  }

  usernameChange = (event) => {
    this.setState({ username: event.target.value });
  }

  usernameEnter = (event) => {
    const { key } = event;
    if (key === 'Enter') {
      this.props.changeUsername(this.state.username);
    }
  }

  msgChange = (event) => {
    this.setState({ content: event.target.value });
  }

  msgEntered = (event) => {
    const { key } = event;
    if (key === 'Enter') {
      this.props.addNewMessage(this.state.content);
      this.setState({ content: '' });
    }
  }

  render() {
    return (
      <div>
        <footer className="chatbar">
          <input className="chatbar-username"
            value={this.state.username}
            onChange={this.usernameChange}
            onKeyUp={this.usernameEnter}
          />
          <input className="chatbar-message" placeholder="Type a message and hit ENTER"
            value={this.state.content}
            onChange={this.msgChange}
            onKeyUp={this.msgEntered}
          />
        </footer>
      </div>
    );
  }
}

export default ChatBar;