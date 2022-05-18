import { useRouter } from 'next/router';
import React from 'react';
import ListPage from '../../../components/nav/listpage/ListPage';
import Page from '../../../components/nav/Page/Page';
import { Item, Row, Table } from '../../../components/table/Table';
import { useGetAllBrandsQuery } from '../../../store/services/productService';

const BrandsPage = () => {
	const { data, error, isLoading } = useGetAllBrandsQuery();

	return (
		<Page selected='Brands'>
			<ListPage title='Brands' button='Add Brand' href='/addbrand'>
				<Table title='All Brands' isLoading={isLoading}>
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
