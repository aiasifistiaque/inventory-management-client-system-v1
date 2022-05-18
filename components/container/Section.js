import React from 'react';

const Section = ({
	children,
	row,
	horizontal,
	align,
	flex,
	justify,
	mt,
	mb,
	mr,
	ml,
	m,
	p,
	pl,
	pr,
	pt,
	pb,
	style,
	bg,
}) => {
	return (
		<div
			style={{
				...(m && { margin: m }),
				...(mt && { marginTop: mt }),
				...(mb && { marginBottom: mb }),
				...(ml && { marginLeft: ml }),
				...(mr && { marginRight: mr }),
				...(p && { padding: p }),
				...(pt && { paddingTop: pt }),
				...(pb && { paddingBottom: pb }),
				...(pl && { paddingLeft: pl }),
				...(pr && { paddingRight: pr }),

				// marginVertical: mv ? mv : 0,
				// marginHorizontal: mh ? mh : 0,
				// marginTop: mt ? mt : 0,
				// marginBottom: mb ? mb : 0,
				// marginRight: mr ? mr : 0,
				// marginLeft: ml ? ml : 0,
				width: '100%',
				display: 'flex',
				flex: flex ? flex : 1,
				flexDirection: horizontal ? 'row' : 'column',
				justifyContent: justify ? justify : 'flex-start',
				alignItems: align ? align : 'flex-start',
				backgroundColor: bg ? bg : 'transparent',
				...style,
			}}>
			{children}
		</div>
	);
};

export default Section;
