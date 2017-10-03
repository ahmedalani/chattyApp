import React, { Component } from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
	render() {
		console.log('rendering MessageList');
		return (
			<div>
				<Message />
			</div>
		);
	}
}

export default MessageList;