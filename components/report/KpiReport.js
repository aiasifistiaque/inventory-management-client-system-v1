import React from 'react';
import { useGetSalesKpiQuery } from '../../store/services/productService';
import { Unit, UnitBox, UnitItem, UnitLayer } from '../dashboard/unit/Unit';
import { Grid, Placeholder, Segment } from 'semantic-ui-react';

const KpiReport = ({ date, title, category }) => {
	const { data, isLoading, error } = useGetSalesKpiQuery(date);
	if (isLoading) return <Loading title={title} />;
	return (
		<div>
			<UnitBox>
				<UnitLayer title={title}>
					<Unit title='Sales'>
						<UnitItem> {data?.count && data.count}</UnitItem>
					</Unit>
					<Unit title='Sale Value'>
						<UnitItem>BDT. {data?.value && data.value}</UnitItem>
					</Unit>
					<Unit title='Units Sold'>
						<UnitItem> {data?.items && data.items}</UnitItem>
					</Unit>
				</UnitLayer>
			</UnitBox>
		</div>
	);
};

const Loading = ({ title }) => (
	<UnitBox>
		<UnitLayer title={title}>
			<Unit>
				<Placeholder>
					<Placeholder.Header>
						<Placeholder.Line />
						<Placeholder.Line />
						<Placeholder.Line />
					</Placeholder.Header>
				</Placeholder>
			</Unit>

			<Unit>
				<Placeholder>
					<Placeholder.Header>
						<Placeholder.Line />
						<Placeholder.Line />
						<Placeholder.Line />
					</Placeholder.Header>
				</Placeholder>
			</Unit>

			<Unit>
				<Placeholder>
					<Placeholder.Header>
						<Placeholder.Line />
						<Placeholder.Line />
						<Placeholder.Line />
					</Placeholder.Header>
				</Placeholder>
			</Unit>
		</UnitLayer>
	</UnitBox>
);

export default KpiReport;
