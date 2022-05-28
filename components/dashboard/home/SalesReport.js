import React, { PureComponent } from 'react';
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
	AreaChart,
	Area,
} from 'recharts';

import { useGetSalesReportQuery } from '../../../store/services/productService';
import { DetailsTable } from '../../table/Details';

const SalesReport = () => {
	const { data, isLoading, error } = useGetSalesReportQuery();
	if (isLoading || error) return null;

	return (
		<DetailsTable title='Weekly Sales'>
			<ResponsiveContainer width={700} height={335}>
				<AreaChart
					data={data}
					margin={{
						top: 32,
						right: 30,
						left: 0,
						bottom: 16,
					}}>
					<defs>
						<linearGradient id='colorUv' x1='0' y1='0' x2='0' y2='1'>
							<stop offset='5%' stopColor='#8884d8' stopOpacity={0.8} />
							<stop offset='95%' stopColor='#8884d8' stopOpacity={0} />
						</linearGradient>
						<linearGradient id='colorPv' x1='0' y1='0' x2='0' y2='1'>
							<stop offset='5%' stopColor='#82ca9d' stopOpacity={0.8} />
							<stop offset='95%' stopColor='#82ca9d' stopOpacity={0} />
						</linearGradient>
					</defs>
					<XAxis dataKey='name' />
					<YAxis />
					<CartesianGrid strokeDasharray='3 3' />
					<Tooltip />
					<Area
						type='monotone'
						dataKey='value'
						stroke='#8884d8'
						fillOpacity={1}
						fill='url(#colorUv)'
					/>

					{/* <Line type='monotone' dataKey='uv' stroke='#82ca9d' /> */}
				</AreaChart>
			</ResponsiveContainer>
		</DetailsTable>
	);
};

export default SalesReport;
