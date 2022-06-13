import React, { useState } from 'react';
import ListPage from '../../../components/nav/listpage/ListPage';
import Page from '../../../components/nav/Page/Page';
import { Item, Row, Table } from '../../../components/table/Table';
import { useGetAllCategoriesQuery } from '../../../store/services/productService';

const CategoriesPage = () => {
	const [page, setPage] = useState();
	const { data, error, isLoading, isFetching, isError } =
		useGetAllCategoriesQuery({
			page: page,
		});

	return (
		<Page selected='Categories'>
			<ListPage
				isError={isError}
				error={error}
				title='Categories'
				button='Add Category'
				href='/addcategory'>
				<Table
					title='All Categories'
					isLoading={isFetching}
					page={data?.page ? data.page : 1}
					totalPages={data?.totalPages ? data.totalPages : 1}
					setPage={e => setPage(e)}>
					<Row title>
						<Item title>Name</Item>
						<Item title>Code</Item>
						<Item title>Date Added</Item>
					</Row>
					{!isLoading &&
						data?.data &&
						data.data.map((item, i) => (
							<Row key={i}>
								<Item>{item?.name && item.name}</Item>
								<Item>{item?.code && item.code}</Item>
								<Item date>{item.createdAt}</Item>
							</Row>
						))}
				</Table>
			</ListPage>
		</Page>
	);
};

export default CategoriesPage;
