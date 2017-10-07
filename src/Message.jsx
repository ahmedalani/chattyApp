import React, { PropTypes } from 'react';

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