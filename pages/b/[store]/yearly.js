import React from 'react';
import Page from '../../../components/nav/Page/Page';
import KpiReport from '../../../components/report/KpiReport';
import SalesReport from '../../../components/report/SalesReport';

const Yearlyreportpage = () => {
	return (
		<Page selected='Yearly'>
			<KpiReport date='yearly' title='Yearly Report' category='sales' />
			<SalesReport date='yearly' title='Yearly' />
		</Page>
	);
};

export default Yearlyreportpage;
