'use client'
import { User } from '@/app/types/definitions'
import { getAllUsers } from '@/services/user.services'
import { EyeIcon } from '@heroicons/react/24/outline'
import React, { useEffect, useState } from 'react'

const Users: React.FC = () => {
    const [users, setUsers] = useState<User[]>([])

    useEffect(() => {
        getAllUsers().then((res) => {
            if (res.success) {
                setUsers(res?.data)
            } else {
                console.log(res)
            }
        })
    }, [])

    return (
        <div className="overflow-x-auto text-black">
            <table className="min-w-full border-collapse rounded-md">
                <thead>
                    <tr className="bg-yellow-50">
                        <th className="py-2 px-4 text-left text-gray-700">User Name</th>
                        <th className="py-2 px-4 text-left text-gray-700">Email</th>
                        <th className="py-2 px-4 text-left text-gray-700">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users?.map((user, index) => (
                        <tr key={index} className="bg-white even:bg-yellow-50 hover:bg-stone-100">
                            <td className="py-2 px-4">{user?.username}</td>
                            <td className="py-2 px-4">{user?.email}</td>
                            <td className="py-2 px-4"><EyeIcon className='w-6 h-6'/></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Users
