import React from 'react';
import ListPage from '../../../components/nav/listpage/ListPage';
import Page from '../../../components/nav/Page/Page';
import { Item, Row, Table } from '../../../components/table/Table';
import { useGetAllEmployeeQuery } from '../../../store/services/productService';

const Employeepage = () => {
	const { data, error, isLoading, isFetching } = useGetAllEmployeeQuery();

	return (
		<Page selected='Employees'>
			<ListPage title='Employees' button='Add Employee' href='/addemployee'>
				<Table title='All Employees' isLoading={isLoading}>
					<Row title>
						<Item title>Name</Item>
						<Item title>Email</Item>
						<Item title>Role</Item>
					</Row>
					{!isLoading &&
						data?.data &&
						data.data.map((item, i) => (
							<Row key={i}>
								<Item>
									{item?.status && item.status == 'invited'
										? 'Invited'
										: item?.user?.name && item.user.name}
								</Item>
								<Item email>{item?.email && item.email}</Item>
								<Item>{item?.role && item.role}</Item>
							</Row>
						))}
				</Table>
			</ListPage>
		</Page>
	);
};

export default Employeepage;
