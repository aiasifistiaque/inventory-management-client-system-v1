import React from 'react';

const Section = ({
	children,
	row,
	horizontal,
	align,
	flex,
	justify,
	mv,
	mh,
	mt,
	mb,
	mr,
	ml,
	m,
	style,
}) => {
	return (
		<div
			style={{
				...(m && { margin: m }),
				...(mv && { marginVertical: mv }),
				...(mh && { marginHorizontal: mh }),
				...(mt && { marginTop: mt }),
				...(mb && { marginBottom: mb }),
				...(ml && { marginLeft: ml }),
				...(mr && { marginRight: mr }),

				// marginVertical: mv ? mv : 0,
				// marginHorizontal: mh ? mh : 0,
				// marginTop: mt ? mt : 0,
				// marginBottom: mb ? mb : 0,
				// marginRight: mr ? mr : 0,
				// marginLeft: ml ? ml : 0,
				display: 'flex',
				flex: flex ? flex : 1,
				flexDirection: horizontal ? 'row' : 'column',
				justifyContent: justify ? justify : 'flex-start',
				alignItems: align ? align : 'flex-start',
				...style,
			}}>
			{children}
		</div>
	);
};

export default Section;
