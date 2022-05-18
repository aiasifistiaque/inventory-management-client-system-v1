import React from 'react';
import moment from 'moment';
import styles from './Table.module.css';
import Link from 'next/link';
import { Placeholder } from 'semantic-ui-react';

export const Table = ({ children, loading, title, isLoading }) => {
	return (
		<div className={styles.container}>
			{/* <h5>{title}</h5> */}
			{!isLoading ? <div>{children}</div> : <TablePlaceHolder />}
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

export const Item = ({ children, title, date, email }) => {
	if (title)
		return (
			<div className={styles.titleItem}>
				<h6>{children}</h6>
			</div>
		);
	return (
		<div className={styles.item}>
			<p style={email ? { textTransform: 'lowercase' } : {}}>
				{date ? moment(children).calendar() : children}
			</p>
		</div>
	);
};

const TablePlaceHolder = () => {
	return (
		<Placeholder style={{ margin: 24 }}>
			<Placeholder.Header image>
				<Placeholder.Line />
				<Placeholder.Line />
			</Placeholder.Header>
			<Placeholder.Paragraph>
				<Placeholder.Line />
				<Placeholder.Line />
				<Placeholder.Line />
				<Placeholder.Line />
			</Placeholder.Paragraph>
			<Placeholder.Paragraph>
				<Placeholder.Line />
				<Placeholder.Line />
				<Placeholder.Line />
				<Placeholder.Line />
			</Placeholder.Paragraph>
			<Placeholder.Paragraph>
				<Placeholder.Line />
				<Placeholder.Line />
				<Placeholder.Line />
				<Placeholder.Line />
			</Placeholder.Paragraph>
		</Placeholder>
	);
};
