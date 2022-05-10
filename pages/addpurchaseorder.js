import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Page from '../components/nav/Page/Page';
import {
	useAddPurchaseOrderMutation,
	useGetAllProductsQuery,
	useGetProductByIdQuery,
} from '../store/services/productService';
import { DetailsItem, DetailsTable } from '../components/table/Details';
import Input from '../components/auth/Input';
import Button from '../components/buttons/Button';

import {
	Item as TableItem,
	Row as TableRow,
	Table,
} from '../components/table/Table';
import Text from '../components/util/Text';

const AddPurchaseOrder = () => {
	const router = useRouter();

	const [quantity, setQuantity] = useState();
	const [price, setPrice] = useState();

	const [product, setProduct] = useState();
	const [orderItems, setOrderItems] = useState([]);

	const products = useGetAllProductsQuery();
	const singleProduct = useGetProductByIdQuery(product);

	const [addPurchaseOrder, result] = useAddPurchaseOrderMutation();
	const { isLoading, isSuccess, isError } = result;

	useEffect(() => {
		setPrice('');
		setQuantity('');
	}, [product]);

	const addItem = item => {
		const newItem = {
			name: singleProduct?.data?.data?.name && singleProduct?.data?.data?.name,
			product: product,
			quantity: parseInt(quantity),
			price: parseInt(price),
		};

		if (price == '' || quantity == '') {
			return;
		}
		setOrderItems(x => [...x, newItem]);
		setProduct('');
	};

	const submitForm = async e => {
		e.preventDefault();
		const newData = {
			items: orderItems,
			shippingPrice: 0,
			discount: 0,
			vat: 0,
		};
		addPurchaseOrder(newData);
	};

	useEffect(() => {
		isSuccess && router.push('/purchases');
	}, [isSuccess]);

	return (
		<div>
			<Page selected='Purchases'>
				<DetailsTable title='Create Purchase Order'>
					<form style={{ marginTop: 32 }} onSubmit={submitForm}>
						{products?.data?.data && (
							<Input
								label='Product'
								value={product}
								onChange={e => setProduct(e)}
								placeholder='Select a product'
								select
								data={products.data.data}
							/>
						)}
						{!singleProduct.isLoading && product && (
							<div style={{ marginBottom: 64 }}>
								<>
									<h6>Item: {singleProduct.data.data.name}</h6>
									<h6>
										Price: Tk.{JSON.stringify(singleProduct.data.data.price)}
									</h6>
								</>

								<Input
									label='Quantity'
									value={quantity}
									onChange={e => setQuantity(e)}
									placeholder='Enter a quantity'
								/>
								<Input
									label='Price per unit'
									value={price}
									onChange={e => setPrice(e)}
									placeholder='Enter the price per unit'
								/>
								<Button text onClick={addItem}>
									add item
								</Button>
							</div>
						)}

						<Table title='Selected Products'>
							<TableRow>
								<TableItem title>Name</TableItem>
								<TableItem title>Price per unit</TableItem>
								<TableItem title>Quantity</TableItem>
								<TableItem title>item id</TableItem>
							</TableRow>
							{orderItems &&
								orderItems.length > 0 &&
								orderItems.map((item, i) => (
									<TableRow key={i}>
										<TableItem>{item.name}</TableItem>
										<TableItem>Tk. {item.price}</TableItem>
										<TableItem>{item.quantity}</TableItem>
										<TableItem>{item.product}</TableItem>
									</TableRow>
								))}
						</Table>

						{isLoading ? (
							<Button>processing...</Button>
						) : (
							<Button submit>Submit Order</Button>
						)}
					</form>
					{isError && <Text error>There was an error, try again</Text>}
					{isSuccess && <Text success>Order placed successfully</Text>}
				</DetailsTable>
			</Page>
		</div>
	);
};

export default AddPurchaseOrder;
