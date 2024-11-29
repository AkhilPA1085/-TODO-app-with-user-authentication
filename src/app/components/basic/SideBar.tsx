'use client'
import Link from 'next/link'
import React, { Suspense } from 'react'
import NavLinks from './NavLinks'
import { PowerIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { userLogout } from '@/services/user.services'
import { setProfile } from '@/app/lib/features/profile/profileSlice'
import SidebarSkeleton from '../skeltons/SideBarSkelton'
import { withVerification } from '@/app/components/hoc/withVerification'
import { ProfileState } from '@/app/types/definitions'

const SideNav = () => {
    const router = useRouter()
    const profileReducer = useSelector((state: ProfileState) => state.profile)
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
        <Suspense fallback={<SidebarSkeleton />}>
            <div className='w-full flex-none md:w-64'>
                <div className="flex h-full flex-col px-3 py-4 md:px-2 shadow-md">
                    <Link
                        className="mb-2 flex h-20 items-end justify-start 
                rounded-md bg-teal-700 text-white p-4 md:h-40 shadow-md"
                        href="/"
                    >
                        <div className="w-32 text-white md:w-40">
                            {user?.username}&apos;s TODO
                        </div>
                    </Link>
                    <div className="flex flex-row md:flex-col items-center md:items-start justify-between h-full">
                        <div className="flex items-center md:flex-col h-full w-full">
                            <NavLinks />
                        </div>
                        <div>
                            <button
                                onClick={handleLogout}
                                className="flex grow items-center 
                        justify-start
                        gap-2 rounded-md bg-gray-50 p-3 text-sm 
                        font-semibold text-xl hover:bg-sky-100 text-black 
                        max-h-10"
                                type="button"
                            >
                                <PowerIcon className="w-6" />
                                <div className="hidden md:block">Sign Out</div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Suspense>
    )
}

export default withVerification(SideNav)
