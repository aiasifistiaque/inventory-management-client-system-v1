import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import Button from '../components/buttons/Button';
import { Card, CardItem, Cards, CardTitle } from '../components/card/Card';
import Section from '../components/container/Section';
import Page from '../components/nav/Page/Page';
import { DetailsTable } from '../components/table/Details';
import { Hr, Mb, Mt } from '../components/util/Margins';
import useAuth from '../hooks/useAuth';
import { useGetMyStoresQuery } from '../store/services/productService';

const Landingpage = () => {
	const router = useRouter();
	const auth = useAuth();
	const { data, isLoading, isError } = useGetMyStoresQuery();
	useEffect(() => {
		if (!auth.loading) {
			if (!auth.isLoggedIn) {
				router.push('/login');
			}
		}
	}, [auth.loading]);
	if (auth.loading || !auth.isLoggedIn) return null;

	return (
		<Page landing={true}>
			<Section vertical flex={1}>
				<Section horizontal justify='space-between' flex={0.1}>
					<h4>Projects</h4>
					<Btn />
				</Section>
				<Section>
					<DetailsTable isLoading={isLoading}>
						{data?.data?.length > 0 ? (
							<Cards>
								{data?.data &&
									data.data.map((item, i) => (
										<Card key={i} w={300}>
											<CardTitle>
												{item?.store?.name && item.store.name}
											</CardTitle>
											<CardItem small>
												Store id: {item?.store?._id && item.store._id}
											</CardItem>
											<CardItem small>
												Type: {item?.store?.category && item.store.category}{' '}
												Store
											</CardItem>
											<Mt size={16} />
											<Hr />
											<CardItem>Role: {item?.role && item.role}</CardItem>
											<CardItem link href={`/b/${item.store._id}`}>
												Visit Store
											</CardItem>
										</Card>
									))}
							</Cards>
						) : (
							<Section justify='center' align='center' pt={64}>
								<h4>You do not have any projects yet</h4>
								<Mb size={8} />
								<Btn />
							</Section>
						)}
					</DetailsTable>
				</Section>
			</Section>
		</Page>
	);
};

const Btn = () => {
	return (
		<Link href='/addproject'>
			<Button icon='create-white'>Create Project</Button>
		</Link>
	);
};

export default Landingpage;
