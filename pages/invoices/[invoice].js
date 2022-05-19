import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Page from '../../components/nav/Page/Page';
import { useGetSalesByIdQuery } from '../../store/services/productService';
import { DetailsTable } from '../../components/table/Details';
import Invoice from '../../components/invoice/Invoice';
import Pdf from 'react-to-pdf';
import Section from '../../components/container/Section';
import Button from '../../components/buttons/Button';

const Invoicepage = () => {
	const router = useRouter();
	const { invoice } = router.query;
	const { data, error, isLoading } = useGetSalesByIdQuery(invoice);
	const [item, setItem] = useState();
	const invRef = useRef();
	useEffect(() => {
		!isLoading && data && setItem(data);
	}, [isLoading]);

	return !isLoading && data ? (
		<div>
			<Page landing selected='Invoice' error={error}>
				<div ref={invRef}>
					<Invoice data={data} />
				</div>

				<Section flex={0.01} horizontal ml={16} justify='center'>
					<Pdf
						targetRef={invRef}
						filename={`${data._id}_${data.store.name}`}
						scale={0.6}>
						{({ toPdf }) => (
							<Button text onClick={toPdf}>
								Download Invoice
							</Button>
						)}
					</Pdf>
				</Section>
			</Page>
		</div>
	) : null;
};

export default Invoicepage;
