import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Page from '../../components/nav/Page/Page';
import { useGetProductByIdQuery } from '../../store/services/productService';
import { DetailsItem, DetailsTable } from '../../components/table/Details';
import Barcode from 'react-barcode';
import { QRCodeSVG, QRCodeCanvas } from 'qrcode.react';

const Productpage = () => {
	const router = useRouter();
	const { product } = router.query;
	const { data, error, isLoading } = useGetProductByIdQuery(product);
	const [item, setItem] = useState();
	useEffect(() => {
		!isLoading && data?.data && setItem(data.data);
	}, [isLoading]);

	if (isLoading || !item) return <Page selected='Products'>Loading</Page>;
	return (
		<div>
			<Page selected='Products'>
				<DetailsTable title='Product'>
					<Barcode value={item?._id ? item._id : ''} />,
					<div>
						<QRCodeCanvas value={item?._id ? item._id : ''} />
						<p>{item?.name && item.name}</p>
						<p>Price: BDT {item?.price && item.price}</p>
						<br />
					</div>
					<DetailsItem title='Name'>{item?.name && item.name}</DetailsItem>
					<DetailsItem title='Id'>{item?._id && item._id}</DetailsItem>
					<DetailsItem title='Category'>
						{item?.category?.name && item.category.name}
					</DetailsItem>
					<DetailsItem title='Brand'>
						{item?.brand?.name ? item.brand.name : 'Not defined'}
					</DetailsItem>
					<DetailsItem title='Stock'>{item?.stock && item.stock}</DetailsItem>
					<DetailsItem title='Price'>{item?.price && item.price}</DetailsItem>
					<DetailsItem title='Cost'>{item?.cost && item.cost}</DetailsItem>
					<DetailsItem title='Date Added' date>
						{item?.createdAt && item.createdAt}
					</DetailsItem>
				</DetailsTable>
			</Page>
		</div>
	);
};

export default Productpage;
