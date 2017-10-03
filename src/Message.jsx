import React, { Component } from 'react';

class Message extends Component {
	render() {
		const {user, msg} = this.props;
		return (
			<div>
				<div className="message">
					<span className="message-username">{user}</span>
					<span className="message-content">{msg}</span>
				</div>
			</div>
		);
	}
}

export default Message;