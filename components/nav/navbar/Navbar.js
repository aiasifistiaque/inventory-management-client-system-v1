import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { tokenName } from '../../../lib/constants';
import styles from './Navbar.module.css';
import { useDispatch } from 'react-redux';
import { logout, logoutAction } from '../../../store/slices/authSlice';

const Navbar = () => {
	const router = useRouter();
	//const { data, loading, error } = useGetMyDetails();
	const dispatch = useDispatch();

	return (
		<div className={styles.nav}>
			<Link href='/'>
				<h3>IMS</h3>
			</Link>
			<div className={styles.logout} onClick={() => dispatch(logout())}>
				<p>logout</p>
			</div>
		</div>
	);
};

export default Navbar;
