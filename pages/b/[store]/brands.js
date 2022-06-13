import { useRouter } from 'next/router';
import React, { useState } from 'react';
import ListPage from '../../../components/nav/listpage/ListPage';
import Page from '../../../components/nav/Page/Page';
import { Item, Row, Table } from '../../../components/table/Table';
import { useGetAllBrandsQuery } from '../../../store/services/productService';

const BrandsPage = () => {
	const [page, setPage] = useState();
	const { data, error, isLoading, isFetching, isError } = useGetAllBrandsQuery({
		page: page,
	});

	return (
		<Page selected='Brands'>
			<ListPage
				isError={isError}
				error={error}
				title='Brands'
				button='Add Brand'
				href='/addbrand'>
				<Table
					title='All Brands'
					isLoading={isFetching}
					page={data?.page ? data.page : 1}
					totalPages={data?.totalPages ? data.totalPages : 1}
					setPage={e => setPage(e)}>
					<Row title>
						<Item title>Brand Name</Item>
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

export default BrandsPage;
