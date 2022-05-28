import React from 'react';
import Section from '../../../components/container/Section';
import ListPage from '../../../components/nav/listpage/ListPage';
import Page from '../../../components/nav/Page/Page';
import { Item, Row, Table } from '../../../components/table/Table';
import Text from '../../../components/util/Text';
import { useGetStoreLogsQuery } from '../../../store/services/productService';

const Activitylogpage = () => {
	const { data, error, isLoading } = useGetStoreLogsQuery();

	return (
		<Page selected='Activity Logs'>
			<ListPage title='Store Activity Log' button='Add New Expense'>
				<Table title='All Expenses' isLoading={isLoading}>
					{!isLoading &&
						data?.data &&
						data.data.map((item, i) => (
							<Row key={i}>
								<Section mb={8}>
									<Item>
										{item?.user?.name && item.user.name}
										{' ('}
										{item?.user?.email && item.user.email}
										{') '}
										{item?.description && item.description}
									</Item>
									<Text date>{item?.createdAt}</Text>
								</Section>
							</Row>
						))}
				</Table>
			</ListPage>
		</Page>
	);
};

export default Activitylogpage;
