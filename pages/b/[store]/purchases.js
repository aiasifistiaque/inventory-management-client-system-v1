import { useRouter } from 'next/router';
import React, { useState } from 'react';
import ListPage from '../../../components/nav/listpage/ListPage';
import Page from '../../../components/nav/Page/Page';
import { Item, Row, Table } from '../../../components/table/Table';
import { useGetAllPurchaseOrdersQuery } from '../../../store/services/productService';

const Purchasespage = () => {
	const router = useRouter();
	const store = router.query.store;
	const [page, setPage] = useState();

	const { data, error, isLoading, isFetching, isError } =
		useGetAllPurchaseOrdersQuery({
			page: page,
		});
	return (
		<Page selected='Purchases'>
			<ListPage
				isError={isError}
				error={error}
				title='Purchase Orders'
				button='Add Purchase Order'
				href='/addpurchaseorder'>
				<Table
					title='All Purchase orders'
					isLoading={isFetching}
					page={data?.page ? data.page : 1}
					totalPages={data?.totalPages ? data.totalPages : 1}
					setPage={e => setPage(e)}>
					<Row title>
						<Item title>Purchase Date</Item>
						<Item title>Total price</Item>
						<Item title>Total Items</Item>
						<Item title>Supplier</Item>
						<Item title>Created By</Item>
					</Row>

					{!isLoading &&
						data?.data &&
						data.data.map((item, i) => (
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
			</ListPage>
		</Page>
	);
};

export default Purchasespage;
