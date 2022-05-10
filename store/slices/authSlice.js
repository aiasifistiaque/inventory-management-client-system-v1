import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { tokenName } from '../../lib/constants';

export const authSlice = createSlice({
	name: 'auth',
	initialState: {
		token:
			typeof window !== 'undefined' && localStorage.getItem(tokenName) != null
				? JSON.parse(localStorage.getItem(tokenName))
				: null,
		loggedIn:
			typeof window !== 'undefined' && localStorage.getItem(tokenName) !== null
				? true
				: false,
	},
	reducers: {
		logout: (state, action) => {
			localStorage.setItem(tokenName, null);
			state.token = null;
			state.loggedIn = false;
			document.location.href = '/login';
		},
		login: (state, action) => {
			localStorage.setItem(tokenName, action.payload);
			state.token = action.payload;
			state.loggedIn = true;
			document.location.href = '/';
		},
	},
});

export const logoutAction = async dispatch => {
	localStorage.setItem(tokenName, action.payload);
	dispatch({ type: logout });
	document.location.href = '/';
};

// const loginActionn = () => async dispatch => {
// 	dispatch(usersLoading());
// 	const response = await usersAPI.fetchAll();
// 	dispatch(usersReceived(response.data));
// };

// Action creators are generated for each case reducer function
export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
