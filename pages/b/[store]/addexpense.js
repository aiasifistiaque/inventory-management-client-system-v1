import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Page from '../../../components/nav/Page/Page';
import { useAddExpensesMutation } from '../../../store/services/productService';
import { DetailsTable } from '../../../components/table/Details';
import Input from '../../../components/auth/Input';
import Button from '../../../components/buttons/Button';
import Text from '../../../components/util/Text';

const AddExpenses = () => {
	const router = useRouter();
	const [name, setName] = useState();
	const [amount, setAmount] = useState();
	const [category, setCategory] = useState();

	const [addExpenses, result] = useAddExpensesMutation();

	const { isLoading, isSuccess, isError } = result;

	const submitForm = async e => {
		e.preventDefault();
		addExpenses({
			name,
			category,
			amount,
		});
	};

	useEffect(() => {
		if (isSuccess) {
			router.push(`/b/${router.query.store}/expenses`);
		}
	}, [isSuccess]);

	return (
		<div>
			<Page selected='Expenses'>
				<DetailsTable title='Add Expense' href='/addexpense'>
					<form style={{ marginTop: 32 }} onSubmit={submitForm}>
						<Input
							label='Product Name'
							value={name}
							onChange={e => setName(e)}
							placeholder='Add Expense Name'
							required
						/>
						<Input
							label='Amount'
							value={amount}
							onChange={e => setAmount(e)}
							placeholder='Add Expense Amount'
							required
							type='Number'
						/>

						<Input
							label='Expense Category'
							value={category}
							onChange={e => setCategory(e)}
							placeholder='Add Expense Category'
						/>

						{isLoading ? (
							<Button>processing...</Button>
						) : (
							<Button submit>Create Product</Button>
						)}
					</form>
					{isError && <Text error>There was an error</Text>}
				</DetailsTable>
			</Page>
		</div>
	);
};

export default AddExpenses;
