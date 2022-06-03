import React from 'react';
import Page from '../../../components/nav/Page/Page';
import KpiReport from '../../../components/report/KpiReport';
import SalesReport from '../../../components/report/SalesReport';

const Monthlyreportpage = () => {
	return (
		<Page selected='Monthly'>
			<KpiReport date='monthly' title='Monthly Report' category='sales' />
			<SalesReport date='monthly' title='Monthly' />
		</Page>
	);
};

export default Monthlyreportpage;
