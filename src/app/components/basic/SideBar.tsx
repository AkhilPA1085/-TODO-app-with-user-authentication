'use client'
import Link from 'next/link'
import React from 'react'
import NavLinks from './NavLinks'
import { PowerIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { userLogout } from '@/services/user.services'
import { setProfile } from '@/app/lib/features/profile/profileSlice'
import BaseModal from '../modals/BaseModal'

const SideNav = () => {
    const router = useRouter()
    const profileReducer = useSelector((state: any) => state.profile)
    const { user } = profileReducer
    const dispatch = useDispatch()

    const handleLogout = async () => {
        try {
            const response = await userLogout()
            if (response?.data.success) {
                dispatch(setProfile({ profile: null }))
                router.push('/login')
            } else if (response?.data?.error) {
                console.log('Logout error:', response.data.error)
            }
        } catch (error) {
            console.log('Error during logout:', error)
        }
    }

    return (
        <div className="flex h-full flex-col px-3 py-4 md:px-2">
            <Link
                className="mb-2 flex h-20 items-end justify-start 
                rounded-md bg-blue-600 p-4 md:h-40"
                href="/"
            >
                <div className="w-32 text-white md:w-40">
                    TODO
                </div>
            </Link>
            <div className="flex grow flex-row justify-between 
            space-x-2 md:flex-col md:space-x-0 md:space-y-2">
                <NavLinks />
                <div className="hidden h-auto w-full grow 
                rounded-md bg-gray-50 md:block"></div>
                <BaseModal/>
                <button
                    onClick={handleLogout}
                    className="flex h-[48px] w-full grow items-center 
                    justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm 
                    font-medium hover:bg-sky-100 hover:text-blue-600 
                    md:flex-none md:justify-start md:p-2 md:px-3"
                    type="button"
                >
                    <PowerIcon className="w-6" />
                    <div className="hidden md:block">Sign Out</div>
                </button>
            </div>
        </div>
    )
}

export default SideNav
