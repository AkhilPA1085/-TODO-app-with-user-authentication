'use client'

import { setProfile } from '@/app/lib/features/profile/profileSlice'
import { userLogout } from '@/services/user.services'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Container from './Container'
import { ProfileState } from '@/app/types/definitions'

const Navbar = () => {
  const router = useRouter()
  const profileReducer = useSelector((state: ProfileState) => state.profile)
  const { user } = profileReducer
  const dispatch = useDispatch()

  const logout = async () => {
    try {
      const response = await userLogout()
      if (response?.data.success) {
        dispatch(setProfile({ profile: null }))
        router.push('/login')
      }
    } catch (error) {
      console.log('Error during logout:', error)
    }
  }

  if (user) {
    return (
      <div className='fixed top-0 h-24 w-full'>
        <Container>
          <div className='flex items-center justify-between py-5'>
            <h1 className="text-3xl font-bold uppercase tracking-wider">TODO</h1>
            <button
              onClick={logout}
              className='bg-green-600 p-4 rounded-md text-white font-bold'>
              Logout ({user?.username})
            </button>
          </div>
        </Container>
      </div>
    )
  } else {
    return null
  }
}

export default Navbar
