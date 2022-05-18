import React from 'react';
import { useGetAllProductsQuery } from '../../store/services/productService';
import { Card, CardItem, Cards, CardTitle } from '../card/Card';

const ProductsList = ({ category, addItem }) => {
	const { data, isLoading, error } = useGetAllProductsQuery(category);
	const onClick = item => {
		addItem(item);
	};
	return (
		<Cards title='All Products'>
			{!isLoading &&
				data?.data &&
				data.data.map((item, i) => (
					<Card
						key={i}
						w={220}
						onClick={item.stock > 0 ? () => onClick(item) : null}>
						<CardTitle>{item?.name && item.name}</CardTitle>
						<CardItem>{item?.price && `Tk. ${item.price}`}</CardItem>
						{item.stock > 0 ? (
							<CardItem sub>Stock: {item?.stock && `${item.stock}`}</CardItem>
						) : (
							<CardItem danger>Out of stock</CardItem>
						)}
					</Card>
				))}
		</Cards>
	);
};

export default ProductsList;
