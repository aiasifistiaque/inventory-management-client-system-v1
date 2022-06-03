import React, { useState } from 'react';
import ListPage from '../../../components/nav/listpage/ListPage';
import Page from '../../../components/nav/Page/Page';
import { Item, Row, Table } from '../../../components/table/Table';
import { useGetAllPurchaseOrdersQuery } from '../../../store/services/productService';

const Purchasespage = () => {
	const [page, setPage] = useState();

	const { data, error, isLoading, isFetching } = useGetAllPurchaseOrdersQuery({
		page: page,
	});
	return (
		<Page selected='Purchases'>
			<ListPage
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
						<Item title>Created By</Item>
					</Row>
					{!isLoading &&
						data?.data &&
						data.data.map((item, i) => (
							<Row key={i} href={`/product/${item._id}`}>
								<Item date>{item.createdAt}</Item>
								<Item>Tk. {item.totalPrice}</Item>
								<Item>{item.orderItems.length}</Item>
								<Item>{item.user}</Item>
							</Row>
						))}
				</Table>
			</ListPage>
		</Page>
	);
};

export default Purchasespage;
