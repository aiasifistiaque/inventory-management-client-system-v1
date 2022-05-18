import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slices/counterSlice';
import authReducer from './slices/authSlice';
import { productsApi } from './services/productService';
import { setupListeners } from '@reduxjs/toolkit/query';
import toggleSlice from './slices/toggleSlice';
import storeSlice from './slices/storeSlice';

const reducer = {};

export const store = configureStore({
	reducer: {
		counter: counterReducer,
		auth: authReducer,
		toggle: toggleSlice,
		store: storeSlice,
		[productsApi.reducerPath]: productsApi.reducer,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(productsApi.middleware),
	devTools: process.env.NODE_ENV !== 'production',
});

setupListeners(store.dispatch);
