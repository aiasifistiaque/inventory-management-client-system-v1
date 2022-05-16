import React from 'react';
import { SmallItem, SmallRow } from '../table/small/SmallTable';
import { PosItem, PosRow, PosSelectQty } from './PosItems';

const SelectedProducts = ({ orderItems, increase, decrease, del }) => {
	return (
		<>
			{/* <PosRow title>
				<PosItem title>Description</PosItem>
				<PosItem title>Amount</PosItem>
			</PosRow> */}
			{orderItems &&
				orderItems.length > 0 &&
				orderItems.map((item, i) => (
					<PosRow key={i}>
						<div>
							<PosItem flex={2}>{item?.name && item.name}</PosItem>
							<PosSelectQty
								flex={1}
								inc={() => increase(item)}
								dec={() => decrease(item)}>
								৳{item?.price && item.price} x {item.quantity}
							</PosSelectQty>
						</div>
						<div>
							<PosItem flex={1}>
								৳{item?.price && item.quantity * item.price}
							</PosItem>
							<PosSelectQty flex={1} del={() => del(item)} />
						</div>
					</PosRow>
				))}
		</>
	);
};

export default SelectedProducts;
