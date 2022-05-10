import React from 'react';
import ListPage from '../components/nav/listpage/ListPage';
import Page from '../components/nav/Page/Page';
import { Item, Row, Table } from '../components/table/Table';
import { useGetAllProductsQuery } from '../store/services/productService';

const ProductsPage = () => {
	const { data, error, isLoading } = useGetAllProductsQuery();

	return (
		<Page selected='Products'>
			{!isLoading && (
				<ListPage title='Products' button='Add Product' href='/addproduct'>
					<Table title='All Products'>
						<Row title>
							<Item title>Name</Item>
							<Item title>Category</Item>
							<Item title>MRP</Item>
							<Item title>Stock</Item>
							<Item title>Sold</Item>
						</Row>
						{!isLoading &&
							data?.data &&
							data.data.map((item, i) => (
								<Row key={i} href={`/product/${item._id}`}>
									<Item>{item?.name && item.name}</Item>
									<Item>{item?.category?.name && item.category.name}</Item>
									<Item>{item?.price && item.price}</Item>
									<Item>{item?.stock && item.stock}</Item>
									<Item>{item?.totalSold && item.totalSold}</Item>
								</Row>
							))}
					</Table>
				</ListPage>
			)}
		</Page>
	);
};

export default ProductsPage;
