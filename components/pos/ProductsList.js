import React from 'react';
import { useGetAllProductsQuery } from '../../store/services/productService';
import { Card, CardItem, Cards, CardTitle } from '../card/Card';

const ProductsList = ({ category, addItem }) => {
	const { data, isLoading, error } = useGetAllProductsQuery(category);
	return (
		<Cards title='All Products'>
			{!isLoading &&
				data?.data &&
				data.data.map((item, i) => (
					<Card
						key={i}
						w={220}
						onClick={() => {
							addItem(item);
						}}>
						<CardTitle>{item?.name && item.name}</CardTitle>
						<CardItem>{item?.price && `Tk. ${item.price}`}</CardItem>
					</Card>
				))}
		</Cards>
	);
};

export default ProductsList;
