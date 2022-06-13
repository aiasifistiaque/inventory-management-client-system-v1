import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Section from '../../components/container/Section';
import DashFragment from '../../components/dashboard/home/DashFragment';
import SalesReport from '../../components/dashboard/home/SalesReport';
import TopProducts from '../../components/dashboard/home/TopProducts';
import KpiLoading from '../../components/dashboard/unit/KpiLoading';
import {
	Unit,
	UnitBox,
	UnitItem,
	UnitLayer,
} from '../../components/dashboard/unit/Unit';
import Page from '../../components/nav/Page/Page';
import Container from '../../components/util/container/Container';
import useAuth from '../../hooks/useAuth';
import {
	useGetDashboardQuery,
	useGetStoreDataQuery,
} from '../../store/services/productService';

export default function Storehome() {
	const router = useRouter();
	const auth = useAuth();
	const { store } = router.query;
	const storeData = useGetStoreDataQuery(store);
	const { data, isLoading, error } = useGetDashboardQuery(store);

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
			{isLoading ? (
				<KpiLoading title='Store Overview' />
			) : (
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
						<Unit title='Employees'>
							<UnitItem>
								{data?.data?.employees && data.data.employees}
							</UnitItem>
						</Unit>
						<Unit title='Customers'>
							<UnitItem>
								{data?.data?.customers && data.data.customers}
							</UnitItem>
						</Unit>
						<Unit title='Inventory'>
							<UnitItem title='Total Item'>
								{data?.data?.inventory?.count && data.data.inventory.count}
							</UnitItem>
							<UnitItem value title='Total Value'>
								{data?.data?.inventory?.value && data.data.inventory.value}
							</UnitItem>
						</Unit>

						<History data={data?.data?.sales && data.data.sales}>
							{`Sales [All Time]`}{' '}
						</History>
					</UnitLayer>
				</UnitBox>
			)}
			<Container horizontal>
				<Section flex={2}>
					<SalesReport />
				</Section>
				<Section>
					<TopProducts />
				</Section>
			</Container>
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
