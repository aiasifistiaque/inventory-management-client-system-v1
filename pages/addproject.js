import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Page from '../components/nav/Page/Page';
import { useAddStoreMutation } from '../store/services/productService';
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
	const [street, setStreet] = useState();
	const [city, setCity] = useState();
	const [post, setPost] = useState();
	const [email, setEmail] = useState();
	const [phone, setPhone] = useState();

	const [addStore, result] = useAddStoreMutation();
	const { isLoading, isSuccess, isError } = result;

	const submitForm = async e => {
		e.preventDefault();
		addStore({
			name,
			category,
			email,
			phone,
			address: {
				street,
				city,
				postCode: post,
			},
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
							label='Contact Number'
							value={phone}
							onChange={e => setPhone(e)}
							placeholder='Primary Contact Number'
							required
							type='Number'
						/>
						<Input
							label='Store email'
							value={email}
							onChange={e => setEmail(e)}
							placeholder='Store Primary email'
							required
						/>
						<Input
							label='Store Address (Street)'
							value={street}
							onChange={e => setStreet(e)}
							placeholder='Street, apt, road etc.'
							required
						/>
						<Input
							label='City'
							value={city}
							onChange={e => setCity(e)}
							placeholder='Select City'
							required
						/>
						<Input
							label='Post Code'
							value={post}
							onChange={e => setPost(e)}
							placeholder='eg. 1207'
							required
							type='Number'
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
