import React from 'react';
import { useGetAllProductsQuery } from '../../store/services/productService';
import { Item, Row, Table } from '../table/Table';

const ProductsTable = ({ category }) => {
	const { data, isLoading, error } = useGetAllProductsQuery(category);
	return (
		<Table title='All Products'>
			<Row title>
				<Item title>Sl.</Item>
				<Item title>Name</Item>
				<Item title>Category</Item>
				<Item title>MRP</Item>
			</Row>
			{!isLoading &&
				data?.data &&
				data.data.map((item, i) => (
					<Row key={i} href={`/product/${item._id}`}>
						<Item>{item && i + 1 < 9 ? `0${i + 1}` : i + 1}</Item>
						<Item>{item?.name && item.name}</Item>
						<Item>{item?.category?.name && item.category.name}</Item>
						<Item>{item?.price && item.price}</Item>
					</Row>
				))}
		</Table>
	);
};

export default ProductsTable;
