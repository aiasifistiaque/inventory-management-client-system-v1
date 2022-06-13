import React from 'react';
import styles from './Auth.module.css';

const CategorySelect = ({
	label,
	value,
	onChange,
	required,
	data,
	objectSelect,
	other,
}) => {
	return (
		<div className={styles.input}>
			<label>
				{label} {required && <span style={{ color: 'red' }}>*</span>}
			</label>
			<select
				value={value}
				required={required ? true : false}
				onChange={e => {
					onChange(e.target.value);
				}}
				style={{ textTransform: 'capitalize' }}>
				<option value='' selected disabled>
					select your option
				</option>

				{data.map((option, i) => (
					<option key={i} value={JSON.stringify(option)}>
						{option.name} {option.code && `- ${option.code}`}
					</option>
				))}
				{other && <option value='other'>other</option>}
			</select>
		</div>
	);
};

export default CategorySelect;
