/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

interface InputProperties {
	placeholder?: string;
	required?: true | false;
	name?: string;
	value: any;
	label?: string;
	onChange?: any;
	id?: string;
	inputWidth?: string;
	marginInputContainer?: string;
	inputMarginBlock?: string;
}

export const Input: React.FC<InputProperties> = ({
	name,
	placeholder,
	value,
	onChange,
	id,
	required,
	label,
	inputWidth,
	marginInputContainer = '7px 0px',
}) => {
	return (
		<div
			style={{
				width: inputWidth || '100%',
				margin: marginInputContainer || '7px 0px',
			}}
		>
			{label && (
				<label className="labelTextStyle" htmlFor={label}>
					{label}
				</label>
			)}
			<input
				className="inputField"
				autoComplete={'off'}
				required={required}
				type="text"
				id={id}
				name={name}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
			/>
		</div>
	);
};
