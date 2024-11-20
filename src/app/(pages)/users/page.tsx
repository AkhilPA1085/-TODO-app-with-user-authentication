'use client'
import TableSkeleton from '@/app/components/skeltons/TableSkelton'
import { User } from '@/app/types/definitions'
import { getAllUsers } from '@/services/user.services'
import { EyeIcon } from '@heroicons/react/24/outline'
import React, { useEffect, useState } from 'react'

const Users: React.FC = () => {
    const [loading, setLoading] = useState(false)
    const [users, setUsers] = useState<User[]>([])

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true)
            try {
                const res = await getAllUsers()
                if (res.success) {
                    setUsers(res?.data)
                }
            } catch (error) {
                console.error('Error fetching users:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchUsers()
    }, [])

    if(loading){
        return <TableSkeleton/>
    }

    return (
        <div className="overflow-x-auto text-black">
            <table className="min-w-full border-collapse rounded-md">
                <thead>
                    <tr className="bg-teal-600">
                        <th className="py-2 px-4 text-left text-white">User Name</th>
                        <th className="py-2 px-4 text-left text-white">Email</th>
                        <th className="py-2 px-4 text-left text-white">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users?.map((user, index) => (
                        <tr key={index} className="bg-white even:bg-teal-50 hover:bg-teal-100">
                            <td className="py-2 px-4">{user?.username}</td>
                            <td className="py-2 px-4">{user?.email}</td>
                            <td className="py-2 px-4"><EyeIcon className='w-6 h-6' /></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Users
