import React from 'react';
import moment from 'moment';
import styles from './Table.module.css';
import Link from 'next/link';

export const Table = ({ children, loading, title }) => {
	return (
		<div className={styles.container}>
			{/* <h5>{title}</h5> */}
			{!loading ? <div>{children}</div> : <h6>loading...</h6>}
		</div>
	);
};

export const Contain = ({ children }) => {
	return <div className={styles.contain}>{children}</div>;
};

export const Row = ({ children, href, title }) => {
	if (title) return <div className={styles.titleItems}>{children}</div>;
	if (href)
		return (
			<Link href={href}>
				<div className={styles.linkItems}>{children}</div>
			</Link>
		);
	return <div className={styles.items}>{children}</div>;
};

export const Item = ({ children, title, date }) => {
	if (title)
		return (
			<div className={styles.titleItem}>
				<h6>{children}</h6>
			</div>
		);
	return (
		<div className={styles.item}>
			<p>{date ? moment(children).calendar() : children}</p>
		</div>
	);
};
