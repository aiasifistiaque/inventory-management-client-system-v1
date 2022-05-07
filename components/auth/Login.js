import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Button from '../buttons/Button';
import AuthContainer from './AuthContainer';
import AuthInput from './AuthInput';
import * as lib from '../../lib/constants';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import { Router, useRouter } from 'next/router';

const Login = () => {
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();
	const [loading, setLoading] = useState();
	const [error, setError] = useState();
	const auth = useAuth();
	const router = useRouter();

	useEffect(() => {
		auth.isLoggedIn && router.push('/');
	}, [auth.loading]);

	const loginClick = async e => {
		e.preventDefault();
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
				/>
				<AuthInput
					label='password'
					value={password}
					onChange={e => setPassword(e)}
					placeholder='Your Password'
					required
					password
				/>
				<div>
					{loading ? <Button>loading</Button> : <Button submit>Login</Button>}
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
