import React from 'react';
import ListPage from '../components/nav/listpage/ListPage';
import Page from '../components/nav/Page/Page';
import { Item, Row, Table } from '../components/table/Table';
import { useGetAllExpensesQuery } from '../store/services/productService';

const Expensespage = () => {
	const { data, error, isLoading } = useGetAllExpensesQuery();

	return (
		<Page selected='Expenses'>
			{!isLoading && (
				<ListPage title='Expenses' button='Add New Expense' href='/addexpense'>
					<Table title='All Expenses'>
						<Row title>
							<Item title>Name</Item>
							<Item title>Amount</Item>
							<Item title>Date</Item>
						</Row>
						{!isLoading &&
							data?.data &&
							data.data.map((item, i) => (
								<Row key={i} href={`/product/${item._id}`}>
									<Item>{item?.name && item.name}</Item>
									<Item>{item?.amount && item.amount}</Item>
									<Item date>{item?.createdAt && item.createdAt}</Item>
								</Row>
							))}
					</Table>
				</ListPage>
			)}
		</Page>
	);
};

export default Expensespage;
