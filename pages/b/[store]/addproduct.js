import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Page from '../../../components/nav/Page/Page';
import {
	useAddProductMutation,
	useGetAllBrandsQuery,
	useGetAllCategoriesQuery,
} from '../../../store/services/productService';
import { DetailsTable } from '../../../components/table/Details';
import Input from '../../../components/auth/Input';
import Button from '../../../components/buttons/Button';
import Error from '../../../components/util/error-modal/Error';

const AddProduct = () => {
	const router = useRouter();
	const [name, setName] = useState();
	const [category, setCategory] = useState();
	const [brand, setBrand] = useState();
	const [price, setPrice] = useState();
	const [cost, setCost] = useState();
	const [stock, setStock] = useState();
	const [stockAlert, setStockAlert] = useState();
	const [otherCategory, setOtherCategory] = useState();
	const [otherBrand, setOtherBrand] = useState();

	const store = router.query.store;

	const brands = useGetAllBrandsQuery({ perpage: 999, sort: 'name' });
	const categories = useGetAllCategoriesQuery({ perpage: 999, sort: 'name' });

	const [addNewProudct, result] = useAddProductMutation();

	const { isLoading, isSuccess, isError, error } = result;

	const submitForm = async e => {
		e.preventDefault();
		addNewProudct({
			name,
			category,
			brand,
			price,
			cost,
			stock: stock ? stock : 0,
			stockAlert,
			otherCategory,
			otherBrand,
			store,
		});
	};

	useEffect(() => {
		if (isSuccess) {
			router.push(`/b/${store}/products`);
		}
	}, [isSuccess]);

	return (
		<div>
			<Page selected='Products'>
				<DetailsTable title='Add Product'>
					<form style={{ marginTop: 32 }} onSubmit={submitForm}>
						<Input
							label='Product Name'
							value={name}
							onChange={e => setName(e)}
							placeholder='Add product Name'
							required
						/>
						{categories?.data?.data && (
							<Input
								label='Category'
								value={category}
								onChange={e => setCategory(e)}
								placeholder='Product Category'
								required
								select
								data={categories.data.data}
								other
							/>
						)}
						{category == 'other' && (
							<Input
								label='Category Name'
								value={otherCategory}
								onChange={e => setOtherCategory(e)}
								placeholder='Enter Category Name'
								required
							/>
						)}
						{brands?.data?.data && (
							<Input
								label='Brand'
								value={brand}
								onChange={e => setBrand(e)}
								placeholder='Product Brand'
								select
								data={brands.data.data}
								other
							/>
						)}

						{brand == 'other' && (
							<Input
								label='Brand Name'
								value={otherBrand}
								onChange={e => setOtherBrand(e)}
								placeholder='Enter Brand Name'
								required
							/>
						)}

						<Input
							label='MRP'
							value={price}
							onChange={e => setPrice(e)}
							placeholder='Product Price'
							required
						/>
						<Input
							label='Cost Price'
							value={cost}
							onChange={e => setCost(e)}
							placeholder='Product Cost'
						/>

						<Input
							label='Opening stock'
							value={stock}
							onChange={e => setStock(e)}
							placeholder='Initial stock of product'
							type='Number'
						/>
						<Input
							label='Low Stock Alert'
							value={stockAlert}
							onChange={e => setStockAlert(e)}
							placeholder='Set a value for low stock alert'
							type='Number'
						/>
						{isLoading ? (
							<Button>processing...</Button>
						) : (
							<Button submit>Create Product</Button>
						)}
					</form>
					<Error isError={isError}>{error}</Error>
				</DetailsTable>
			</Page>
		</div>
	);
};

export default AddProduct;
