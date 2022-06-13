import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Page from '../../../../components/nav/Page/Page';
import { useGetPurchaseByIdQuery } from '../../../../store/services/productService';
import { DetailsTable } from '../../../../components/table/Details';
import ItemTable, {
	ItemTableRow,
} from '../../../../components/table/item/ItemTable';
import { Item, Row, Table } from '../../../../components/table/Table';

const Purchasepage = () => {
	const router = useRouter();
	const { purchase } = router.query;
	const { data, error, isFetching } = useGetPurchaseByIdQuery(purchase);
	const [item, setItem] = useState();
	useEffect(() => {
		!isFetching && data && setItem(data);
	}, [isFetching]);

	return (
		<div>
			<Page selected='Purchases'>
				<DetailsTable title='Purchase Order'>
					<ItemTable loading={isFetching || !item ? true : false}>
						<ItemTableRow title='Supplier'>
							{item?.supplier?.name && item.supplier.name}
						</ItemTableRow>
						<ItemTableRow title='Total Price' price>
							{item?.totalPrice && item.totalPrice}
						</ItemTableRow>
						<ItemTableRow title='Payment'>
							{item?.paid ? 'paid' : 'due'}
						</ItemTableRow>
						<ItemTableRow title='Date' date>
							{item?.createdAt && item.createdAt}
						</ItemTableRow>
					</ItemTable>
				</DetailsTable>
				<DetailsTable title='Order Items'>
					<Table paginate='no'>
						<Row title>
							<Item title>Name</Item>
							<Item title>Quantity</Item>
							<Item title>Unit Price</Item>
							<Item title>Total Price</Item>
						</Row>
						{item?.orderItems?.map((unit, i) => (
							<Row key={i}>
								<Item>{unit?.product?.name && unit.product.name}</Item>
								<Item>{unit?.quantity && unit.quantity}</Item>
								<Item price>{unit?.price && unit.price}</Item>
								<Item price>
									{unit?.price && unit?.quantity && unit.price * unit.quantity}
								</Item>
							</Row>
						))}
					</Table>
				</DetailsTable>
			</Page>
		</div>
	);
};

export default Purchasepage;
