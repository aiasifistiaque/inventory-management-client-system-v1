import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slices/counterSlice';
import authReducer from './slices/authSlice';
import { productsApi } from './services/productService';
import { setupListeners } from '@reduxjs/toolkit/query';

const reducer = {};

export const store = configureStore({
	reducer: {
		counter: counterReducer,
		auth: authReducer,
		[productsApi.reducerPath]: productsApi.reducer,
	},
	devTools: true,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(productsApi.middleware),
});

setupListeners(store.dispatch);
