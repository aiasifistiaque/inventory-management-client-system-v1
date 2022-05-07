import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const localUrl = 'http://localhost:5000/api';
const backennd = 'https://pos-backend-1234.herokuapp.com/api';

export const productsApi = createApi({
	reducerPath: 'productsApi',
	baseQuery: fetchBaseQuery({
		baseUrl: localUrl,
	}),
	endpoints: builder => ({
		getProductById: builder.query({
			query: id => `/products/${id}`,
		}),
		getAllProducts: builder.query({
			query: () => `/products`,
		}),
		getAllCategories: builder.query({
			query: () => `/categories`,
		}),
		getAllBrands: builder.query({
			query: () => `/brands`,
		}),
	}),
});

export const {
	useGetProductByIdQuery,
	useGetAllProductsQuery,
	useGetAllCategoriesQuery,
	useGetAllBrandsQuery,
} = productsApi;
