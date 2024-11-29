'use client'
import React, { useState } from 'react'
import { InputFieldType } from '../../types/definitions'
import { Input } from '@nextui-org/react'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'

const CustomInput = ({
    onChange,
    className = '',
    type = 'text',
    placeholder = '',
    value,
    error,
    name,
    ...props }: InputFieldType) => {
    const [isVisible, setIsVisible] = useState(false)
    const toggleVisibility = () => {
        setIsVisible(!isVisible)
    }
    return (
        <div className='flex flex-col gap-2 w-full'>
            {type === 'password' ? <Input
                onChange={onChange}
                placeholder={placeholder}
                value={value}
                name={name}
                endContent={
                    <button className="focus:outline-none" type="button" onClick={toggleVisibility} aria-label="toggle password visibility">
                        {isVisible ? (
                            <EyeSlashIcon className="w-4 h-4" />
                        ) : (
                            <EyeIcon className="w-4 h-4" />
                        )}
                    </button>
                }
                type={isVisible ? "text" : "password"}
                className={className}
            /> : <Input
                onChange={onChange}
                type={type}
                placeholder={placeholder}
                value={value}
                name={name}
                className={className}
                {...props} />}


            {error && name && error[name] && (
                <p className='text-red-600 text-sm'>
                    {error[name]?.message}
                </p>
            )}
        </div>
    )
}

export default CustomInput