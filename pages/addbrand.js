import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Page from '../components/nav/Page/Page';
import { useAddBrandMutation } from '../store/services/productService';
import { DetailsTable } from '../components/table/Details';
import Input from '../components/auth/Input';
import Button from '../components/buttons/Button';
import Text from '../components/util/Text';

const Addbrand = () => {
	const router = useRouter();
	const [name, setName] = useState();

	const [addBrand, result] = useAddBrandMutation();
	const { isLoading, isSuccess, isError } = result;

	const submitForm = async e => {
		e.preventDefault();
		addBrand({
			name,
		});
	};

	useEffect(() => {
		if (isSuccess) {
			router.push('/brands');
		}
	}, [isSuccess]);

	return (
		<div>
			<Page selected='Brands'>
				<DetailsTable title='Add Brand'>
					<form style={{ marginTop: 32 }} onSubmit={submitForm}>
						<Input
							label='Brand Name'
							value={name}
							onChange={e => setName(e)}
							placeholder='Add Brand Name'
							required
						/>

						{isLoading ? (
							<Button>processing...</Button>
						) : (
							<Button submit>Create Brand</Button>
						)}
					</form>
					{isError && <Text error>There was an error</Text>}
				</DetailsTable>
			</Page>
		</div>
	);
};

export default Addbrand;
