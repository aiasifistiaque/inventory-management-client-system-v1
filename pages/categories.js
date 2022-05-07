import React from 'react';
import ListPage from '../components/nav/listpage/ListPage';
import Page from '../components/nav/Page/Page';
import { Item, Row, Table } from '../components/table/Table';
import { useGetAllCategoriesQuery } from '../store/services/productService';

const categories = () => {
	const { data, error, isLoading } = useGetAllCategoriesQuery();
	return (
		<Page selected='Categories'>
			<ListPage title='Categories' button='Add Category'>
				<Table title='All Categories'>
					<Row>
						<Item title>Category Name</Item>
						<Item title>Date Added</Item>
					</Row>
					{!isLoading &&
						data.data.map((item, i) => (
							<Row key={i}>
								<Item>{item.name}</Item>
								<Item date>{item.createdAt}</Item>
							</Row>
						))}
				</Table>
			</ListPage>
		</Page>
	);
};

export default categories;
