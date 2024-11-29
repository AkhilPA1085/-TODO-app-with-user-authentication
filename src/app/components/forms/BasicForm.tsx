'use client'
import React, { useEffect, useState } from 'react'
import CustomInput from '../basic/CustomInput'
import CustomButton from '../basic/CustomButton'
import UserSelect from '../select/UserSelect'
import StatusSelect from '../select/StatusSelect'
import { formatDateTimeLocal } from '@/contant_utils/utils'
import { ErrorField, TaskFormValues } from '@/app/types/definitions'


type BasicFormProps = {
    handleSubmit: (formData: TaskFormValues) => void;
    loading: boolean;
    error?: { [key: string]: ErrorField };
    initialValues?: TaskFormValues;
}


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
    const [formValues, setFormValues] = useState({
        todo: '',
        end_date: '',
        status: '',
        assignedTo: [] as string[],
        userId: '',
    });

    useEffect(() => {
        if (initialValues) {
            setFormValues({
                ...initialValues,
                assignedTo: initialValues.assignedTo || [],
                end_date: initialValues.end_date ? formatDateTimeLocal(initialValues.end_date) : '',
            });
        }
    }, [initialValues]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        })
    }
    const handleUserSelect = (selectedUsers: string[]) => {
        setFormValues({
            ...formValues,
            assignedTo: selectedUsers
        })
    }
    const handleStatusSelect = (status: string) => {
        setFormValues({
            ...formValues,
            status: status
        })
    }
    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleSubmit(formValues)
    }
    const currentDateTime = new Date().toISOString().slice(0, 16);

    return (
        <form className="flex flex-col gap-5" onSubmit={onSubmit}>
            {inputFields?.map((inputField, index) => {
                if (inputField?.type === 'user_select') {
                    return (<UserSelect
                        key={index}
                        name={inputField?.name}
                        placeholder={inputField?.placeholder}
                        onSelectUsers={handleUserSelect}
                        initialUsers={initialValues && initialValues['assignedTo']}
                        error={error} />)
                }
                if (inputField?.type === 'status_select') {
                    return (<StatusSelect
                        key={index}
                        name={inputField?.name}
                        placeholder={inputField?.placeholder}
                        onSelectSubmit={handleStatusSelect}
                        initialValue={initialValues && initialValues['status']}
                        error={error}/>)
                }
                return (
                    <div className='flex flex-col text-black' key={index}>
                        <label htmlFor={index.toString()}>{inputField?.placeholder}</label>
                        <CustomInput
                            key={index}
                            id={index}
                            type={inputField?.type}
                            name={inputField?.name}
                            min={inputField?.type === 'datetime-local' ? currentDateTime : undefined}
                            placeholder={inputField?.placeholder}
                            onChange={handleInputChange}
                            value={formValues[inputField?.name as keyof typeof formValues] || ''}
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