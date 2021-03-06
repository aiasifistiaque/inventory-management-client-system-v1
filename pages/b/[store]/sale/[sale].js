import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Page from '../../../../components/nav/Page/Page';
import { useGetSalesByIdQuery } from '../../../../store/services/productService';
import { DetailsTable } from '../../../../components/table/Details';

import Invoice from '../../../../components/invoice/Invoice';
import Pdf from 'react-to-pdf';
import Section from '../../../../components/container/Section';
import Button from '../../../../components/buttons/Button';

const Salepage = () => {
	const router = useRouter();
	const { sale } = router.query;
	const { data, error, isLoading, isError } = useGetSalesByIdQuery(sale);
	const [item, setItem] = useState();
	const invRef = useRef();
	useEffect(() => {
		!isLoading && !isError && data && setItem(data);
	}, [isLoading]);

	return (
		<Page selected='Invoice' error={error} isError={isError}>
			{!isLoading && (
				<>
					<div ref={invRef}>
						<Invoice data={data} />
					</div>
					<Section flex={0.01} horizontal ml={16} justify='center'>
						<Pdf
							targetRef={invRef}
							filename={`${data?._id && data._id}_${
								data?.store?.name && data.store.name
							}`}
							scale={0.65}>
							{({ toPdf }) => (
								<Button text onClick={toPdf}>
									Download Invoice
								</Button>
							)}
						</Pdf>
					</Section>
				</>
			)}
		</Page>
	);
};

export default Salepage;
