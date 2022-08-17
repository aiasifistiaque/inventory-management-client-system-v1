import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import Button from '../buttons/Button';
import AuthContainer from './AuthContainer';
import AuthInput from './AuthInput';
import * as lib from '../../lib/constants';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import Error from '../util/error-modal/Error';

import { useGetAllProductsQuery } from '../../store/services/productService';
import { login } from '../../store/slices/authSlice';
import useAuth from '../../hooks/useAuth';
import { Router, useRouter } from 'next/router';

const Register = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirm, setConfirm] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState();

	const auth = useAuth();

	const dispatch = useDispatch();
	const router = useRouter();

	const registerClick = async e => {
		e.preventDefault();
		setLoading(true);
		try {
			const config = {
				headers: {
					'Content-Type': 'application/json',
				},
			};

			const { data } = await axios.post(
				`${lib.api.backend}/auth/register`,
				{
					name,
					email,
					password,
				},
				config
			);

			dispatch(login(data));
			localStorage.setItem(lib.tokenName, JSON.stringify(data));
			setLoading(false);
		} catch (error) {
			console.log(error);
			setError(error);
			setLoading(false);
		}
	};

	useEffect(() => {
		if (auth.isLoggedIn) {
			router.push('/');
		}
	}, [auth.loading]);

	if (auth.loading) return null;

	return (
		<AuthContainer>
			<form onSubmit={registerClick}>
				<AuthInput
					label='Name'
					value={name}
					onChange={e => setName(e)}
					placeholder='Your Name'
					required
				/>
				<AuthInput
					label='email'
					value={email}
					onChange={e => setEmail(e)}
					placeholder='Your Email'
					required
				/>
				<AuthInput
					value={password}
					onChange={e => setPassword(e)}
					label='password'
					placeholder='Your Password'
					required
					password
				/>
				<AuthInput
					value={confirm}
					onChange={e => setConfirm(e)}
					label='confirm passoword'
					placeholder='Confirm Password'
					required
					password
				/>
				<div>
					{loading ? <Button>loading</Button> : <Button submit>Sign Up</Button>}
					<Error
						isError={loading ? false : error ? true : false}
						error={error ? error.message : ''}
					/>
				</div>
			</form>

			<div className='mt-3 ml-2'>
				<h6>Already have an account?</h6>
				<Link href='/login'>
					<Button text>Log In</Button>
				</Link>
			</div>
		</AuthContainer>
	);
};

export default Register;
