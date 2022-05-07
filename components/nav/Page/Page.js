import React from 'react';
// import Navbar from '../navbar/Navbar';
import Sidebar from '../sidebar/Sidebar';
import styles from './Page.module.css';
import Head from 'next/head';

const Page = ({ children, selected }) => {
	return (
		<div>
			<Head>
				<title>IMS</title>
				<meta name='viewport' content='initial-scale=1.0, width=device-width' />
			</Head>
			<Sidebar selected={selected} />
			{/* <Navbar /> */}
			<main className={styles.container}>{children}</main>
		</div>
	);
};

export default Page;
