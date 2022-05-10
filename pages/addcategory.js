import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Page from '../components/nav/Page/Page';
import { useAddCategoryMutation } from '../store/services/productService';
import { DetailsTable } from '../components/table/Details';
import Input from '../components/auth/Input';
import Button from '../components/buttons/Button';
import Text from '../components/util/Text';

const Addcategory = () => {
	const router = useRouter();
	const [name, setName] = useState();

	const [addCategory, result] = useAddCategoryMutation();
	const { isLoading, isSuccess, isError } = result;

	const submitForm = async e => {
		e.preventDefault();
		addCategory({
			name,
		});
	};

	useEffect(() => {
		if (isSuccess) {
			router.push('/categories');
		}
	}, [isSuccess]);

	return (
		<div>
			<Page selected='Categories'>
				<DetailsTable title='Add Category'>
					<form style={{ marginTop: 32 }} onSubmit={submitForm}>
						<Input
							label='Category Name'
							value={name}
							onChange={e => setName(e)}
							placeholder='Add Category Name'
							required
						/>

						{isLoading ? (
							<Button>processing...</Button>
						) : (
							<Button submit>Create Category</Button>
						)}
					</form>
					{isError && <Text error>There was an error</Text>}
				</DetailsTable>
			</Page>
		</div>
	);
};

export default Addcategory;
