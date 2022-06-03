import React, { useState } from 'react';
import ListPage from '../../../components/nav/listpage/ListPage';
import Page from '../../../components/nav/Page/Page';
import { Item, Row, Table } from '../../../components/table/Table';
import { useGetLowStockQuery } from '../../../store/services/productService';

const Lowstockpage = () => {
	const [page, setPage] = useState();
	const { data, error, isLoading, isFetching } = useGetLowStockQuery({
		page: page,
	});

	return (
		<Page selected='Low Stock'>
			<ListPage title='Low Stock Report'>
				<Table
					title='All Categories'
					isLoading={isFetching}
					page={data?.page ? data.page : 1}
					totalPages={data?.totalPages ? data.totalPages : 1}
					setPage={e => setPage(e)}>
					<Row title>
						<Item title>Name</Item>
						<Item title>MRP</Item>
						<Item title>Stock</Item>
						<Item title>Alert</Item>
					</Row>
					{!isLoading &&
						data?.data &&
						data.data.map((item, i) => (
							<Row key={i}>
								<Item>{item.name}</Item>
								<Item>{item.price}</Item>
								<Item>{item.stock}</Item>
								<Item>{item.stockAlert}</Item>
							</Row>
						))}
				</Table>
			</ListPage>
		</Page>
	);
};

export default Lowstockpage;
