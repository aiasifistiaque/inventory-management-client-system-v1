import React from 'react';
import Page from '../../../components/nav/Page/Page';
import KpiReport from '../../../components/report/KpiReport';
import SalesReport from '../../../components/report/SalesReport';

const Statspage = () => {
	return (
		<Page selected='Stats'>
			<KpiReport date='all time' title='Data [All Time]' category='sales' />
			<SalesReport date='all-time' title='All Time' />
		</Page>
	);
};

export default Statspage;
