import React from 'react';
import moment from 'moment';
import styles from './Util.module.css';

const Text = ({ error, success, children, size, date }) => {
	if (date)
		return (
			<div className={styles.dateText}>
				<p>{moment(children).calendar()}</p>
			</div>
		);
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
