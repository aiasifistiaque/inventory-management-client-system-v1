import React from 'react';
import styles from './Unit.module.css';

export const UnitBox = ({ children, isLoading }) => {
	if (isLoading) return null;
	return <div className={styles.container}>{children}</div>;
};

export const Unit = ({ children, title }) => {
	return (
		<div className={styles.unit}>
			<h6>{title}</h6>
			{children}
		</div>
	);
};

export const UnitLayer = ({ children, title }) => {
	return (
		<div className={styles.layer}>
			<h5>{title}</h5>
			<div className={styles.unitItems}>{children}</div>
		</div>
	);
};

export const UnitItem = ({ children, title, value }) => {
	return (
		<div className={styles.item}>
			<p>
				{title && `${title}: `}
				{value && 'Tk. '}
				{children}
			</p>
		</div>
	);
};
