import React, { useEffect } from 'react';
import Navbar from '../navbar/Navbar';
import Sidebar from '../sidebar/Sidebar';
import styles from './Page.module.css';
import Head from 'next/head';
import { useDispatch, useSelector } from 'react-redux';
import { useGetStoreDataQuery } from '../../../store/services/productService';
import { useRouter } from 'next/router';
import { employeeRole, select } from '../../../store/slices/storeSlice';

const Page = ({
	children,
	selected,
	landing,
	store,
	full,
	error,
	isError,
	isFetching,
	isLoading,
}) => {
	const router = useRouter();
	const { toggled } = useSelector(state => state.toggle);
	const st = router.query.store;
	const storeData = useGetStoreDataQuery(st ? st : 'blank');
	const dispatch = useDispatch();

	useEffect(() => {
		if (st) {
			dispatch(select({ _id: st }));
		}
	}, [st]);

	useEffect(() => {
		if (!storeData.isFetching && storeData?.data?.role) {
			dispatch(employeeRole({ role: storeData.data.role }));
		}
	}, [storeData.isFetching]);

	return (
		<div>
			<Head>
				<title>IMS</title>
				<meta
					name='viewport'
					content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0'
				/>
			</Head>
			{!landing && <Sidebar selected={selected} store={st} />}
			<Navbar landing={landing} />
			<LoadPage
				landing={landing}
				toggled={toggled}
				error={error}
				isError={isError}
				isLoading={isLoading}
				isFetching={isFetching}>
				{children}
			</LoadPage>
		</div>
	);
};

const LoadPage = ({
	children,
	landing,
	toggled,
	isLoading,
	error,
	isError,
	data,
}) => {
	if (isError)
		return (
			<main
				className={
					landing ? styles.landing : toggled ? styles.toggled : styles.container
				}>
				<div
					style={{
						display: 'flex',
						flex: 1,
						alignItems: 'center',
						justifyContent: 'center',
					}}>
					<h5 style={{ color: 'crimson' }}>
						{error?.data?.message
							? error.data.message
							: error?.data
							? error.data
							: error}
					</h5>
				</div>
			</main>
		);
	return (
		<main
			className={
				landing ? styles.landing : toggled ? styles.toggled : styles.container
			}>
			{children}
		</main>
	);
};

export default Page;
