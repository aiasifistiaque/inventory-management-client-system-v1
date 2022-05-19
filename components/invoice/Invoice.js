import React from 'react';
import styles from './Invoice.module.css';
import moment from 'moment';
import { Hr, Mt } from '../util/Margins';
import { QRCodeCanvas } from 'qrcode.react';
import Barcode from 'react-barcode';
import * as lib from '../../lib/constants';
import Section from '../container/Section';

const Invoice = ({ data }) => {
	const {
		store,
		_id,
		createdAt,
		user,
		orderItems,
		totalPrice,
		shippingPrice,
		vat,
		itemPrice,
		discount,
		paymentMethod,
		isPaid,
		terms,
	} = data;

	if (!data) return null;
	return (
		<div>
			<Section horizontal mb={64}>
				<Section justify='space-between'>
					<h5>{store?.name && store.name}</h5>
					<p>{store?.address?.street && store.address.street},</p>
					<p>
						{store?.address?.city && store.address.city}{' '}
						{store?.address?.postCode && store.address.postCode}
					</p>
					<p>Phone: {store?.phone && store.phone}</p>
				</Section>

				<QRCodeCanvas value={`${lib.api.app}/invoices/${data._id}`} />
			</Section>
			<Details>
				<Detail title='Invoice #'>{_id && _id}</Detail>
				<Detail title='Date' date>
					{createdAt && createdAt}
				</Detail>
				<Detail title='Time' time>
					{createdAt && createdAt}
				</Detail>
				<Detail title='Cashier'>{user?.name && user.name}</Detail>
			</Details>
			<Table>
				<Row title>
					<Item title>Description</Item>
					<Item title>Qty</Item>
					<Item title>Unit Price</Item>
					<Item title>Total</Item>
				</Row>
				{orderItems &&
					orderItems?.map((item, i) => (
						<Row key={i}>
							<Item>{item?.product?.name && item.product.name}</Item>
							<Item>{item.quantity && item.quantity}</Item>
							<Item>{item.price && item.price}</Item>
							<Item>
								{item.price && item.quantity && item.price * item.quantity}
							</Item>
						</Row>
					))}
			</Table>
			<Details>
				<Detail title='Sub Total'>{itemPrice && itemPrice}</Detail>
				<Detail title='VAT'>{vat && vat}</Detail>
				<Detail title='Shipping'>{shippingPrice && shippingPrice}</Detail>
				<Detail title='Discount'>{discount && discount}</Detail>
				<Hr />
				<Detail title='Net Payable'>{totalPrice && totalPrice}</Detail>
				<Detail title='Payment Method'>{paymentMethod && paymentMethod}</Detail>
				<Detail title='Payment Status'>{isPaid ? 'Paid' : 'Due'}</Detail>
				<Hr />
			</Details>
			<Section>
				<p>Terms {`&`} Conditions</p>

				{store?.terms &&
					store.terms.map((item, i) => (
						<p key={i}>
							{'# '} {item}
						</p>
					))}
			</Section>
			<Hr />
			<Section justify='center' align={'center'} mt={64}>
				<p style={{ textAlign: 'center' }}>
					If you have any questions about this invoice please contact
				</p>
				<p>{store?.phone && store.phone}</p>
				<p>or, email us at {store?.email && store.email}</p>
				<Mt size={4} />
				<h2>Thank You</h2>
			</Section>
			<Section mt={32} mb={24} justify='center' align={'center'}>
				<Barcode value={data?._id ? data._id : ''} height={50} width={2} />,
			</Section>
			<Section justify='center' align={'center'}>
				{`${lib.api.app}/invoices/${data._id}`}
			</Section>
		</div>
	);
};

const Details = ({ children }) => {
	return <div className={styles.details}>{children}</div>;
};

const Detail = ({ title, children, date, time }) => {
	return (
		<div className={styles.detail}>
			<h6>{title}</h6>
			{date || time
				? moment(children).format(time ? 'hh:mm:ss A' : 'MMMM Do YYYY')
				: children}
		</div>
	);
};

export const Table = ({ children, href, title }) => {
	return <div className={styles.table}>{children}</div>;
};

export const Row = ({ children, href, title }) => {
	if (title) return <div className={styles.titleRow}>{children}</div>;
	return <div className={styles.row}>{children}</div>;
};

export const Item = ({ children, title, date, email }) => {
	if (title)
		return (
			<div className={styles.titleItem}>
				<h6>{children}</h6>
			</div>
		);
	return (
		<div className={styles.item}>
			<p style={email ? { textTransform: 'lowercase' } : {}}>
				{date ? moment(children).calendar() : children}
			</p>
		</div>
	);
};

export default Invoice;
