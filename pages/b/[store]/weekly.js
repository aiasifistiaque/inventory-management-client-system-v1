import React from 'react';
import Page from '../../../components/nav/Page/Page';
import KpiReport from '../../../components/report/KpiReport';
import SalesReport from '../../../components/report/SalesReport';

const Weeklyreportpage = () => {
	return (
		<Page selected='Weekly'>
			<KpiReport date='weekly' title='Weekly Report' category='sales' />
			<SalesReport date='weekly' title='Weekly' />
		</Page>
	);
};

export default Weeklyreportpage;
