'use client'
import React, { useState } from 'react'
import { ListType, postData } from '../../types/definitions'
import CustomButton from './CustomButton';
import CustomInput from './CustomInput';
import { deleteTodo, updateTodo } from '@/services/posts.services';
import { useSelector } from 'react-redux';
import BaseModal from '../modals/BaseModal';
import BasicForm from '../forms/BasicForm';
import { getStatusIcon, getStatusColor } from '@/contant_utils/utils'

type List = {
    fetchData: () => Promise<void>
}

const List = ({ fetchData }: List) => {
    const [loading, setLoading] = useState(false)
    const [isModalOpen, setModalOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState<postData | null>(null);

    const [editId, setEditId] = useState<string>('');
    const [editedText, setEditedText] = useState<string>("");
    const { post } = useSelector((state: any) => state.posts)
    const { posts } = post
    const profileReducer = useSelector((state: any) => state.profile)
    const { user } = profileReducer

    const handleModalToggle = (isOpen: boolean) => {
        setModalOpen(isOpen);
        if (!isOpen) {
            setCurrentItem(null);
        }
    };

    const handleDelete = async (id: string) => {
        await deleteTodo(id).then((res: any) => {
            if (res.success) {
                fetchData();
            }
        })
    }

    const handleUpdateTodoStatus = async (formData: postData) => {
        const assignedTo = formData.assignedTo?.length ? formData.assignedTo : [user._id];
        const requestBody = {
            todo: formData.todo,
            assignedTo: assignedTo,
            userId: user?._id,
            status: formData.status,
            end_date: formData.end_date
        }
        await updateTodo(requestBody).then((res) => {
            if (res.success) {
                fetchData();
            }
        })
    }

    const handleEditSubmit = async (formData: any) => {
        const assignedTo = formData.assignedTo?.length ? formData.assignedTo : [user._id];
        const requestBody = {
            todo: formData.todo,
            assignedTo: assignedTo,
            userId: user?._id,
            status: formData.status,
            end_date: formData.end_date,
            _id: currentItem?._id
        }

        await updateTodo(requestBody).then((res) => {
            if (res.success) {
                setEditId('')
                fetchData();
                handleModalToggle(false);
            }
        })
    }

    const openEditModal = (item: postData) => {
        setCurrentItem(item);
        handleModalToggle(true);
    };

    return (
        posts?.map((item: any) => (
            <>
                <div key={item?._id} className="border flex items-center justify-between gap-5 p-2 mb-4 w-full">
                    <p className="capitalize">{item?.todo}</p>

                    <div className="flex gap-4 items-center">
                        <CustomButton
                            onClick={() => handleDelete(item?._id)}
                            icon='delete'
                            className='bg-red-600'
                        />
                        <CustomButton
                            onClick={() => openEditModal(item)}
                            icon='pencil'
                            className='bg-purple-800'
                        />
                        <CustomButton
                            label={`${item?.status}`}
                            icon={getStatusIcon(item.status)}
                            className={`${item?.status === 'pending' ? `bg-amber-300` : item?.status === 'open' ? 'bg-green-600' : 'bg-gray-600'}`}
                        />
                    </div>

                </div>
                <BaseModal
                    isOpen={isModalOpen}
                    onOpenChange={handleModalToggle}
                >
                    {currentItem && (
                        <BasicForm
                            handleSubmit={handleEditSubmit}
                            initialValues={currentItem}
                            loading={loading}
                        />
                    )}
                </BaseModal>
            </>
        ))
    )
}

export default List