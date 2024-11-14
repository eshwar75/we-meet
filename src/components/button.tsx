/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

interface ButtonProperties {
	onClick?: any;
	type: 'button' | 'submit';
	disabled?: boolean;
	id?: string;
	text: string;
	buttonBackgroundColor?: string;
	buttonWidth?: string;
	margin?: string;
}

export const Button: React.FC<ButtonProperties> = ({
	onClick,
	type,
	disabled,
	id,
	text,
	buttonBackgroundColor = 'var(--button-primary-background-color)',
	buttonWidth,
	margin: customMargin,
}) => {
	return (
		<button
			className="button"
			type={type}
			id={id}
			style={{
				width: buttonWidth || 'auto',
				backgroundColor: buttonBackgroundColor,
				margin: customMargin || '0px',
			}}
			onClick={onClick}
			disabled={disabled}
		>
			<p className="buttonText">{text}</p>
		</button>
	);
};
