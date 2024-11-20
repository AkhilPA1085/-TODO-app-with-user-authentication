import React from 'react';

const BaseCardSkeleton = () => {
  return (
    <div className='p-4 bg-gray-100 rounded shadow animate-pulse'>
      <div className='h-6 bg-gray-300 rounded w-1/3 mb-4'></div>
      <div className="add-comment flex items-center gap-4 mb-4">
        <div className='h-10 bg-gray-300 rounded w-full'></div>
        <div className='h-10 bg-blue-300 rounded w-10'></div>
      </div>

      {/* Skeleton for comments */}
      <div className='comments'>
        {[...Array(3)].map((_, index) => (
          <div className='p-4 bg-gray-200 rounded my-4 flex justify-between' key={index}>
            <div>
              <div className='h-4 bg-gray-300 rounded w-32 mb-2'></div>
              <div className='h-4 bg-gray-300 rounded w-full mb-2'></div>
              <div className='h-4 bg-gray-300 rounded w-24'></div>
            </div>
            <div className='h-4 bg-gray-300 rounded w-10'></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BaseCardSkeleton;
