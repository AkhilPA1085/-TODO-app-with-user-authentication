import React from 'react'
import { InputFieldType } from '../../types/definitions'

const CustomInput = ({ onChange,
    className = '',
    type = 'text',
    placeholder = '',
    value,
    ...props }: InputFieldType) => {
    return (
        <input
            onChange={onChange}
            type={type}
            placeholder={placeholder}
            value={value}
            className={`p-2 border focus:outline-none text-black rounded-md ${className}`}
            {...props} />
    )
}

export default CustomInput