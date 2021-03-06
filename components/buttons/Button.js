import React from 'react';
import styles from './Buttons.module.css';

const Button = ({
	children,
	outlined,
	onClick,
	submit,
	text,
	secondary,
	icon,
	disabled,
	noText,
	small,
	color,
}) => {
	const mainStyle = outlined
		? styles.outlined
		: text
		? styles.textButton
		: secondary
		? styles.secondary
		: styles.button;

	const size = small ? styles.small : '';
	const clr =
		color && color == 'primary'
			? styles.colorPrimary
			: color == 'danger'
			? styles.colorDanger
			: '';

	if (disabled)
		return (
			<div className={styles.disabled}>
				{icon && <img src={`/icons/${icon}.png`} alt={icon} />}
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
		<div className={`${mainStyle} ${size} ${clr}`} onClick={onClick}>
			{icon && <img src={`/icons/${icon}.png`} alt={icon} />}
			{!noText && <p>{children}</p>}
		</div>
	);
};

export default Button;
