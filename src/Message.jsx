import React, { Component, PropTypes } from 'react';

Message.propTypes = {
	type: PropTypes.string,
	user: PropTypes.string,
	msg: PropTypes.string
};

export default function Message({ type, user, msg }) {
	return (
		<div>
			<div className="message">
				<span className="message-notification">{type}</span>
				<span className="message-username">{user}</span>
				<span className="message-content">{msg}</span>
			</div>
		</div>
	)
}

// export default class Message extends Component {
// 	static propTypes = {
// 		user: PropTypes.string,
// 		msg: PropTypes.string
// 	}

// 	render() {
// 		const {user, msg} = this.props;
// 		return (
// 			<div>
// 				<div className="message">
// 					<span className="message-username">{user}</span>
// 					<span className="message-content">{msg}</span>
// 				</div>
// 			</div>
// 		);
// 	}
// }
