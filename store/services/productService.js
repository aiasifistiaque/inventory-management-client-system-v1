import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import * as lib from '../../lib/constants';

// const localUrl = 'http://localhost:5000/api';
// const backend = 'https://pos-backend-1234.herokuapp.com/api';

export const productsApi = createApi({
	reducerPath: 'productsApi',
	baseQuery: fetchBaseQuery({
		baseUrl: `${lib.api.backend}/api`,
		prepareHeaders: (headers, { getState }) => {
			const token = getState().auth.token;
			if (token) {
				headers.set('authorization', token);
			}
			return headers;
		},
	}),
	tagTypes: [
		'Products',
		'Purchases',
		'Sales',
		'Categories',
		'Brands',
		'Dashboard',
		'Expenses',
	],

	endpoints: builder => ({
		getDashboard: builder.query({
			query: id => `/dashboard`,
			providesTags: ['Dashboard'],
		}),
		getProductById: builder.query({
			query: id => `/products/${id}`,
		}),
		getAllProducts: builder.query({
			query: () => `/products`,
			providesTags: ['Products'],
		}),
		getProductById: builder.query({
			query: id => `/products/${id}`,
		}),

		getAllCategories: builder.query({
			query: () => `/categories`,
			providesTags: ['Categories'],
		}),
		getAllBrands: builder.query({
			query: () => `/brands`,
			providesTags: ['Brands'],
		}),
		getAllExpenses: builder.query({
			query: () => `/expenses`,
			providesTags: ['Expenses'],
		}),
		getAllPurchaseOrders: builder.query({
			query: () => `/purchases`,
			providesTags: ['Purchases'],
		}),
		getAllSales: builder.query({
			query: () => `/sales`,
			providesTags: ['Sales'],
		}),
		addBrand: builder.mutation({
			query(body) {
				return {
					url: `/brands`,
					method: 'POST',
					body,
				};
			},
			invalidatesTags: ['Brands', 'Dashboard'],
		}),
		addExpenses: builder.mutation({
			query(body) {
				return {
					url: `/expenses`,
					method: 'POST',
					body,
				};
			},
			invalidatesTags: ['Expenses', 'Dashboard'],
		}),
		addProduct: builder.mutation({
			query(body) {
				return {
					url: `/products`,
					method: 'POST',
					body,
				};
			},
			invalidatesTags: ['Products', 'Dashboard'],
		}),
		addCategory: builder.mutation({
			query(body) {
				return {
					url: `/categories`,
					method: 'POST',
					body,
				};
			},
			invalidatesTags: ['Categories', 'Dashboard'],
		}),
		addPurchaseOrder: builder.mutation({
			query(body) {
				return {
					url: `/purchases`,
					method: 'POST',
					body,
				};
			},
			invalidatesTags: ['Purchases', 'Products', 'Dashboard'],
		}),

		addSale: builder.mutation({
			query(body) {
				return {
					url: `/sales`,
					method: 'POST',
					body,
				};
			},
			invalidatesTags: ['Sales', 'Products', 'Dashboard'],
		}),
	}),
});

export const {
	useGetProductByIdQuery,
	useGetAllProductsQuery,
	useGetAllCategoriesQuery,
	useGetAllBrandsQuery,
	useGetAllPurchaseOrdersQuery,
	useAddProductMutation,
	useAddPurchaseOrderMutation,
	useGetAllSalesQuery,
	useAddSaleMutation,
	useAddCategoryMutation,
	useAddBrandMutation,
	useGetDashboardQuery,
	useGetAllExpensesQuery,
	useAddExpensesMutation,
} = productsApi;
