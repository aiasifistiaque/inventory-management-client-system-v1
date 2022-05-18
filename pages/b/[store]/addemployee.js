import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Page from '../../../components/nav/Page/Page';
import {
	useAddCustomerMutation,
	useAddEmployeeMutation,
} from '../../../store/services/productService';
import { DetailsTable } from '../../../components/table/Details';
import Input from '../../../components/auth/Input';
import Button from '../../../components/buttons/Button';
import Text from '../../../components/util/Text';

const Addemployee = () => {
	const router = useRouter();
	const [role, setRole] = useState();
	const [email, setEmail] = useState();

	const [addEmployee, result] = useAddEmployeeMutation();

	const { isLoading, isSuccess, isError } = result;

	const submitForm = async e => {
		e.preventDefault();
		addEmployee({
			email,
			role,
		});
	};

	useEffect(() => {
		if (isSuccess) {
			router.push(`/b/${router.query.store}/employees`);
		}
	}, [isSuccess]);

	return (
		<div>
			<Page selected='Employees'>
				<DetailsTable title='Add Employee'>
					<form style={{ marginTop: 32 }} onSubmit={submitForm}>
						<Input
							label='Customer Email'
							value={email}
							onChange={e => setEmail(e)}
							placeholder='Enter employee email'
							required
						/>
						<Input
							label='Role'
							value={role}
							onChange={e => setRole(e)}
							placeholder='Select role'
							select
							data={[
								{ _id: 'admin', name: 'admin' },
								{ _id: 'manager', name: 'manager' },
								{ _id: 'sales', name: 'sales' },
								{ _id: 'analyst', name: 'analyst' },
							]}
							required
						/>

						{isLoading ? (
							<Button>processing...</Button>
						) : (
							<Button submit>Submit</Button>
						)}
					</form>
					{isError && <Text error>There was an error</Text>}
				</DetailsTable>
			</Page>
		</div>
	);
};

export default Addemployee;
