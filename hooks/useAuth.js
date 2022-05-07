import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { tokenName } from '../lib/constants';

const useAuth = () => {
	const [loading, setLoading] = useState(true);
	const [isLoggedIn, setIsLoggedIn] = useState();
	const [authToken, setAuthToken] = useState('');
	const router = useRouter();

	useEffect(() => {
		const token = localStorage.getItem(tokenName);

		if (token != null) {
			setAuthToken(() => token);
			setIsLoggedIn(() => true);
		} else {
			setIsLoggedIn(() => false);
			router.push('/login');
		}
		setLoading(() => false);
	}, []);

	return { loading, isLoggedIn, token: authToken };
};

export default useAuth;
