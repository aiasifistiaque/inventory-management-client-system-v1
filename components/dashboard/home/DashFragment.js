import React from 'react';
import { Unit, UnitItem, UnitLayer } from '../unit/Unit';

const DashFragment = ({ data, storeData }) => {
	return (
		<>
			<UnitLayer title={`${storeData?.data?.store?.name} store overview`}>
				<Unit title='Products'>
					<UnitItem> {data?.data?.products && data.data.products}</UnitItem>
				</Unit>
				<Unit title='Categories'>
					<UnitItem>{data?.data?.categories && data.data.categories}</UnitItem>
				</Unit>
				<Unit title='Brands'>
					<UnitItem>{data?.data?.brands && data.data.brands}</UnitItem>
				</Unit>
				<Unit title='Products'>
					<UnitItem> {data?.data?.products && data.data.products}</UnitItem>
				</Unit>
				<Unit title='Inventory'>
					<UnitItem title='Total Item'>
						{data?.data?.inventory?.count && data.data.inventory.count}
					</UnitItem>
					<UnitItem value title='Total Value'>
						{data?.data?.inventory?.value && data.data.inventory.value}
					</UnitItem>
				</Unit>
				<History data={data?.data?.purchase && data.data.purchase}>
					{`Purchases [All Time]`}
				</History>
				<History data={data?.data?.sales && data.data.sales}>
					{`Sales [All Time]`}{' '}
				</History>
				<History data={data?.data?.expenses && data.data.expenses}>
					{`Expenses [All Time]`}{' '}
				</History>
			</UnitLayer>
			<UnitLayer title='Purchases'>
				<History data={data?.data?.purchase && data.data.purchase}>
					All Time
				</History>

				<History data={data?.data?.purchaseToday && data.data.purchaseToday}>
					Today
				</History>
				<History
					data={data?.data?.purchaseYesterday && data.data.purchaseYesterday}>
					Yesterday
				</History>
				<History
					data={data?.data?.purchaseThisWeek && data.data.purchaseThisWeek}>
					This Week
				</History>
				<History
					data={data?.data?.purchaseLastWeek && data.data.purchaseLastWeek}>
					Last Week
				</History>
				<History
					data={data?.data?.purchaseThisMonth && data.data.purchaseThisMonth}>
					This Month
				</History>
				<History
					data={data?.data?.purchaseLastMonth && data.data.purchaseLastMonth}>
					Last Month
				</History>
			</UnitLayer>
			<UnitLayer title='Sales'>
				<History data={data?.data?.sales && data.data.sales}>All Time</History>

				<History data={data?.data?.salesToday && data.data.salesToday}>
					Today
				</History>
				<History data={data?.data?.salesYesterday && data.data.salesYesterday}>
					Yesterday
				</History>
				<History data={data?.data?.salesThisWeek && data.data.salesThisWeek}>
					This Week
				</History>
				<History data={data?.data?.salesLastWeek && data.data.salesLastWeek}>
					Last Week
				</History>
				<History data={data?.data?.salesThisMonth && data.data.salesThisMonth}>
					This Month
				</History>
				<History data={data?.data?.salesLastMonth && data.data.salesLastMonth}>
					Last Month
				</History>
			</UnitLayer>
		</>
	);
};

const History = ({ children, data }) => {
	return (
		<Unit title={children}>
			<UnitItem title='Total'>{data?.count && data?.count}</UnitItem>
			<UnitItem value title='Value'>
				{data?.value && data.value}
			</UnitItem>
		</Unit>
	);
};

export default DashFragment;
