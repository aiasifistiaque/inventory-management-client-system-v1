import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Page from '../components/nav/Page/Page';
import {
	useAddCategoryMutation,
	useAddStoreMutation,
} from '../store/services/productService';
import { DetailsTable } from '../components/table/Details';
import Input from '../components/auth/Input';
import Button from '../components/buttons/Button';
import Text from '../components/util/Text';

const catData = [
	{ _id: 'Pharmacy', name: 'Pharmacy' },
	{ _id: 'Retail', name: 'Retail' },
	{ _id: 'E-commerce', name: 'E-commerce' },
	{ _id: 'General', name: 'General' },
	{ _id: 'Grocery', name: 'Grocery' },
	{ _id: 'Beauty Products', name: 'Beauty Products' },
	{ _id: 'Electronics', name: 'Electronics' },
];

const Addproject = () => {
	const router = useRouter();
	const [name, setName] = useState();
	const [category, setCategory] = useState();

	const [addStore, result] = useAddStoreMutation();
	const { isLoading, isSuccess, isError } = result;

	const submitForm = async e => {
		e.preventDefault();
		addStore({
			name,
			category,
		});
	};

	useEffect(() => {
		if (isSuccess) {
			router.push('/');
		}
	}, [isSuccess]);

	return (
		<div>
			<Page landing selected='Categories'>
				<DetailsTable title='Add New Store'>
					<form style={{ marginTop: 32 }} onSubmit={submitForm}>
						<Input
							label='Store Name'
							value={name}
							onChange={e => setName(e)}
							placeholder='Name of your store'
							required
						/>
						<Input
							label='Store Category'
							value={category}
							onChange={e => setCategory(e)}
							placeholder='Category of your store'
							required
							select
							data={catData}
						/>

						{isLoading ? (
							<Button>processing...</Button>
						) : (
							<Button submit>Create Store</Button>
						)}
					</form>
					{isError && <Text error>There was an error</Text>}
				</DetailsTable>
			</Page>
		</div>
	);
};

export default Addproject;
