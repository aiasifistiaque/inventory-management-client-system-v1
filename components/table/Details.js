import React from 'react';
import moment from 'moment';
import styles from './Table.module.css';
import Link from 'next/link';

export const DetailsTable = ({ children, loading, title }) => {
	return (
		<div
			className={styles.container}
			style={{
				padding: `${24}px ${32}px`,
			}}>
			<h5>{title}</h5>
			{!loading ? <div>{children}</div> : <h6>loading...</h6>}
		</div>
	);
};

export const DetailsContainer = ({ children }) => {
	return <div className={styles.contain}>{children}</div>;
};

export const DetailsRow = ({ children, href }) => {
	if (href)
		return (
			<Link href={href}>
				<div className={styles.linkItems}>{children}</div>
			</Link>
		);
	return <div className={styles.items}>{children}</div>;
};

export const DetailsItem = ({ children, title, date }) => {
	return (
		<div className={styles.item}>
			<h6>{title}</h6>
			<p>{date ? moment(children).calendar() : children}</p>
		</div>
	);
};
