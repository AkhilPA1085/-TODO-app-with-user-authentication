'use client'
import React, { useState } from 'react'
import { ListType } from '../../types/definitions'
import CustomButton from './CustomButton';
import CustomInput from './CustomInput';
import { deleteTodo, updateTodo } from '@/services/posts.services';
import { useSelector } from 'react-redux';

type List = {
    fetchData: () => Promise<void>
}

const List = ({ fetchData }: List) => {
    const [editId, setEditId] = useState<string>('');
    const [editedText, setEditedText] = useState<string>("");
    const { post } = useSelector((state: any) => state.posts)
    const { posts } = post

    const handleDelete = async (id: string) => {
        await deleteTodo(id).then((res: any) => {
          if (res.success) {
            fetchData();
          }
        })
      }

    const handleEditSubmit = async () => {
        const requestData = {
            data: editedText,
            _id: editId
        }

        await updateTodo(requestData).then((res) => {
            if (res.success) {
                setEditId('')
                fetchData();
            }
        })
    }

    const handleEditOpen = (item: ListType) => {
        setEditId(item?._id);
        setEditedText(item?.data);
    }

    return (
        posts?.map((item: any) => (
            <div key={item?._id} className="border flex items-center justify-between gap-5 p-2 mb-4 w-full">
                {editId === item?._id ? <>
                    <CustomInput
                        value={editedText}
                        onChange={(e) => setEditedText(e.target.value)}
                    />
                    <CustomButton
                        onClick={handleEditSubmit}
                        label='Update'
                    />
                </>
                    : <p className="capitalize">{item?.data}</p>}

                <div className="flex gap-4 items-center">
                    <CustomButton
                        onClick={() => handleDelete(item?._id)}
                        icon='delete'
                    />
                    <CustomButton
                        onClick={() => handleEditOpen(item)}
                        icon='pencil'
                    />
                </div>

            </div>
        ))
    )
}

export default List