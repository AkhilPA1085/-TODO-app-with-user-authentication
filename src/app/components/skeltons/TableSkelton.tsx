import React from 'react';

const TableSkeleton = () => {
  return (
    <table className="min-w-full border-collapse rounded-md">
      <thead>
        <tr className="bg-teal-600">
          <th className="py-2 px-4">
            <div className="h-4 bg-gray-300 rounded animate-pulse w-3/4"></div>
          </th>
          <th className="py-2 px-4">
            <div className="h-4 bg-gray-300 rounded animate-pulse w-3/4"></div>
          </th>
          <th className="py-2 px-4">
            <div className="h-4 bg-gray-300 rounded animate-pulse w-3/4"></div>
          </th>
          <th className="py-2 px-4">
            <div className="h-4 bg-gray-300 rounded animate-pulse w-3/4"></div>
          </th>
          <th className="py-2 px-4">
            <div className="h-4 bg-gray-300 rounded animate-pulse w-3/4"></div>
          </th>
        </tr>
      </thead>
      <tbody>
        {[...Array(5)].map((_, index) => (
          <tr key={index} className="bg-white even:bg-gray-100">
            <td className="py-2 px-4">
              <div className="h-4 bg-gray-300 rounded animate-pulse w-3/4"></div>
            </td>
            <td className="py-2 px-4">
              <div className="h-4 bg-gray-300 rounded animate-pulse w-1/2"></div>
            </td>
            <td className="py-2 px-4">
              <div className="h-4 bg-gray-300 rounded animate-pulse w-3/4"></div>
            </td>
            <td className="py-2 px-4">
              <div className="h-4 bg-gray-300 rounded animate-pulse w-1/4"></div>
            </td>
            <td className="py-2 px-4 flex items-center gap-2">
              <div className="h-8 w-8 bg-gray-300 rounded-full animate-pulse"></div>
              <div className="h-8 w-8 bg-gray-300 rounded-full animate-pulse"></div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableSkeleton;
