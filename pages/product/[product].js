import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Page from '../../components/nav/Page/Page';
import { useGetProductByIdQuery } from '../../store/services/productService';
import { DetailsItem, DetailsTable } from '../../components/table/Details';
import { Item } from '../../components/table/Table';

const Productpage = () => {
	const router = useRouter();
	const { product } = router.query;
	const { data, error, isLoading } = useGetProductByIdQuery(product);
	const [item, setItem] = useState();
	useEffect(() => {
		!isLoading && setItem(data.data);
	}, [isLoading]);

	if (isLoading || !item) return <Page selected='Products'>Loading</Page>;
	return (
		<div>
			<Page selected='Products'>
				<DetailsTable title='Product'>
					<DetailsItem title='Name'>{item.name}</DetailsItem>
					<DetailsItem title='Id'>{item._id}</DetailsItem>
					<DetailsItem title='Category'>{item.category}</DetailsItem>
					<DetailsItem title='Stock'>{item.stock}</DetailsItem>
					<DetailsItem title='Price'>{item.price}</DetailsItem>
					<DetailsItem title='Cost'>{item.cost}</DetailsItem>
					<DetailsItem title='Date Added' date>
						{item.createdAt}
					</DetailsItem>
				</DetailsTable>
			</Page>
		</div>
	);
};

export default Productpage;
