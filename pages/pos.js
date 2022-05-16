import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Page from '../components/nav/Page/Page';
import {
	useAddSaleMutation,
	useGetAllCategoriesQuery,
	useGetAllProductsQuery,
	useGetProductByIdQuery,
} from '../store/services/productService';
import Input from '../components/auth/Input';
import Button from '../components/buttons/Button';

import Text from '../components/util/Text';
import dynamic from 'next/dynamic';

import Section from '../components/container/Section';
import SelectedProducts from '../components/pos/SelectedProducts';
import ProductsList from '../components/pos/ProductsList';
import {
	PosFooter,
	PosFooterItem,
	PosLeftTable,
	PosPage,
	PosRightTable,
	PosTable,
} from '../components/pos/PosItems';

const BarcodeScannerComponent = dynamic(
	() => import('react-qr-barcode-scanner'),
	{
		ssr: false,
	}
);

const Pospage = () => {
	const router = useRouter();

	const [category, setCategory] = useState();

	const categories = useGetAllCategoriesQuery();

	const [product, setProduct] = useState();

	const productData = useGetProductByIdQuery(product);

	const [orderItems, setOrderItems] = useState([]);

	const [addPurchaseOrder, result] = useAddSaleMutation();
	const { isLoading, isSuccess, isError } = result;
	const [barCode, setBarCode] = useState('');
	const [reader, setReader] = useState(false);
	const [test, setTest] = useState();
	const [reload, setReload] = useState(false);

	useEffect(() => {
		setTest(productData.isLoading);
		if (
			product &&
			!productData.isLoading &&
			!productData.error &&
			productData?.data?.data?._id
		) {
			const exists = orderItems.findIndex(
				item => item.product === productData.data.data._id
			);

			if (exists >= 0) {
				const newArr = orderItems;
				newArr[exists].quantity += 1;
				setOrderItems(x => [...newArr]);
				setProduct(null);
			} else {
				const newItem = {
					name: productData?.data?.data?.name && productData?.data?.data.name,
					product: productData?.data?.data?._id && productData?.data?.data._id,
					quantity: 1,
					price:
						productData?.data?.data?.price && productData?.data?.data.price,
				};

				setOrderItems(x => [...x, newItem]);
				setProduct(null);
			}
		}
	}, [productData.isLoading, product, reload]);

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

	const del = productToDelete => {
		const newArr = orderItems.filter(
			item => item.product !== productToDelete.product
		);

		setOrderItems(x => [...newArr]);
	};

	const increase = productToIncrease => {
		const exists = orderItems.findIndex(
			item => item.product === productToIncrease.product
		);

		if (exists < 0) return;
		const newArr = orderItems;
		newArr[exists].quantity += 1;
		setOrderItems(x => [...newArr]);
	};

	const decrease = productToDecrease => {
		const exists = orderItems.findIndex(
			item => item.product === productToDecrease.product
		);

		if (exists < 0) return;
		const newArr = orderItems;
		if (newArr[exists].quantity <= 1) return;

		newArr[exists].quantity -= 1;
		setOrderItems(x => [...newArr]);
	};

	const addItem = productToAdd => {
		const exists = orderItems.findIndex(
			item => item.product === productToAdd._id
		);

		if (exists >= 0) {
			const newArr = orderItems;
			newArr[exists].quantity += 1;
			setOrderItems(x => [...newArr]);
		} else {
			const newItem = {
				name: productToAdd?.name && productToAdd.name,
				product: productToAdd?._id && productToAdd._id,
				quantity: 1,
				price: productToAdd?.price && productToAdd.price,
			};

			setOrderItems(x => [...x, newItem]);
		}

		//setProduct('');
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
				<PosPage ph={16} pv={8}>
					<form onSubmit={submitForm} style={{ width: '100%' }}>
						<Section horizontal>
							<PosLeftTable mr={8} flex={1} border='none'>
								<h5>Create New Sale</h5>

								{reader && (
									<BarcodeScannerComponent
										width={200}
										height={100}
										onUpdate={(err, result) => {
											if (result) {
												setProduct(result.text);
												setReader(false);
												setReload(!reload);
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

								{/* {products?.data?.data && (
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
								)} */}

								{categories?.data?.data && (
									<Section horizontal align='center'>
										<Input
											label='Categories'
											value={category}
											onChange={e => setCategory(e)}
											placeholder='Select a category'
											select
											data={categories.data.data}
										/>
									</Section>
								)}
								<ProductsList category={category} addItem={e => addItem(e)} />
							</PosLeftTable>
							<PosRightTable border='none'>
								<PosTable title='Selected Products'>
									<SelectedProducts
										orderItems={orderItems}
										increase={e => increase(e)}
										decrease={e => decrease(e)}
										del={e => del(e)}
									/>
								</PosTable>
								<PosFooter>
									<PosFooterItem title='Total Items'>
										{totalQuantity()}
									</PosFooterItem>
									<PosFooterItem title='Sub Total'>
										Tk. {totalPrice()}
									</PosFooterItem>
									{isLoading ? (
										<Button>processing...</Button>
									) : (
										<Button submit>Submit Order</Button>
									)}
								</PosFooter>
							</PosRightTable>
						</Section>

						{isError && <Text error>There was an error, try again</Text>}
						{isSuccess && <Text success>Order placed successfully</Text>}
					</form>
				</PosPage>
			</Page>
		</div>
	);
};

export default Pospage;
