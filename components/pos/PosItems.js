import React from 'react';
import moment from 'moment';
import styles from './Pos.module.css';
import Link from 'next/link';

export const PosTable = ({ children, loading, title }) => {
	return (
		<div className={styles.container}>
			{/* <h5>{title}</h5> */}
			{!loading ? <div>{children}</div> : <h6>loading...</h6>}
		</div>
	);
};

export const PosPage = ({ children }) => {
	return <div className={styles.posPage}>{children}</div>;
};

export const PosFooter = ({ children }) => {
	return <div className={styles.posFooter}>{children}</div>;
};

export const PosLeftTable = ({ children }) => {
	return <div className={styles.leftTable}>{children}</div>;
};

export const PosRightTable = ({ children }) => {
	return <div className={styles.rightTable}>{children}</div>;
};

export const PosRow = ({ children, href, title }) => {
	if (title) return <div className={styles.titleItems}>{children}</div>;
	if (href)
		return (
			<Link href={href}>
				<div className={styles.linkItems}>{children}</div>
			</Link>
		);
	return <div className={styles.items}>{children}</div>;
};

export const PosItem = ({ children, title, date, flex }) => {
	if (title)
		return (
			<div className={styles.titleItem} style={{ flex: flex || 1 }}>
				<h6>{children}</h6>
			</div>
		);
	return (
		<div className={styles.item}>
			<p>{date ? moment(children).calendar() : children}</p>
		</div>
	);
};

export const PosFooterItem = ({ children, title, date, flex }) => {
	return (
		<div className={styles.footerItem} style={{ flex: flex || 1 }}>
			<h6>{title}</h6>
			<p>{children}</p>
		</div>
	);
};

export const PosSelectQty = ({ children, title, date, inc, dec, del }) => {
	if (del)
		return (
			<div className={`${styles.selectQty} ${styles.del}`}>
				<div className={styles.rmv} onClick={e => del(e)}>
					<img src='/icons/delete.png' alt='del' />
				</div>
			</div>
		);
	return (
		<div className={styles.selectQty}>
			<div className={styles.btn} onClick={e => dec(e)}>
				<h6>-</h6>
			</div>
			<h6>{children}</h6>
			<div className={styles.btn} onClick={e => inc(e)}>
				<h6>+</h6>
			</div>
		</div>
	);
};
