import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Page from '../components/nav/Page/Page';
import {
	useGetAllBrandsQuery,
	useGetAllCategoriesQuery,
	useGetProductByIdQuery,
} from '../store/services/productService';
import { DetailsItem, DetailsTable } from '../components/table/Details';
import { Item } from '../components/table/Table';
import Input from '../components/auth/Input';
import Button from '../components/buttons/Button';
import useAuth from '../hooks/useAuth';
import * as lib from '../lib/constants';
import axios from 'axios';

const AddProduct = () => {
	const router = useRouter();
	const [name, setName] = useState();
	const [category, setCategory] = useState();
	const [brand, setBrand] = useState();
	const [price, setPrice] = useState();
	const [cost, setCost] = useState();
	const [creating, setCreating] = useState(false);

	const brands = useGetAllBrandsQuery();
	const categories = useGetAllCategoriesQuery();

	const auth = useAuth();

	const submitForm = async e => {
		e.preventDefault();
		setCreating(true);
		const formdata = {};
		formdata.name = name;
		formdata.category = category;
		formdata.brand = brand;
		formdata.price = price;
		formdata.cost = cost;
		const config = {
			headers: {
				'Content-Type': 'application/json',
				authorization: JSON.parse(auth.token),
			},
		};
		try {
			const { data } = await axios.post(
				`${lib.api.backend}/api/products`,
				{
					name,
					category,
					brand,
					price,
					cost,
				},
				config
			);
			setCreating(false);

			router.push(`/product/${data.data._id}`);
		} catch (e) {
			console.log(e);
			setCreating(false);
		}
	};

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
						{creating ? (
							<Button>processing...</Button>
						) : (
							<Button submit>Create Product</Button>
						)}
					</form>
				</DetailsTable>
			</Page>
		</div>
	);
};

export default AddProduct;
