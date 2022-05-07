import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import useGetMyDetails from '../../../hooks/useGetMyDetails';
import { tokenName } from '../../../lib/constants';
import styles from './Navbar.module.css';

const Navbar = () => {
	const router = useRouter();
	const { data, loading, error } = useGetMyDetails();
	const logout = () => {
		localStorage.removeItem(tokenName);
		router.push('/login');
	};
	return (
		<div className={styles.nav}>
			<Link href='/'>
				<h3>{!loading ? data.name : ''}</h3>
			</Link>
			<div className={styles.logout} onClick={logout}>
				<p>logout</p>
			</div>
		</div>
	);
};

export default Navbar;
