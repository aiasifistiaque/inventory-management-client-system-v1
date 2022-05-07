import Head from 'next/head';
import Image from 'next/image';
import { Router, useRouter } from 'next/router';
import { useEffect } from 'react';
import Page from '../components/nav/Page/Page';
import useAuth from '../hooks/useAuth';

export default function Home() {
	const router = useRouter();
	const auth = useAuth();
	useEffect(() => {
		if (!auth.loading) {
			if (!auth.isLoggedIn) {
				router.push('/login');
			}
		}
	}, [auth.loading]);
	if (auth.loading) return null;
	return (
		<Page selected='Dashboard'>
			<h4>Dashboard</h4>
		</Page>
	);
}
