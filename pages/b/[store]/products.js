import { useRouter } from 'next/router';
import React, { useState } from 'react';
import ListPage from '../../../components/nav/listpage/ListPage';
import Page from '../../../components/nav/Page/Page';
import { Item, Row, Table } from '../../../components/table/Table';
import { useGetAllProductsQuery } from '../../../store/services/productService';
import * as XLSX from 'xlsx';

const ProductsPage = () => {
	const router = useRouter();
	const store = router.query.store;
	const [page, setPage] = useState();

	const { data, error, isLoading, isFetching, isError } =
		useGetAllProductsQuery({
			page,
		});

	const downloadExcel = excelData => {
		let dat = [];
		try {
			excelData?.map((item, i) => {
				let newData = { ...item };
				newData.brand = item?.brand?.name || '';
				newData.user = item?.user?.name || '';
				newData.category = item?.category?.name || '';
				dat.push(newData);
			});

			const worksheet = XLSX.utils.json_to_sheet(dat);
			const workbook = XLSX.utils.book_new();
			XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
			XLSX.writeFile(workbook, `Products_DataSheet_${Date.now()}.xlsx`);
		} catch (e) {
			console.log(e.message);
		}
	};

	return (
		<Page selected='Products'>
			<ListPage
				isError={isError}
				error={error}
				title='Products'
				button='New Product'
				href={`/addproduct`}
				excel={() => {
					!isLoading && data.data && downloadExcel(data.data);
				}}>
				<Table
					title='All Products'
					isLoading={isFetching}
					page={data?.page ? data.page : 1}
					totalPages={data?.totalPages ? data.totalPages : 1}
					setPage={e => setPage(e)}>
					<Row title>
						<Item title w={64}>
							#
						</Item>
						<Item title>Name</Item>
						<Item title>SKU</Item>
						<Item title>Category</Item>
						<Item title>MRP</Item>
						<Item title>Stock</Item>
						<Item title>Sold</Item>
					</Row>
					{!isLoading &&
						data?.data &&
						data.data.map((item, i) => (
							<Row key={i} href={`/b/${store}/product/${item._id}`} i={i}>
								<Item w={64}>{item && i + 1 <= 9 ? `0${i + 1}` : i + 1}</Item>
								<Item>{item?.name && item.name}</Item>
								<Item>{item?.sku && item.sku}</Item>
								<Item>{item?.category?.name && item.category.name}</Item>
								<Item>{item?.price && item.price}</Item>
								<Item>{item?.stock && item.stock}</Item>
								<Item>{item?.totalSold && item.totalSold}</Item>
							</Row>
						))}
				</Table>
			</ListPage>
		</Page>
	);
};

export default ProductsPage;
