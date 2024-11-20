import React, { Suspense, useEffect, useState } from 'react'
import CommentSkelton from '../skeltons/CommentSkelton'
import CustomButton from '../basic/CustomButton'
import { formatDateTimeLocal } from '@/contant_utils/utils';
import moment from 'moment'

type CommentPropsType = {
    item: {
        userId: string;
        comment: string;
        createdAt: string;
        _id?: string;
    };
    username: { [key: string]: string };
    userId: string | undefined;
    taskId: string | undefined;
    handleDeleteComment: (postId: string, commentId: string) => void;
}

const CommentItem = ({
    item,
    username,
    userId,
    taskId,
    handleDeleteComment, }: CommentPropsType) => {
        const [date,setDate]=useState('')
        useEffect(()=>{
            if(item?.createdAt){
                setDate(formatDateTimeLocal(item?.createdAt))
            }
        },[])

    return (
        <Suspense fallback={<CommentSkelton />}>
            <div className='p-4 bg-gray-200 rounded my-4 flex justify-between'>
                <div>
                    <p className='text-xs text-black capitalize font-bold'>
                        {username[item?.userId]}
                    </p>
                    <p className='text-md text-black mb-4 pl-4 text-lg'>{item?.comment}</p>
                    <p className='text-black text-xs mb-4'>{moment(date).utc().format('DD/MM/YYY,h:mm A')}</p>
                </div>
                {item?.userId === userId &&
                    <CustomButton
                        icon='delete'
                        className='bg-transparent p-0 !text-red-600'
                        onClick={() => handleDeleteComment(taskId || '', item?._id || '')} />
                }
            </div>
        </Suspense>
    )
}

export default CommentItem