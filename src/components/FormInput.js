import React, { forwardRef } from 'react'

const FormInput = forwardRef(({ onChange, ...rest }, ref) => {
	const handleInputChange = e => {
		onChange(e.target.value)
	}

	return (
		<>
			<input
				ref={ref}
				onChange={handleInputChange}
				className={`popup__input popup__input_type_${rest.name}`}
				{...rest}
			/>
			<span className={`popup__error ${rest.name}-error`}></span>
		</>
	)
})

export default FormInput
