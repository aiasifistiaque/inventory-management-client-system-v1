import React from 'react';
import { useGetTopProductsQuery } from '../../../store/services/productService';
import { DetailsTable } from '../../table/Details';
import { Item, Row, Table } from '../../table/Table';

const TopProducts = () => {
	const { data, isLoading, error } = useGetTopProductsQuery();

	if (isLoading || error) return null;

	return (
		<Table w={400}>
			<Row title>
				<h6>Top Products</h6>
			</Row>

			{data.map((item, i) => (
				<Row key={i}>
					<Item>{item.name}</Item>
					<Item>{item.totalSold} units sold</Item>
				</Row>
			))}
		</Table>
	);
};

export default TopProducts;
