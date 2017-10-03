import React, { Component } from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
	render() {
		let msgList = this.props.messages.map(message => {
			return <Message key={message.id} msg={message.content} user={message.username} />
		});

		return (
			<div>
				{msgList}
			</div>
		);
	}
}

export default MessageList;