import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import Button from '../../buttons/Button';
import styles from './ListPage.module.css';

const ListPage = ({ children, title, button, onClick, href, excel }) => {
	const router = useRouter();
	const url = `/b/${router.query.store}/${href}`;
	return (
		<div className={styles.container}>
			<div className={styles.title}>
				<h4>{title}</h4>
				<div>
					{excel && (
						<Button small outlined onClick={excel}>
							Export to excel
						</Button>
					)}
					{href && (
						<Link href={url}>
							<Button small secondary color='primary'>
								{button}
							</Button>
						</Link>
					)}
				</div>
			</div>
			<div>{children}</div>
		</div>
	);
};

export default ListPage;
