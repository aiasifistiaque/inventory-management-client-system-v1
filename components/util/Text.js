import React from 'react';

const Text = ({ error, success, children }) => {
	if (error)
		return (
			<div>
				<p style={{ color: 'crimson' }}>{children}</p>
			</div>
		);
	return (
		<div>
			<p>{children}</p>
		</div>
	);
};

export default Text;
