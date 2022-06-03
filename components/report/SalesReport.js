import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useGetAllSalesQuery } from '../../store/services/productService';
import { UnitBox } from '../dashboard/unit/Unit';
import { Row, Table, Item } from '../table/Table';

const SalesReport = ({ date, title }) => {
	const [page, setPage] = useState();
	const { data, error, isLoading, isFetching } = useGetAllSalesQuery({
		date,
		page,
		perpage: 5,
	});
	const router = useRouter();
	const { store } = router.query;

	return (
		<UnitBox>
			<h5>{title} Sales</h5>
			<Table
				title='All Sales'
				isLoading={isFetching}
				page={data?.page ? data.page : 1}
				totalPages={data?.totalPages ? data.totalPages : 1}
				setPage={e => setPage(e)}>
				<Row title>
					<Item title>Sale Date</Item>
					<Item title>Total price</Item>
					<Item title>Sold by</Item>
				</Row>
				{!isLoading &&
					data?.data &&
					data.data.map((item, i) => (
						<Row key={i} href={`/b/${store}/sale/${item._id}`}>
							<Item date>{item?.createdAt && item.createdAt}</Item>
							<Item>Tk. {item?.totalPrice && item.totalPrice}</Item>
							<Item>Tk. {item?.user?.name && item.user.name}</Item>
						</Row>
					))}
			</Table>
		</UnitBox>
	);
};

export default SalesReport;
