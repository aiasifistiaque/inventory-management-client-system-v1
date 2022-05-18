import React from 'react';
import ListPage from '../../../components/nav/listpage/ListPage';
import Page from '../../../components/nav/Page/Page';
import { Item, Row, Table } from '../../../components/table/Table';
import { useGetAllSalesQuery } from '../../../store/services/productService';

const Salespage = () => {
	const { data, error, isLoading } = useGetAllSalesQuery();
	return (
		<Page selected='Sales'>
			<ListPage title='Total Sales' button='New Sale' href='/pos'>
				<Table title='All Sales' isLoading={isLoading}>
					<Row title>
						<Item title>Sale Date</Item>
						<Item title>Total price</Item>
						<Item title>Total Items</Item>
						<Item title>Sold By</Item>
					</Row>
					{!isLoading &&
						data?.data &&
						data.data.map((item, i) => (
							<Row key={i} href={`/product/${item._id}`}>
								<Item date>{item?.createdAt && item.createdAt}</Item>
								<Item>Tk. {item?.totalPrice && item.totalPrice}</Item>
								<Item>
									{item?.orderItems?.length && item.orderItems.length}
								</Item>
								<Item>{item?.user.name && item.user.name}</Item>
							</Row>
						))}
				</Table>
			</ListPage>
		</Page>
	);
};

export default Salespage;
