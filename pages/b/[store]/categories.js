import React, { useState } from 'react';
import ListPage from '../../../components/nav/listpage/ListPage';
import Page from '../../../components/nav/Page/Page';
import { Item, Row, Table } from '../../../components/table/Table';
import { useGetAllCategoriesQuery } from '../../../store/services/productService';

const CategoriesPage = () => {
	const [page, setPage] = useState();
	const { data, error, isLoading, isFetching } = useGetAllCategoriesQuery({
		page: page,
	});

	return (
		<Page selected='Categories'>
			<ListPage title='Categories' button='Add Category' href='/addcategory'>
				<Table
					title='All Categories'
					isLoading={isFetching}
					page={data?.page ? data.page : 1}
					totalPages={data?.totalPages ? data.totalPages : 1}
					setPage={e => setPage(e)}>
					<Row title>
						<Item title>Category Name</Item>
						<Item title>Date Added</Item>
					</Row>
					{!isLoading &&
						data?.data &&
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

export default CategoriesPage;
