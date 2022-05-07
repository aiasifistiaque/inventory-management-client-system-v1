import React from 'react';
import styles from './Buttons.module.css';

const Button = ({ children, outlined, onClick, submit, text, secondary }) => {
	if (text)
		return (
			<div className={styles.textButton} onClick={onClick}>
				<p>{children}</p>
			</div>
		);
	if (submit)
		return (
			<input
				type='submit'
				value={children}
				className={styles.button}
				style={{ fontSize: 14 }}
			/>
		);

	return (
		<div
			className={outlined ? styles.outlined : styles.button}
			onClick={onClick}>
			<p>{children}</p>
		</div>
	);
};

export default Button;
