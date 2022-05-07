import Link from 'next/link';
import React from 'react';
import styles from './SIdebar.module.css';

const Sidebar = ({ selected }) => {
	return (
		<div className={styles.container}>
			<div className={styles.logo}>
				<img src='/logo.png' />
			</div>

			<div className={styles.items}>
				<Link href='/'>
					<Item selected={selected}>Dashboard</Item>
				</Link>
				<Link href='/products'>
					<Item selected={selected}>Products</Item>
				</Link>
				<Link href='/categories'>
					<Item selected={selected}>Categories</Item>
				</Link>
				<Link href='/brands'>
					<Item selected={selected}>Brands</Item>
				</Link>
			</div>
		</div>
	);
};

const Item = ({ children, selected, onClick }) => {
	return (
		<div className={styles.item} onClick={onClick}>
			<a style={selected == children ? { color: '#f5f5f5' } : {}}>{children}</a>
		</div>
	);
};

export default Sidebar;
