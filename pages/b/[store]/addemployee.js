import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Page from '../../../components/nav/Page/Page';
import { useAddEmployeeMutation } from '../../../store/services/productService';
import { DetailsTable } from '../../../components/table/Details';
import Input from '../../../components/auth/Input';
import Button from '../../../components/buttons/Button';
import Text from '../../../components/util/Text';
import {
	CheckBoxItem,
	Item,
	Row,
	Table,
} from '../../../components/table/Table';
import Error from '../../../components/util/error-modal/Error';

const data = [
	{
		type: 'products',
		options: [
			'add-products',
			'read-products',
			'edit-products',
			'delete-products',
		],
	},
	{
		type: 'sales',
		options: ['add-sales', 'read-sales', 'edit-sales', 'delete-sales'],
	},
	{
		type: 'purchases',
		options: [
			'add-purchases',
			'read-purchases',
			'edit-purchases',
			'delete-purchases',
		],
	},
	{
		type: 'customers',
		options: [
			'add-customers',
			'read-customers',
			'edit-customers',
			'delete-customers',
		],
	},
	{
		type: 'suppliers',
		options: [
			'add-suppliers',
			'read-suppliers',
			'edit-suppliers',
			'delete-suppliers',
		],
	},
	{
		type: 'employees',
		options: [
			'add-employees',
			'read-employees',
			'edit-employees',
			'delete-employees',
		],
	},
	{
		type: 'categories',
		options: [
			'add-categories',
			'read-categories',
			'edit-categories',
			'delete-categories',
		],
	},
	{
		type: 'brands',
		options: ['add-brands', 'read-brands', 'edit-brands', 'delete-brands'],
	},
];

const Addemployee = () => {
	const router = useRouter();
	const [role, setRole] = useState();
	const [email, setEmail] = useState();
	const [permissions, setPermissions] = useState([
		'add-products',
		'delete-customers',
	]);

	const [addEmployee, result] = useAddEmployeeMutation();

	const addPermission = res => {
		permissions.includes(res)
			? setPermissions(permissions.filter(item => item != res))
			: setPermissions(x => [...x, res]);
	};

	const isChecked = res => {
		return permissions.includes(res);
	};

	const { isLoading, isSuccess, isError, error } = result;

	const submitForm = async e => {
		e.preventDefault();
		addEmployee({
			email,
			role,
			permissions,
		});
	};

	useEffect(() => {
		if (isSuccess) {
			router.push(`/b/${router.query.store}/employees`);
		}
	}, [isSuccess]);

	return (
		<div>
			<Page selected='Employees'>
				<DetailsTable title='Add Employee'>
					<form style={{ marginTop: 32 }} onSubmit={submitForm}>
						<Input
							label='Customer Email'
							value={email}
							onChange={e => setEmail(e)}
							placeholder='Enter employee email'
							required
						/>
						<Input
							label='Role'
							value={role}
							onChange={e => setRole(e)}
							placeholder='Select role'
							select
							data={[
								{ _id: 'admin', name: 'admin' },
								{ _id: 'manager', name: 'manager' },
								{ _id: 'sales', name: 'sales' },
								{ _id: 'analyst', name: 'analyst' },
							]}
							required
						/>

						<h5>Select Permissions</h5>
						<Table paginate='no'>
							{data.map((item, i) => (
								<Row key={i} title>
									<Item>{item.type && item.type}</Item>
									<CheckBoxItem
										onClick={() =>
											addPermission(`read-${item.type && item.type}`)
										}
										checked={isChecked(`read-${item.type && item.type}`)}>
										read
									</CheckBoxItem>
									<CheckBoxItem
										onClick={() =>
											addPermission(`add-${item.type && item.type}`)
										}
										checked={isChecked(`add-${item.type && item.type}`)}>
										add
									</CheckBoxItem>
									<CheckBoxItem
										onClick={() =>
											addPermission(`edit-${item.type && item.type}`)
										}
										checked={isChecked(`edit-${item.type && item.type}`)}>
										edit
									</CheckBoxItem>
									<CheckBoxItem
										onClick={() =>
											addPermission(`delete-${item.type && item.type}`)
										}
										checked={isChecked(`delete-${item.type && item.type}`)}>
										delete
									</CheckBoxItem>
								</Row>
							))}
						</Table>

						{isLoading ? (
							<Button>processing...</Button>
						) : (
							<Button submit>Submit</Button>
						)}
					</form>

					<Error isError={isError}>{error}</Error>
				</DetailsTable>
			</Page>
		</div>
	);
};

export default Addemployee;
