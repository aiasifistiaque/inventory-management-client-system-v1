import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Page from '../components/nav/Page/Page';
import {
	useAddSaleMutation,
	useGetAllProductsQuery,
	useGetProductByIdQuery,
} from '../store/services/productService';
import { DetailsTable } from '../components/table/Details';
import Input from '../components/auth/Input';
import Button from '../components/buttons/Button';

import {
	Item as TableItem,
	Row as TableRow,
	Table,
} from '../components/table/Table';
import Text from '../components/util/Text';
import dynamic from 'next/dynamic';
import {
	SmallItem,
	SmallRow,
	SmallTable,
} from '../components/table/small/SmallTable';
import Section from '../components/container/Section';

const BarcodeScannerComponent = dynamic(
	() => import('react-qr-barcode-scanner'),
	{
		ssr: false,
	}
);

const Pospage = () => {
	const router = useRouter();

	const [quantity, setQuantity] = useState();
	const [price, setPrice] = useState();

	const [product, setProduct] = useState();
	const [orderItems, setOrderItems] = useState([]);

	const products = useGetAllProductsQuery();

	const [addPurchaseOrder, result] = useAddSaleMutation();
	const { isLoading, isSuccess, isError } = result;
	const [barCode, setBarCode] = useState('');
	const [reader, setReader] = useState(false);

	const totalPrice = () => {
		let price = 0;
		orderItems.map(i => (price += i.price * i.quantity));
		return price;
	};
	const totalQuantity = () => {
		let quantity = 0;
		orderItems.map(i => (quantity += i.quantity));
		return quantity;
	};
	const [selected, setSelected] = useState();

	useEffect(() => {
		if (product) {
			setSelected(JSON.parse(product));
		}

		// setPrice('');
		// setQuantity('');
	}, [product]);

	const addItem = () => {
		const parsedProduct = JSON.parse(product);

		const exists = orderItems.findIndex(
			item => item.product === parsedProduct._id
		);

		// orderItems.map((item, i) => {
		// 	console.log(parsedProduct._id);
		// 	if (item.product === parsedProduct._id) {
		// 		console.log('item exists');
		// 	} else {
		// 		console.log('item does not exist');
		// 	}
		// });

		if (exists >= 0) {
			orderItems[exists].quantity += 1;
		} else {
			const newItem = {
				name: parsedProduct?.name && parsedProduct.name,
				product: parsedProduct?._id && parsedProduct._id,
				quantity: 1,
				price: parsedProduct?.price && parsedProduct.price,
			};

			if (price == '' || quantity == '') {
				return;
			}
			setOrderItems(x => [...x, newItem]);
		}

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
		isSuccess && router.push('/sales');
	}, [isSuccess]);

	return (
		<div>
			<Page selected='Sales'>
				<DetailsTable>
					<form onSubmit={submitForm}>
						<Section horizontal>
							<Section mr={8} flex={1}>
								<h5>Create New Sale</h5>
								{reader && (
									<BarcodeScannerComponent
										width={200}
										height={100}
										onUpdate={(err, result) => {
											if (result) {
												setProduct(result.text);
												setReader(false);
											} else setBarCode('Not Found');
										}}
									/>
								)}
								{!reader ? (
									<Button
										secondary
										onClick={() => setReader(true)}
										icon='barcode-link'>
										Scan Barcode
									</Button>
								) : (
									<Button onClick={() => setReader(false)}>Stop scan</Button>
								)}

								{products?.data?.data && (
									<Section horizontal align='center'>
										<Input
											label='Product'
											value={product}
											onChange={e => setProduct(e)}
											placeholder='Select a product'
											select
											objectSelect
											data={products.data.data}
										/>
										{product ? (
											<Button onClick={addItem}>Add</Button>
										) : (
											<Button disabled>Add</Button>
										)}
									</Section>
								)}

								{/* <p>{product.name}</p> */}
							</Section>
							<Section flex={1}>
								<SmallTable title='Selected Products'>
									<SmallRow title>
										<SmallItem title>Name</SmallItem>
										<SmallItem title>Price</SmallItem>
										<SmallItem title>Quantity</SmallItem>
									</SmallRow>
									{orderItems &&
										orderItems.length > 0 &&
										orderItems.map((item, i) => (
											<SmallRow key={i}>
												<SmallItem>{item?.name && item.name}</SmallItem>
												<SmallItem>
													Tk. {item?.price && item.price} x {item.quantity}
												</SmallItem>
												<SmallItem>{item?.quantity && item.quantity}</SmallItem>
											</SmallRow>
										))}
									<SmallRow title>
										<SmallItem>Total Items: {totalQuantity()}</SmallItem>
									</SmallRow>
									<SmallRow title>
										<SmallItem>Sub Total Tk. {totalPrice()}</SmallItem>
									</SmallRow>
								</SmallTable>

								{isLoading ? (
									<Button>processing...</Button>
								) : (
									<Button submit>Submit Order</Button>
								)}
							</Section>
						</Section>

						{isError && <Text error>There was an error, try again</Text>}
						{isSuccess && <Text success>Order placed successfully</Text>}
					</form>
				</DetailsTable>
			</Page>
		</div>
	);
};

export default Pospage;
