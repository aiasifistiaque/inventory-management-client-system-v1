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
		'Role',
		'Logs',
		'Kpi',
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
			invalidatesTags: [
				'Product',
				'Products',
				'Purchases',
				'Purchase',
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
				'Logs',
			],
		}),
		getStoreLogs: builder.query({
			query: ({ sort = '-createdAt', page = 1, perpage = 10 } = {}) =>
				`/activities?sort=${sort}&page=${page}`,
			providesTags: ['Logs'],
		}),
		getDashboard: builder.query({
			query: id => `/dashboard`,
			providesTags: ['Dashboard'],
		}),

		/**Products, Categories & Brandss */

		getProductById: builder.query({
			query: id => `/products/${id}`,
			providesTags: id => [{ type: 'Product', id: id ? id : '' }],
		}),
		getAllProducts: builder.query({
			query: ({ category, sort = '-createdAt', page = 1, perpage = 10 } = {}) =>
				`/products?sort=${sort}&page=${page}&category=${category}&perpage=${perpage}`,
			providesTags: ['Products'],
		}),

		addProduct: builder.mutation({
			query(body) {
				return {
					url: `/products`,
					method: 'POST',
					body,
				};
			},
			invalidatesTags: ['Products', 'Dashboard', 'Categories', 'Brands'],
		}),

		updateProduct: builder.mutation({
			query(data) {
				const { id, ...body } = data;
				return {
					url: `/products/${id}`,
					method: 'PUT',
					body,
				};
			},
			invalidatesTags: (result, error, { id }) => [
				{ type: 'Product', id },
				{ type: 'Products' },
			],
		}),

		getAllCategories: builder.query({
			query: ({ sort = '-createdAt', page = 1, perpage = 10 } = {}) =>
				`/categories?sort=${sort}&page=${page}&perpage=${perpage}`,
			providesTags: ['Categories'],
		}),

		addCategory: builder.mutation({
			query(body) {
				return {
					url: `/categories`,
					method: 'POST',
					body,
				};
			},
			invalidatesTags: ['Categories', 'Dashboard', 'Products'],
		}),
		getAllBrands: builder.query({
			query: ({ sort = '-createdAt', page = 1, perpage = 10 } = {}) =>
				`/brands?sort=${sort}&page=${page}&perpage=${perpage}`,
			providesTags: ['Brands'],
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

		/**End of products, Categories & Brands
		 *
		 *
		 *
		 *
		 *
		 *
		 *
		 *
		 *
		 *
		 */

		/**Customers, Suppliers & Employees */

		getAllCustomers: builder.query({
			query: ({ sort = '-createdAt', page = 1, perpage = 10 } = {}) =>
				`/customers?role=customer&sort=${sort}&page=${page}&perpage=${perpage}`,
			providesTags: ['Customers'],
		}),
		getAllSuppliers: builder.query({
			query: ({ sort = '-createdAt', page = 1, perpage = 10 } = {}) =>
				`/customers?role=supplier&sort=${sort}&page=${page}&perpage=${perpage}`,
			providesTags: ['Suppliers'],
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

		getAllEmployee: builder.query({
			query: ({ sort = '-createdAt', page = 1, perpage = 10 }) =>
				`/employee?sort=${sort}&page=${page}&perpage=${perpage}`,
			providesTags: ['Employee'],
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

		getEmployeeById: builder.query({
			query: id => `/employee/${id}`,
			providesTags: id => [{ type: 'Role', id: id ? id : '' }],
		}),

		updateEmployee: builder.mutation({
			query(data) {
				const { id, ...body } = data;
				return {
					url: `/employee/${id}`,
					method: 'PUT',
					body,
				};
			},
			invalidatesTags: ['Employee', 'Role'],
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

		/**End of Customers, Suppliers & Employees
		 *
		 *
		 *
		 *
		 *
		 *
		 *
		 *
		 */

		/**Sales,Purchases & Expenses */

		getAllSales: builder.query({
			query: ({
				date = '',
				sort = '-createdAt',
				page = 1,
				perpage = 10,
			} = {}) =>
				`/sales?date=${date}&page=${page}&sort=${sort}&perpage=${perpage}`,
			providesTags: query => [
				{ type: 'Sales', id: query?.date ? query.date : '' },
			],
		}),
		getSalesById: builder.query({
			query: id => `/sales/${id}`,
			providesTags: ['Sales'],
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

		getAllExpenses: builder.query({
			query: ({ sort = '-createdAt', page = 1, perpage = 10 } = {}) =>
				`/expenses?sort=${sort}&page=${page}&perpage=${perpage}`,
			providesTags: ['Expenses'],
		}),

		getAllPurchaseOrders: builder.query({
			query: ({ sort = '-createdAt', page = 1, perpage = 10 } = {}) =>
				`/purchases?sort=${sort}&page=${page}&perpage=${perpage}`,
			providesTags: ['Purchases'],
		}),

		getPurchaseById: builder.query({
			query: id => `/purchases/${id}`,
			providesTags: id => [{ type: 'Purchase', id: id ? id : '' }],
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

		/**End of Sales */
		/**
		 *
		 *
		 *
		 *
		 *
		 *
		 *
		 *
		 */

		/**Reports & Dashboard */

		getSalesReport: builder.query({
			query: id => `/dashboard/sales`,
		}),

		getTopProducts: builder.query({
			query: id => `/dashboard/top`,
		}),

		getLowStock: builder.query({
			query: ({ sort = '-createdAt', page = 1, perpage = 10, limit } = {}) =>
				`/dashboard/lowstock?sort=${sort}&page=${page}&perpage=${perpage}`,
		}),

		getSalesKpi: builder.query({
			query: date => `/dashboard/kpi?field=sales&date=${date}`,
			providesTags: result => [
				{ type: 'Kpi', id: result?.date ? result.date : '' },
			],
		}),

		/**End of Reports & Dashboard
		 *
		 *
		 *
		 *
		 *
		 *
		 *
		 *
		 *
		 *
		 */

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
	}),
});

export const {
	useGetSelfQuery,
	useGetMyStoresQuery,
	useGetAllCategoriesQuery,
	useGetAllBrandsQuery,
	useGetAllPurchaseOrdersQuery,
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
	useGetStoreLogsQuery,
	useGetSalesByIdQuery,
	useGetSalesReportQuery,
	useGetTopProductsQuery,
	useGetLowStockQuery,
	useGetSalesKpiQuery,
	useGetPurchaseByIdQuery,

	/**Employees */
	useAddEmployeeMutation,
	useGetAllEmployeeQuery,
	useGetEmployeeByIdQuery,
	useUpdateEmployeeMutation,
	/**End if Employees */

	/**Products */
	useGetAllProductsQuery,
	useGetProductByIdQuery,
	useAddProductMutation,
	useUpdateProductMutation,
	/**End of Products */
} = productsApi;
