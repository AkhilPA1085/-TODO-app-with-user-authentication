import React from 'react'

const CommentSkelton = () => {
    return (
        <div className='p-4 bg-gray-200 rounded my-4 flex justify-between animate-pulse'>
            <div>
                <div className='h-4 bg-gray-300 rounded w-32 mb-2'></div>
                <div className='h-4 bg-gray-300 rounded w-full mb-2'></div>
                <div className='h-4 bg-gray-300 rounded w-24'></div>
            </div>
            <div className='h-4 bg-gray-300 rounded w-10'></div>
        </div>
    )
}

export default CommentSkelton