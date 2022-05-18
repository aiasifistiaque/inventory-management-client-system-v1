import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import styles from './Navbar.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { logout, logoutAction } from '../../../store/slices/authSlice';
import {
	useGetSelfQuery,
	useGetStoreDataQuery,
} from '../../../store/services/productService';
import { Dropdown } from 'semantic-ui-react';

const Navbar = ({ landing }) => {
	const router = useRouter();
	const dispatch = useDispatch();
	const { toggled } = useSelector(state => state.toggle);
	const { data, isLoading, error } = useGetSelfQuery();
	const logoutFn = () => {
		dispatch(logout());
	};

	const storeData = useGetStoreDataQuery(router.query.store);

	return (
		<div
			className={
				landing ? styles.landing : toggled ? styles.toggled : styles.nav
			}>
			<div className={styles.title}>
				<Link href={`/`}>
					<a>Thinkventory Home</a>
				</Link>
				{router.query.store && (
					<Link href={`/b/${router.query.store}`}>
						<a>/{storeData?.data?.store?.name && storeData.data.store.name}</a>
					</Link>
				)}
			</div>

			{!isLoading && !error && (
				<div className={styles.logout}>
					<Dropdown text={data.name}>
						<Dropdown.Menu>
							<Link href='/profile'>
								<Dropdown.Item text='View Profile' />
							</Link>
							<Dropdown.Item text='Settings' />
							<Dropdown.Item text='logout' onClick={() => dispatch(logout())} />
						</Dropdown.Menu>
					</Dropdown>
				</div>
			)}
		</div>
	);
};

export default Navbar;
