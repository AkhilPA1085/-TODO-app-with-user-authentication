import React from 'react'
import { InputFieldType } from '../../types/definitions'

const CustomInput = ({ onChange,
    className = '',
    type = 'text',
    placeholder = '',
    value,
    error,
    name,
    ...props }: InputFieldType) => {
    return (
        <>
            <input
                onChange={onChange}
                type={type}
                placeholder={placeholder}
                value={value}
                name={name}
                className={`p-2 border focus:outline-none text-black rounded-md ${className}`}
                {...props} />
            {error && error[name] && (
                <p className='text-red-600 text-sm'>
                    {error[name]?.message}
                </p>
            )}
        </>
    )
}

export default CustomInput