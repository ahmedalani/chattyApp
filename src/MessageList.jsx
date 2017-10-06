import React, { Component, PropTypes } from 'react';
import Message from './Message.jsx';

export default class MessageList extends Component {
	static propTypes = {
		messages: PropTypes.array
	}

	static defaultProps = {
		messages: []
	}

	render() {
		let msgList = this.props.messages.map(msg => {
			return <Message key={msg.id} user={msg.username} msg={msg.content} />
		});

		return (
			<div className="messages">
				{msgList}
			</div>
		);
	}
}