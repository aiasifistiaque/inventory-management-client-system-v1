import React, { useEffect, useState } from 'react';
import styles from './ErrorModal.module.css';
import { Modal } from 'semantic-ui-react';

const Success = ({ children, isSuccess, title }) => {
	const [open, setOpen] = useState(false);
	useEffect(() => {
		if (isSuccess) {
			setOpen(true);
		}
	}, [isSuccess]);

	return (
		<Modal
			basic
			onClose={() => setOpen(false)}
			onOpen={() => setOpen(true)}
			open={open}
			size='small'>
			<div className={styles.container}>
				<div className={styles.header}>
					<h6>Success</h6>
				</div>
				<div className={styles.body}>
					<img src='/icons/tick.png' />
					<h6>{title ? title : '200: Success'}</h6>
					<p>{children}</p>
				</div>
				<div className={styles.footer} onClick={() => setOpen(false)}>
					<p>Dismiss</p>
				</div>
			</div>
		</Modal>
	);
};

export default Success;
