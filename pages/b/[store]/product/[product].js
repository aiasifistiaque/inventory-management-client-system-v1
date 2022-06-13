import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Page from '../../../../components/nav/Page/Page';
import { useGetProductByIdQuery } from '../../../../store/services/productService';
import { DetailsTable } from '../../../../components/table/Details';
import Barcode from 'react-barcode';
import { QRCodeSVG, QRCodeCanvas } from 'qrcode.react';
import ItemTable, {
	ItemTableRow,
} from '../../../../components/table/item/ItemTable';

const Productpage = () => {
	const router = useRouter();
	const { product } = router.query;
	const { data, error, isLoading } = useGetProductByIdQuery(product);
	const [item, setItem] = useState();
	useEffect(() => {
		!isLoading && data?.data && setItem(data.data);
	}, [isLoading]);

	return (
		<div>
			<Page selected='Products'>
				<DetailsTable title='Product'>
					<ItemTable loading={isLoading || !item ? true : false}>
						<ItemTableRow title='Name'>{item?.name && item.name}</ItemTableRow>
						<ItemTableRow title='Id'>{item?._id && item._id}</ItemTableRow>
						<ItemTableRow title='Category'>
							{item?.category?.name && item.category.name}
						</ItemTableRow>
						<ItemTableRow title='Brand'>
							{item?.brand?.name ? item.brand.name : 'Not defined'}
						</ItemTableRow>
						<ItemTableRow title='Stock'>
							{item?.stock && item.stock}
						</ItemTableRow>
						<ItemTableRow title='Price' price>
							{item?.price && item.price}
						</ItemTableRow>
						<ItemTableRow title='Cost' price>
							{item?.cost && item.cost}
						</ItemTableRow>
						<ItemTableRow title='Total Sold'>
							{item?.totalSold && item.totalSold}
						</ItemTableRow>
						<ItemTableRow title='Added by'>
							{item?.user?.name && item.user.name}{' '}
							{`(${item?.user?.email && item.user.email})`}
						</ItemTableRow>

						<ItemTableRow title='Date Added' date>
							{item?.createdAt && item.createdAt}
						</ItemTableRow>
						<ItemTableRow title='Last Updated' date>
							{item?.createdAt && item.updatedAt}
						</ItemTableRow>
						<ItemTableRow title='Barcode'>
							<>
								<Barcode value={item?._id ? item._id : ''} />,
							</>
						</ItemTableRow>
						<ItemTableRow title='QR'>
							<div>
								<QRCodeCanvas value={item?._id ? item._id : ''} />
								<p>{item?.name && item.name}</p>
								<p>Price: BDT {item?.price && item.price}</p>
								<br />
							</div>
						</ItemTableRow>
					</ItemTable>
				</DetailsTable>
			</Page>
		</div>
	);
};

export default Productpage;
