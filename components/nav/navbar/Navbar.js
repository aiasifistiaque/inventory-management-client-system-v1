import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import styles from './Navbar.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { logout, logoutAction } from '../../../store/slices/authSlice';

const Navbar = () => {
	const router = useRouter();
	const dispatch = useDispatch();
	const { toggled } = useSelector(state => state.toggle);

	return (
		<div className={toggled ? styles.toggled : styles.nav}>
			<Link href='/'>
				<h5>IMS</h5>
			</Link>
			<div className={styles.logout} onClick={() => dispatch(logout())}>
				<p>logout</p>
			</div>
		</div>
	);
};

export default Navbar;
