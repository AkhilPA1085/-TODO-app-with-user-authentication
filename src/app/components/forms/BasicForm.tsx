'use client'
import React, { useEffect, useState } from 'react'
import CustomInput from '../basic/CustomInput'
import CustomButton from '../basic/CustomButton'
import UserSelect from '../select/UserSelect'
import StatusSelect from '../select/StatusSelect'

type BasicFormProps = {
    handleSubmit: (formData: any) => void;
    loading: boolean;
    error?: any;
    initialValues?: {
        todo: string;
        end_date: string,
        status: string,
        assignedTo: string[]
    }
}

const formatDateTimeLocal = (date: string | Date) => {
    const d = new Date(date);
    return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
};

const inputFields = [
    {
        type: 'text', name: 'todo', placeholder: 'Enter TODO'
    },
    {
        type: 'datetime-local', name: 'end_date', placeholder: 'Enter Last Date'
    },
    {
        type: 'user_select', name: 'assignedTo', placeholder: 'Select Assignee'
    },
    {
        type: 'status_select', name: 'status', placeholder: 'Select Status'
    },
]

const BasicForm = ({ handleSubmit, loading, error, initialValues }: BasicFormProps) => {
    const [formData, setFormData] = useState({
        todo: '',
        end_date: '',
        status: '',
        assignedTo: [] as string[]
    })

    useEffect(() => {
        if (initialValues) {
            setFormData({
                ...initialValues,
                end_date: initialValues.end_date ? formatDateTimeLocal(initialValues.end_date) : ''
            });
        }
    }, [initialValues]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }
    const handleUserSelect = (selectedUsers: string[]) => {
        setFormData({
            ...formData,
            assignedTo: selectedUsers
        })
    }
    const handleStatusSelect = (status: string) => {
        setFormData({
            ...formData,
            status: status
        })
    }
    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleSubmit(formData)
    }
    const currentDateTime = new Date().toISOString().slice(0, 16);
    return (
        <form className="flex flex-col gap-5" onSubmit={onSubmit}>
            {inputFields?.map((inputField, index) => {
                if (inputField?.type === 'user_select') {
                    return (<UserSelect
                        name={inputField?.name}
                        placeholder={inputField?.placeholder}
                        onSelectUsers={handleUserSelect}
                        initialUsers={initialValues && initialValues['assignedTo']}
                        error={error} />)
                }
                if (inputField?.type === 'status_select') {
                    return (<StatusSelect
                        name={inputField?.name}
                        placeholder={inputField?.placeholder}
                        onSelectSubmit={handleStatusSelect}
                        initialValue={initialValues && initialValues['status']}
                        error={error} />)
                }
                return (
                    <div className='flex flex-col text-black'>
                        <label htmlFor={index.toString()}>{inputField?.placeholder}</label>
                        <CustomInput
                            key={index}
                            id={index}
                            type={inputField?.type}
                            name={inputField?.name}
                            min={inputField?.type === 'datetime-local' ? currentDateTime : undefined}
                            placeholder={inputField?.placeholder}
                            onChange={handleInputChange}
                            value={formData[inputField?.name as keyof typeof formData] || ''}
                            error={error} />
                    </div>
                )
            })}
            <CustomButton
                className="bg-black text-white"
                label={loading ? 'Processing...' : (initialValues ? 'Update' : 'Add')}
                icon="add"
            />
        </form>
    )
}

export default BasicForm