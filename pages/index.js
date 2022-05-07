import Head from 'next/head';
import Image from 'next/image';
import Page from '../components/nav/Page/Page';

export default function Home() {
	return (
		<Page selected='Dashboard'>
			<h4>Dashboard</h4>
		</Page>
	);
}
