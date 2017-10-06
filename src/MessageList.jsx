import React, { Component } from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
	render() {
		let msgList = this.props.messages.map(msg => {
			return <Message key={msg.id} user={msg.username} msg={msg.content} />
		});
		return (
			<div>
				{msgList}
			</div>
		);
	}
}

export default MessageList;