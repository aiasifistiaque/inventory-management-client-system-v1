import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Input from '../../../../components/auth/Input';
import Page from '../../../../components/nav/Page/Page';
import { DetailsTable } from '../../../../components/table/Details';
import {
	CheckBoxItem,
	Item,
	Row,
	Table,
} from '../../../../components/table/Table';
import {
	useGetEmployeeByIdQuery,
	useUpdateEmployeeMutation,
} from '../../../../store/services/productService';
import * as lib from '../../../../lib/constants';
import Button from '../../../../components/buttons/Button';
import Error from '../../../../components/util/error-modal/Error';
import Success from '../../../../components/util/success-modal/Success';

const Employeepage = () => {
	const { employee } = useRouter().query;
	const { data, error, isLoading, isError, isFetching } =
		useGetEmployeeByIdQuery(employee);

	const [update, result] = useUpdateEmployeeMutation();

	const [role, setRole] = useState();
	const [email, setEmail] = useState();
	const [permissions, setPermissions] = useState([]);

	const addPermission = res => {
		permissions.includes(res)
			? setPermissions(permissions.filter(item => item != res))
			: setPermissions(x => [...x, res]);
	};

	const isChecked = res => {
		return permissions.includes(res);
	};

	const submitForm = async e => {
		e.preventDefault();
		update({
			id: data?._id ? data._id : 'null',
			role,
			permissions,
		});
	};

	useEffect(() => {
		if (!isFetching && data) {
			setEmail(data.email);
			setRole(data.role);
			setPermissions(data.permissions);
		}
	}, [isFetching]);

	return (
		<Page selected='Employees' error={error} isError={isError}>
			<DetailsTable title='Edit Employee'>
				<form style={{ marginTop: 32 }} onSubmit={submitForm}>
					<Input
						label='Employee Email'
						value={email}
						onChange={e => setEmail(e)}
						placeholder='Enter employee email'
						disabled
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

					<Input
						label='Added By'
						value={data?.addedBy?.name && data.addedBy.name}
						disabled
					/>

					<h5>Select Permissions</h5>
					<Table paginate='no'>
						{lib.data.permissions.map((item, i) => (
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
									onClick={() => addPermission(`add-${item.type && item.type}`)}
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

					{result.isLoading ? (
						<Button>processing...</Button>
					) : (
						<Button submit>Update Employee</Button>
					)}
				</form>

				<Success isSuccess={result.isSuccess}>Updated Successfully</Success>

				<Error isError={result.isError}>{result?.error && result.error}</Error>
			</DetailsTable>
		</Page>
	);
};

export default Employeepage;
