import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Page from '../../../../components/nav/Page/Page';
import {
	useGetAllPurchaseOrdersBySupplierQuery,
	useAddSupplierMutation,
} from '../../../../store/services/productService';
import { DetailsTable } from '../../../../components/table/Details';
import Input from '../../../../components/auth/Input';
import Button from '../../../../components/buttons/Button';
import Text from '../../../../components/util/Text';
import { Item, Row, Table } from '../../../../components/table/Table';

const SupplierPage = () => {
	const router = useRouter();
	const [name, setName] = useState();
	const [email, setEmail] = useState();
	const [phone, setPhone] = useState();
	const [total, setTotal] = useState();
	const [page, setPage] = useState();

	const { supplier, store } = router.query;

	const [addSupplier, result] = useAddSupplierMutation();
	const details = useGetAllPurchaseOrdersBySupplierQuery({
		id: supplier,
		page: page,
	});

	const { isLoading, isSuccess, isError } = result;

	const submitForm = async e => {
		e.preventDefault();
		addSupplier({
			name,
			email,
			phone,
		});
	};

	useEffect(() => {
		if (isSuccess) {
			router.push(`/b/${router.query.store}/suppliers`);
		}
	}, [isSuccess]);

	useEffect(() => {
		if (!details.isFetching && details.data?.supplier) {
			setName(details.data.supplier.name);
			setEmail(details.data.supplier.email);
			setPhone(details.data.supplier.phone);
			setTotal(details.data.totalPrice);
		}
	}, [details.isLoading]);

	return (
		<div>
			<Page selected='Suppliers'>
				<DetailsTable title='Manage Supplier'>
					<form style={{ marginTop: 32 }} onSubmit={submitForm}>
						<Input
							label='Supplier Name'
							value={name}
							onChange={e => setName(e)}
							placeholder='Add supplier Name'
							disabled
						/>
						<Input
							label='Supplier email'
							value={email}
							onChange={e => setEmail(e)}
							placeholder='Add supplier Email'
							disabled
						/>

						<Input
							label='Supplier phone'
							value={phone}
							onChange={e => setPhone(e)}
							placeholder='Add Supplier Phone Number'
							disabled
						/>

						<Input
							label='Total Purchase'
							value={total}
							onChange={e => setPhone(e)}
							placeholder='Total Purchase Cost'
							disabled
						/>

						{/* {isLoading ? (
							<Button>processing...</Button>
						) : (
							<Button submit>Update Supplier</Button>
						)} */}
					</form>
					{isError && <Text error>There was an error</Text>}
					<h5>Purchases from supplier</h5>
					<Table
						title='All Purchase orders'
						isLoading={details.isFetching}
						page={details.data?.page ? details.data.page : 1}
						totalPages={details.data?.totalPages ? details.data.totalPages : 1}
						setPage={e => setPage(e)}>
						<Row title>
							<Item title>Purchase Date</Item>
							<Item title>Total price</Item>
							<Item title>Total Items</Item>
							<Item title>Supplier</Item>
							<Item title>Created By</Item>
						</Row>

						{!isLoading &&
							details?.data?.data &&
							details.data.data.map((item, i) => (
								<Row key={i} href={`/b/${store}/purchase/${item._id}`}>
									<Item date>{item?.createdAt && item.createdAt}</Item>
									<Item>Tk. {item?.totalPrice && item.totalPrice}</Item>
									<Item>
										{item?.orderItems?.length && item.orderItems.length}
									</Item>
									<Item>{item?.supplier?.name && item.supplier.name}</Item>
									<Item>{item?.user?.name && item.user.name}</Item>
								</Row>
							))}
					</Table>
				</DetailsTable>
			</Page>
		</div>
	);
};

export default SupplierPage;
