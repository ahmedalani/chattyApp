import React, { Component, PropTypes } from 'react';

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

export default function Message({user, msg}) {
	return (
		<div>
			<div className="message">
				<span className="message-username">{user}</span>
				<span className="message-content">{msg}</span>
			</div>
		</div>	
	)
}

Message.propTypes = {
		user: PropTypes.string,
		msg: PropTypes.string
};