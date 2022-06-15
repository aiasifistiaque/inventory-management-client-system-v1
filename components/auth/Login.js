import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Button from '../buttons/Button';
import AuthContainer from './AuthContainer';
import AuthInput from './AuthInput';
import * as lib from '../../lib/constants';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import { Router, useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { login } from '../../store/slices/authSlice';
import Error from '../util/error-modal/Error';

const Login = () => {
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();
	const [loading, setLoading] = useState();
	const [error, setError] = useState();
	const auth = useAuth();
	const router = useRouter();
	const dispatch = useDispatch();

	useEffect(() => {
		auth.isLoggedIn && router.push('/');
	}, [auth.loading]);

	const loginClick = async e => {
		e.preventDefault();
		setLoading(true);
		try {
			const config = {
				headers: {
					'Content-Type': 'application/json',
				},
			};

			const { data } = await axios.post(
				`${lib.api.backend}/auth/login`,
				{
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

	const handleKeyPress = e => {
		if (e.code === 'Enter') {
			loginClick(e);
		}
	};
	return (
		<AuthContainer>
			<form onSubmit={loginClick}>
				<AuthInput
					label='email'
					value={email}
					onChange={e => setEmail(e)}
					placeholder='Your Email'
					required
					onKeyPress={e => handleKeyPress(e)}
				/>
				<AuthInput
					label='password'
					value={password}
					onChange={e => setPassword(e)}
					placeholder='Your Password'
					required
					password
					onKeyPress={e => handleKeyPress(e)}
				/>
				<div>
					{loading ? <Button>loading</Button> : <Button submit>Login</Button>}
					<Error
						isError={error ? true : false}
						error={error ? error.message : ''}
					/>
				</div>
			</form>

			<div className='mt-3 ml-2'>
				<h6>Do not have an account?</h6>
				<Link href='/register'>
					<Button text>Sign Up</Button>
				</Link>
			</div>
		</AuthContainer>
	);
};

export default Login;
