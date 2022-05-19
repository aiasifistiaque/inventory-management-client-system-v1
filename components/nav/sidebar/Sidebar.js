import Link from 'next/link';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetStoreDataQuery } from '../../../store/services/productService';
import { expand, shrink } from '../../../store/slices/toggleSlice';
import styles from './SIdebar.module.css';

const Sidebar = ({ selected, store }) => {
	const { toggled } = useSelector(state => state.toggle);
	const dispatch = useDispatch();

	const storeData = useGetStoreDataQuery(store);

	const Section = ({ children, title }) => {
		return (
			<div className={styles.section}>
				<div className={styles.sectionTitle}>
					<p>{!toggled ? title : '...'}</p>
				</div>
				<div>{children}</div>
			</div>
		);
	};

	const Item = ({ children, selected, onClick }) => {
		const style = selected == children ? { color: '#f5f5f5' } : {};
		const ico = children.toLowerCase();
		const icon =
			selected == children ? `/icons/${ico}-selected.png` : `/icons/${ico}.png`;
		return (
			<div className={styles.item} onClick={onClick}>
				<img src={icon} alt='ico' />
				{!toggled && <a style={style}>{children}</a>}
			</div>
		);
	};

	const url = `/b/${store}`;

	return (
		<div className={!toggled ? styles.container : styles.toggle}>
			<div className={styles.logo}>
				<img
					src='/icons/toggle.png'
					onClick={() => {
						if (!toggled) {
							dispatch(shrink());
						} else {
							dispatch(expand());
						}
					}}
				/>
				{!toggled && (
					<Link href={`${url}`}>
						<h6>{storeData?.data?.store?.name && storeData.data.store.name}</h6>
					</Link>
				)}
			</div>
			<div className={styles.items}>
				<Link href={`${url}/`}>
					<Item selected={selected}>Dashboard</Item>
				</Link>

				<Section title={'Sales & Purchase'}>
					<Link href={`${url}/sales`}>
						<Item selected={selected}>Sales</Item>
					</Link>
					<Link href={`${url}/purchases`}>
						<Item selected={selected}>Purchases</Item>
					</Link>
					<Link href={`${url}/expenses`}>
						<Item selected={selected}>Expenses</Item>
					</Link>
				</Section>

				<Section title='Product Info'>
					<Link href={`${url}/products`}>
						<Item selected={selected}>Products</Item>
					</Link>
					<Link href={`${url}/categories`}>
						<Item selected={selected}>Categories</Item>
					</Link>
					<Link href={`${url}/brands`}>
						<Item selected={selected}>Brands</Item>
					</Link>
				</Section>
				<Section title='Entities'>
					<Link href={`${url}/employees`}>
						<Item selected={selected}>Employees</Item>
					</Link>
					<Link href={`${url}/customers`}>
						<Item selected={selected}>Customers</Item>
					</Link>
					<Link href={`${url}/suppliers`}>
						<Item selected={selected}>Suppliers</Item>
					</Link>
				</Section>
				<Section title={'Stats & Reports'}>
					<Link href={`${url}/stats`}>
						<Item selected={selected}>Stats</Item>
					</Link>
					<Link href={`${url}/daily`}>
						<Item selected={selected}>Daily</Item>
					</Link>
					<Link href={`${url}/weekly`}>
						<Item selected={selected}>Weekly</Item>
					</Link>
					<Link href={`${url}/monthly`}>
						<Item selected={selected}>Monthly</Item>
					</Link>
					<Link href={`${url}/yearly`}>
						<Item selected={selected}>Yearly</Item>
					</Link>
				</Section>
				<Link href={`${url}/settings`}>
					<Item selected={selected}>Settings</Item>
				</Link>
				<Link href={`${url}/activity-log`}>
					<Item selected={selected}>Activity log</Item>
				</Link>
			</div>{' '}
		</div>
	);
};

export default Sidebar;
