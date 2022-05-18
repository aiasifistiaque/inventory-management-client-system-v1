import { createSlice } from '@reduxjs/toolkit';

export const storeSlice = createSlice({
	name: 'store',
	initialState: {
		id:
			typeof window !== 'undefined' && localStorage.getItem('IDX_STORE') != null
				? JSON.parse(localStorage.getItem('IDX_STORE'))
				: null,
		name: null,
		role: null,
	},
	reducers: {
		select: (state, action) => {
			// Redux Toolkit allows us to write "mutating" logic in reducers. It
			// doesn't actually mutate the state because it uses the Immer library,
			// which detects changes to a "draft state" and produces a brand new
			// immutable state based off those changes

			if (action.payload) {
				state.id = action.payload._id;
				state.name = action.payload.name;
				state.role = action.payload.role;
				localStorage.setItem('IDX_STORE', JSON.stringify(action.payload._id));
			}
		},
	},
});

// Action creators are generated for each case reducer function
export const { select } = storeSlice.actions;

export default storeSlice.reducer;
