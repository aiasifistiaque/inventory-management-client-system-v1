import React from 'react';
import styles from './Auth.module.css';

const AuthContainer = ({ children }) => {
	return (
		<div className={styles.container}>
			{/* <div className={styles.img}>
				<img src='/auth.jpg' alt='auth' />
			</div> */}
			<div className={styles.main}>
				<div className={styles.details}>
					{/* <img
						src='/logofull.png'
						style={{ width: 200, objectFit: 'contain' }}
					/> */}
					<div>
						<h3>Welcome to IMS</h3>
					</div>
					{/* <p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
						vulputate libero <br /> et velit interdum,
					</p> */}
					<div className='mt-3'>{children}</div>
				</div>
			</div>
		</div>
	);
};

export default AuthContainer;
