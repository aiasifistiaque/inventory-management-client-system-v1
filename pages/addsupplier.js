import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Page from '../components/nav/Page/Page';
import { useAddSupplierMutation } from '../store/services/productService';
import { DetailsTable } from '../components/table/Details';
import Input from '../components/auth/Input';
import Button from '../components/buttons/Button';
import Text from '../components/util/Text';

const Addsuppliers = () => {
	const router = useRouter();
	const [name, setName] = useState();
	const [email, setEmail] = useState();
	const [phone, setPhone] = useState();

	const [addSupplier, result] = useAddSupplierMutation();

	const { isLoading, isSuccess, isError } = result;

	const submitForm = async e => {
		e.preventDefault();
		addSupplier({
			name,
			email,
			phone,
		});
	};

	useEffect(() => {
		if (isSuccess) {
			router.push('/suppliers');
		}
	}, [isSuccess]);

	return (
		<div>
			<Page selected='Suppliers'>
				<DetailsTable title='Add Supplier'>
					<form style={{ marginTop: 32 }} onSubmit={submitForm}>
						<Input
							label='Supplier Name'
							value={name}
							onChange={e => setName(e)}
							placeholder='Add supplier Name'
							required
						/>
						<Input
							label='Supplier email'
							value={email}
							onChange={e => setEmail(e)}
							placeholder='Add supplier Email'
						/>

						<Input
							label='Supplier phone'
							value={phone}
							onChange={e => setPhone(e)}
							placeholder='Add Supplier Phone Number'
						/>

						{isLoading ? (
							<Button>processing...</Button>
						) : (
							<Button submit>Add Supplier</Button>
						)}
					</form>
					{isError && <Text error>There was an error</Text>}
				</DetailsTable>
			</Page>
		</div>
	);
};

export default Addsuppliers;
