import React from 'react';
import Page from '../../../components/nav/Page/Page';
import KpiReport from '../../../components/report/KpiReport';
import SalesReport from '../../../components/report/SalesReport';

const Dailyreportpage = () => {
	return (
		<Page selected='Daily'>
			<KpiReport date='today' title='Daily Report' category='sales' />
			<SalesReport date='today' title='Daily' />
		</Page>
	);
};

export default Dailyreportpage;
