import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Page from '../../../components/nav/Page/Page';
import { useAddCustomerMutation } from '../../../store/services/productService';
import { DetailsTable } from '../../../components/table/Details';
import Input from '../../../components/auth/Input';
import Button from '../../../components/buttons/Button';
import Text from '../../../components/util/Text';

const AddCustomers = () => {
	const router = useRouter();
	const [name, setName] = useState();
	const [email, setEmail] = useState();
	const [phone, setPhone] = useState();

	const [addCustomer, result] = useAddCustomerMutation();

	const { isLoading, isSuccess, isError } = result;

	const submitForm = async e => {
		e.preventDefault();
		addCustomer({
			name,
			email,
			phone,
		});
	};

	useEffect(() => {
		if (isSuccess) {
			router.push(`/b/${router.query.store}/customers`);
		}
	}, [isSuccess]);

	return (
		<div>
			<Page selected='Customers'>
				<DetailsTable title='Add Customer'>
					<form style={{ marginTop: 32 }} onSubmit={submitForm}>
						<Input
							label='Customer Name'
							value={name}
							onChange={e => setName(e)}
							placeholder='Add Customer Name'
							required
						/>
						<Input
							label='Customer email'
							value={email}
							onChange={e => setEmail(e)}
							placeholder='Add Customer Email'
						/>

						<Input
							label='Customer phone'
							value={phone}
							onChange={e => setPhone(e)}
							placeholder='Add Customer Phone Number'
						/>

						{isLoading ? (
							<Button>processing...</Button>
						) : (
							<Button submit>Create Customer</Button>
						)}
					</form>

					{isError && (
						<Text error>
							{result?.error?.data?.message && result.error.data.message}
						</Text>
					)}
				</DetailsTable>
			</Page>
		</div>
	);
};

export default AddCustomers;
