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
			const store = getState().store.id;
			if (token) {
				headers.set('authorization', token);
			}
			if (store) {
				headers.set('store', store);
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
		'Customers',
		'Suppliers',
		'Self',
		'Store',
		'SingleStore',
		'Employee',
	],

	endpoints: builder => ({
		getSelf: builder.query({
			query: () => `/self`,
			providesTags: ['Self'],
		}),
		getMyStores: builder.query({
			query: () => `/store`,
			providesTags: ['Store'],
		}),
		getStoreData: builder.query({
			query: id => `/store/${id}`,

			providesTags: ['SingleStore'],
		}),
		getDashboard: builder.query({
			query: id => `/dashboard`,
			providesTags: ['Dashboard'],
		}),
		getAllEmployee: builder.query({
			query: () => `/employee`,
			providesTags: ['Employee'],
		}),
		getProductById: builder.query({
			query: id => `/products/${id}`,
		}),
		getAllProducts: builder.query({
			query: category => `/products?category=${category ? category : ''}`,
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
		getAllCustomers: builder.query({
			query: () => `/customers?role=customer`,
			providesTags: ['Customers'],
		}),
		getAllSuppliers: builder.query({
			query: () => `/customers?role=supplier`,
			providesTags: ['Suppliers'],
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
		addStore: builder.mutation({
			query(body) {
				return {
					url: `/store`,
					method: 'POST',
					body,
				};
			},
			invalidatesTags: ['Store'],
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
		addCustomer: builder.mutation({
			query(body) {
				return {
					url: `/customers?role=customer`,
					method: 'POST',
					body,
				};
			},
			invalidatesTags: ['Customers'],
		}),
		addEmployee: builder.mutation({
			query(body) {
				return {
					url: `/employee`,
					method: 'POST',
					body,
				};
			},
			invalidatesTags: ['Employee'],
		}),
		addSupplier: builder.mutation({
			query(body) {
				return {
					url: `/customers?role=supplier`,
					method: 'POST',
					body,
				};
			},
			invalidatesTags: ['Suppliers'],
		}),
	}),
});

export const {
	useGetSelfQuery,
	useGetMyStoresQuery,
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
	useGetAllCustomersQuery,
	useGetAllSuppliersQuery,
	useAddCustomerMutation,
	useAddSupplierMutation,
	useAddStoreMutation,
	useGetStoreDataQuery,
	useGetAllEmployeeQuery,
	useAddEmployeeMutation,
} = productsApi;
