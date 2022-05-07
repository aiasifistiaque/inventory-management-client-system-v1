import { createSlice } from '@reduxjs/toolkit';
import { tokenName } from '../../lib/constants';

export const authSlice = createSlice({
	name: 'auth',
	initialState: {
		token: null,
		loggedIn: false,
	},
	reducers: {
		logout: state => {
			localStorage.setItem(tokenName, null);
			document.location.href = '/';
			state.token = null;
			state.loggedIn = false;
		},
		login: (state, action) => {
			//localStorage.setItem(tokenName, action.payload);
			state.token = action.payload;
			state.loggedIn = true;
			document.location.href = '/';
		},
	},
});

// const loginActionn = () => async dispatch => {
// 	dispatch(usersLoading());
// 	const response = await usersAPI.fetchAll();
// 	dispatch(usersReceived(response.data));
// };

// Action creators are generated for each case reducer function
export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
