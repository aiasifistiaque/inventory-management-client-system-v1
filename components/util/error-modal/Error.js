import React, { useEffect, useState } from 'react';
import styles from './ErrorModal.module.css';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';

const Error = ({ error, children, isError, title }) => {
	const [open, setOpen] = useState(false);
	useEffect(() => {
		if (isError) {
			setOpen(true);
		}
	}, [isError]);

	return (
		<Modal
			basic
			onClose={() => setOpen(false)}
			onOpen={() => setOpen(true)}
			open={open}
			size='small'>
			<div className={styles.container}>
				<div className={styles.header}>
					<h6>An error has occured</h6>
				</div>
				<div className={styles.body}>
					<img src='/icons/warning-red.png' />
					<h6>{title ? title : 'Error: Request Failed'}</h6>
					<p>
						{children?.data?.message
							? children.data.message
							: children?.data
							? children.data
							: 'Error'}
					</p>
				</div>
				<div className={styles.footer} onClick={() => setOpen(false)}>
					<p>Dismiss</p>
				</div>
			</div>
		</Modal>
	);
};

export default Error;
