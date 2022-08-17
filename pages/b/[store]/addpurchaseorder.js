import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Page from '../../../components/nav/Page/Page';
import {
	useAddPurchaseOrderMutation,
	useGetAllProductsQuery,
	useGetAllSuppliersQuery,
	useGetProductByIdQuery,
} from '../../../store/services/productService';
import { DetailsItem, DetailsTable } from '../../../components/table/Details';
import Input from '../../../components/auth/Input';
import Button from '../../../components/buttons/Button';

import {
	Item as TableItem,
	Row as TableRow,
	Table,
} from '../../../components/table/Table';
import Text from '../../../components/util/Text';
import InputSection from '../../../components/container/InputSection';

const AddPurchaseOrder = () => {
	const router = useRouter();

	const [quantity, setQuantity] = useState();
	const [price, setPrice] = useState();

	const [product, setProduct] = useState();
	const [supplier, setSupplier] = useState();
	const [orderItems, setOrderItems] = useState([]);
	const [productName, setProductName] = useState('');

	const products = useGetAllProductsQuery({ perpage: 99, sort: 'name' });
	const suppliers = useGetAllSuppliersQuery({ perpage: 99, sort: 'name' });
	const singleProduct = useGetProductByIdQuery(product);

	const [addPurchaseOrder, result] = useAddPurchaseOrderMutation();
	const { isLoading, isSuccess, isError } = result;

	useEffect(() => {
		setPrice('');
		setQuantity('');
	}, [product]);

	useEffect(() => {
		console.log('new');
		if (!singleProduct.isFetching) {
			console.log('fetching', singleProduct);
			if (singleProduct?.data) {
				console.log(singleProduct);
				setQuantity(1);
				setPrice(singleProduct?.data?.cost && singleProduct.data.cost);
				setProductName(singleProduct?.data?.name && singleProduct.data.name);
			}
		}
	}, [singleProduct.isFetching, product]);

	const addItem = item => {
		const newItem = {
			name: productName,
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
			supplier,
		};
		addPurchaseOrder(newData);
	};

	useEffect(() => {
		isSuccess && router.push(`/b/${router.query.store}/purchases`);
	}, [isSuccess]);

	return (
		<div>
			<Page selected='Purchases'>
				<DetailsTable title='Create Purchase Order'>
					<form style={{ marginTop: 32 }} onSubmit={submitForm}>
						{suppliers?.data?.data && (
							<Input
								label='Select Supplier'
								value={supplier}
								onChange={e => setSupplier(e)}
								placeholder='Select a product'
								select
								data={suppliers.data.data}
							/>
						)}
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
									<h6>Item: {productName}</h6>
									<h6>
										Price: Tk.
										{JSON.stringify(
											singleProduct?.data?.cost && singleProduct.data.cost
										)}
									</h6>
								</>
								<InputSection horizontal={true} align='center'>
									<Input
										label='Quantity'
										value={quantity}
										onChange={e => setQuantity(e)}
										placeholder='Enter a quantity'
										type='Number'
									/>
									<Input
										label='Price per unit'
										value={price}
										onChange={e => setPrice(e)}
										placeholder='Enter the price per unit'
										type='Number'
									/>
									<Button text onClick={addItem}>
										add item
									</Button>
								</InputSection>
							</div>
						)}

						<Table title='Selected Products' paginate='no'>
							<TableRow title>
								<TableItem title>Name</TableItem>
								<TableItem title>Price per unit</TableItem>
								<TableItem title>Quantity</TableItem>
								<TableItem title>id</TableItem>
							</TableRow>
							{orderItems &&
								orderItems.length > 0 &&
								orderItems.map((item, i) => (
									<TableRow key={i}>
										<TableItem>{item?.name && item.name}</TableItem>
										<TableItem>Tk. {item?.price && item.price}</TableItem>
										<TableItem>{item?.quantity && item.quantity}</TableItem>
										<TableItem>{item?.product && item.product}</TableItem>
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
