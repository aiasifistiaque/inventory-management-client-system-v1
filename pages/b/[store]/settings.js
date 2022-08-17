import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Input from '../../../components/auth/Input';
import Page from '../../../components/nav/Page/Page';
import { DetailsTable } from '../../../components/table/Details';
import { useGetStoreDataQuery } from '../../../store/services/productService';

const SettingsPage = () => {
	const router = useRouter();
	const { store } = router.query;
	const { data, error, isError, isLoading, isFetching } =
		useGetStoreDataQuery(store);
	const [name, setName] = useState();
	const [phone, setPhone] = useState();

	const [email, setEmail] = useState();

	const [editing, setEditing] = useState(true);
	useEffect(() => {
		if (!isFetching && data) {
			setName(data?.store?.name && data.store.name);
			setPhone(data?.store?.phone && data.store.phone);
			setEmail(data?.store?.email && data.store.email);
		}
	}, [isFetching]);
	return (
		<Page selected='Settings'>
			<DetailsTable isLoading={isLoading} title='Store Information'>
				<Input
					value={name}
					onChange={e => setName(e)}
					label='Store Name'
					disabled={editing}
				/>
				<Input
					value={email}
					onChange={e => setEmail(e)}
					label='Store Email'
					disabled={editing}
				/>
				<Input
					value={parseInt(phone)}
					onChange={e => setPhone(e)}
					label='Store Phone'
					disabled={editing}
					type='number'
				/>
				<Input
					value={data?.store?.category && data.store.category}
					onChange={e => setPhone(e)}
					label='Store Category'
					disabled={true}
				/>
			</DetailsTable>
		</Page>
	);
};

export default SettingsPage;
