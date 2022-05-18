import Link from 'next/link';
import React from 'react';
import styles from './Card.module.css';

export const Cards = ({ children }) => {
	return <div className={styles.cards}>{children}</div>;
};

export const Card = ({ children, image, onClick, w }) => {
	return (
		<div
			className={`${styles.card} ${onClick && styles.clickable}`}
			style={{ width: w ? w : '100%' }}
			onClick={onClick}>
			<div className={styles.image}>
				<img src={image ? image : '/placeholder.png'} />
			</div>
			<div className={styles.main}>{children}</div>
		</div>
	);
};

export const CardTitle = ({ children, image }) => {
	return (
		<div className={styles.cardTitle}>
			<h6>{children}</h6>
		</div>
	);
};

export const CardItem = ({ children, sub, danger, small, href }) => {
	if (href)
		return (
			<Link href={href}>
				<div className={styles.link}>
					<a>{children}</a>
				</div>
			</Link>
		);
	if (danger)
		return (
			<div className={styles.danger}>
				<p>{children}</p>
			</div>
		);
	if (sub)
		return (
			<div className={styles.sub}>
				<p>{children}</p>
			</div>
		);
	if (small)
		return (
			<div className={styles.small}>
				<p>{children}</p>
			</div>
		);
	return (
		<div className={styles.cardItem}>
			<p>{children}</p>
		</div>
	);
};
