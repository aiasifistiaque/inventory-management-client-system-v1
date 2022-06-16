import { useRouter } from 'next/router';
import React, { useState } from 'react';
import ListPage from '../../../components/nav/listpage/ListPage';
import Page from '../../../components/nav/Page/Page';
import { Item, Row, Table } from '../../../components/table/Table';
import { useGetAllSuppliersQuery } from '../../../store/services/productService';

const Supplierpage = () => {
	const [page, setPage] = useState();
	const { data, error, isLoading, isFetching, isError } =
		useGetAllSuppliersQuery({
			page: page,
		});
	const store = useRouter().query.store;

	return (
		<Page selected='Suppliers'>
			<ListPage
				isError={isError}
				error={error}
				title='Suppliers'
				button='Add Supplier'
				href='/addsupplier'>
				<Table
					title='All Suppliers'
					isLoading={isFetching}
					page={data?.page ? data.page : 1}
					totalPages={data?.totalPages ? data.totalPages : 1}
					setPage={e => setPage(e)}>
					<Row title>
						<Item title>Name</Item>
						<Item title>Email</Item>
						<Item title>Phone</Item>
					</Row>
					{!isLoading &&
						data?.data &&
						data.data.map((item, i) => (
							<Row key={i} href={`/b/${store}/supplier/${item._id}`}>
								<Item>{item?.name && item.name}</Item>
								<Item email>{item?.email && item.email}</Item>
								<Item>{item?.phone && item.phone}</Item>
							</Row>
						))}
				</Table>
			</ListPage>
		</Page>
	);
};

export default Supplierpage;
