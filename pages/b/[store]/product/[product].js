import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Page from '../../../../components/nav/Page/Page';
import {
	useGetProductByIdQuery,
	useUpdateProductMutation,
} from '../../../../store/services/productService';
import Barcode from 'react-barcode';
import { QRCodeSVG, QRCodeCanvas } from 'qrcode.react';
import ItemTable, {
	ItemTableRow,
} from '../../../../components/table/item/ItemTable';
import EditTable from '../../../../components/table/edit/EditTable';
import Section from '../../../../components/container/Section';

const Productpage = () => {
	const router = useRouter();
	const { product } = router.query;
	const { data, error, isLoading, isError } = useGetProductByIdQuery(product);
	const [item, setItem] = useState();
	const [editing, setEditing] = useState(false);
	const [name, setName] = useState();
	const [price, setPrice] = useState();
	const [cost, setCost] = useState();
	const [alert, setAlert] = useState();

	const [update, result] = useUpdateProductMutation();

	const initialize = () => {
		setItem(data);
		setName(data?.name && data.name);
		setPrice(data?.price && data.price);
		setCost(data?.cost && data.cost);
		setAlert(data?.stockAlert && data.stockAlert);
	};

	const onSubmit = () => {
		update({
			id: data?._id && data._id,
			price,
			cost,
			name,
			stockAlert: alert,
		});
	};

	const onCancel = () => {
		setEditing(false);
		initialize();
	};

	useEffect(() => {
		if (!isLoading && data) {
			initialize();
		}
	}, [isLoading]);

	useEffect(() => {
		if (!result.isLoading && result.isSuccess) {
			setEditing(false);
		}
	}, [result.isLoading]);

	return (
		<Page selected='Products' error={error} isError={isError}>
			<EditTable
				result={result}
				title='Product'
				edit={() => setEditing(true)}
				submit={onSubmit}
				editing={editing}
				cancel={onCancel}>
				<ItemTable loading={isLoading || !item ? true : false}>
					<ItemTableRow
						title='Name'
						editing={editing}
						onChange={e => setName(e)}>
						{name && name}
					</ItemTableRow>
					<ItemTableRow title='SKU'>{item?.sku && item.sku}</ItemTableRow>

					<ItemTableRow title='Id'>{item?._id && item._id}</ItemTableRow>
					<ItemTableRow title='Category'>
						{item?.category?.name && item.category.name}{' '}
						{item?.category?.code && `- ${item.category.code}`}
					</ItemTableRow>
					<ItemTableRow title='Brand'>
						{item?.brand?.name ? item.brand.name : 'Not defined'}
					</ItemTableRow>
					<ItemTableRow title='Stock'>{item?.stock && item.stock}</ItemTableRow>
					<ItemTableRow
						title='Low Stock Alert'
						editing={editing}
						number
						onChange={e => setAlert(e)}>
						{alert && alert}
					</ItemTableRow>

					<ItemTableRow
						title='Price'
						price
						editing={editing}
						onChange={e => setPrice(e)}>
						{price && price}
					</ItemTableRow>
					<ItemTableRow
						title='Cost'
						price
						editing={editing}
						onChange={e => setCost(e)}>
						{cost && cost}
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
						<Barcode value={item?.sku ? item.sku : ''} />
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
			</EditTable>
		</Page>
	);
};

export default Productpage;
