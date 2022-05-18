import { useRouter } from 'next/router';
import { useEffect } from 'react';
import {
	Unit,
	UnitBox,
	UnitItem,
	UnitLayer,
} from '../../components/dashboard/unit/Unit';
import Page from '../../components/nav/Page/Page';
import useAuth from '../../hooks/useAuth';
import {
	useGetDashboardQuery,
	useGetStoreDataQuery,
} from '../../store/services/productService';

export default function Storehome() {
	const router = useRouter();
	const auth = useAuth();
	const { data, isLoading, error } = useGetDashboardQuery();
	const { store } = router.query;
	const storeData = useGetStoreDataQuery(store);

	useEffect(() => {
		if (!auth.loading) {
			if (!auth.isLoggedIn) {
				router.push('/login');
			}
		}
	}, [auth.loading]);
	if (auth.loading) return null;

	return (
		<Page selected='Dashboard' store={store}>
			<UnitBox isLoading={isLoading}>
				<UnitLayer title={`${storeData?.data?.store?.name} store overview`}>
					<Unit title='Products'>
						<UnitItem> {data?.data?.products && data.data.products}</UnitItem>
					</Unit>
					<Unit title='Categories'>
						<UnitItem>
							{data?.data?.categories && data.data.categories}
						</UnitItem>
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
					<History data={data?.data?.sales && data.data.sales}>
						All Time
					</History>

					<History data={data?.data?.salesToday && data.data.salesToday}>
						Today
					</History>
					<History
						data={data?.data?.salesYesterday && data.data.salesYesterday}>
						Yesterday
					</History>
					<History data={data?.data?.salesThisWeek && data.data.salesThisWeek}>
						This Week
					</History>
					<History data={data?.data?.salesLastWeek && data.data.salesLastWeek}>
						Last Week
					</History>
					<History
						data={data?.data?.salesThisMonth && data.data.salesThisMonth}>
						This Month
					</History>
					<History
						data={data?.data?.salesLastMonth && data.data.salesLastMonth}>
						Last Month
					</History>
				</UnitLayer>
			</UnitBox>
		</Page>
	);
}

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
