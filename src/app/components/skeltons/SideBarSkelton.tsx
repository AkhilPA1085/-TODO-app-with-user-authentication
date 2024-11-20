import React from 'react';

const SidebarSkeleton = () => {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <div className="mb-2 flex h-20 items-end justify-start rounded-md bg-teal-700 p-4 md:h-40 animate-pulse">
        <div className="h-6 bg-gray-300 rounded w-32 md:w-40"></div>
      </div>

      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <div className="flex flex-col space-y-2">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="h-6 bg-gray-300 rounded w-24 animate-pulse"></div>
          ))}
        </div>

        <button
          className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3 animate-pulse"
          type="button"
        >
          <div className="h-6 w-6 bg-gray-300 rounded-full"></div>
          <div className="hidden md:block h-4 bg-gray-300 rounded w-24"></div>
        </button>
      </div>
    </div>
  );
};

export default SidebarSkeleton;
