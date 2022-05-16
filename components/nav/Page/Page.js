import React from 'react';
import Navbar from '../navbar/Navbar';
import Sidebar from '../sidebar/Sidebar';
import styles from './Page.module.css';
import Head from 'next/head';
import { useSelector } from 'react-redux';

const Page = ({ children, selected }) => {
	const { toggled } = useSelector(state => state.toggle);
	return (
		<div>
			<Head>
				<title>IMS</title>
				<meta
					name='viewport'
					content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0'
				/>
			</Head>
			<Sidebar selected={selected} />
			<Navbar />
			<main className={toggled ? styles.toggled : styles.container}>
				{children}
			</main>
		</div>
	);
};

export default Page;
