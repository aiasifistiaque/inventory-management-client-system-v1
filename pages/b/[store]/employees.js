import { useRouter } from 'next/router';
import React, { useState } from 'react';
import ListPage from '../../../components/nav/listpage/ListPage';
import Page from '../../../components/nav/Page/Page';
import { Item, Row, Table } from '../../../components/table/Table';
import { useGetAllEmployeeQuery } from '../../../store/services/productService';

const Employeepage = () => {
	const { store } = useRouter().query;
	const [page, setPage] = useState();
	const { data, error, isLoading, isFetching, isError } =
		useGetAllEmployeeQuery({
			page: page,
		});

	return (
		<Page selected='Employees'>
			<ListPage
				title='Employees'
				button='Add Employee'
				href='/addemployee'
				error={error}
				isError={isError}>
				<Table
					title='All Employees'
					isLoading={isFetching}
					page={data?.page ? data.page : 1}
					totalPages={data?.totalPages ? data.totalPages : 1}
					setPage={e => setPage(e)}>
					<Row title>
						<Item title>Name</Item>
						<Item title>Email</Item>
						<Item title>Role</Item>
						<Item title>Added by</Item>
					</Row>
					{!isLoading &&
						data?.data &&
						data.data.map((item, i) => (
							<Row key={i} href={`/b/${store}/employee/${item._id}`}>
								<Item>
									{item?.status && item.status == 'invited'
										? 'Invited'
										: item?.user?.name && item.user.name}
								</Item>
								<Item email>{item?.email && item.email}</Item>
								<Item>{item?.role && item.role}</Item>
								<Item>{item?.addedBy?.name && item.addedBy.name}</Item>
							</Row>
						))}
				</Table>
			</ListPage>
		</Page>
	);
};

export default Employeepage;
