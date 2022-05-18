import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import Button from '../../buttons/Button';
import styles from './ListPage.module.css';

const ListPage = ({ children, title, button, onClick, href }) => {
	const router = useRouter();
	const url = `/b/${router.query.store}/${href}`;
	return (
		<div className={styles.container}>
			<div className={styles.title}>
				<h4>{title}</h4>
				{href && (
					<Link href={url}>
						<Button text>{button}</Button>
					</Link>
				)}
			</div>
			<div>{children}</div>
		</div>
	);
};

export default ListPage;
