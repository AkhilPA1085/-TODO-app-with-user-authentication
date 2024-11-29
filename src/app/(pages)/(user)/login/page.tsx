'use client'
import React, { ChangeEvent, useState } from 'react'
import Link from 'next/link';
import { LoginForm } from '../../../types/definitions';
import { userLogin } from '@/services/user.services';
import { useRouter } from 'next/navigation';
import CustomInput from '@/app/components/basic/CustomInput';
import CustomButton from '@/app/components/basic/CustomButton';
import BaseCard from '@/app/components/cards/BaseCard';
import { useDispatch } from 'react-redux';
import { setProfile } from '@/app/lib/features/profile/profileSlice';

const LoginPage = () => {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [user, setUser] = useState<LoginForm>({
        email: '',
        password: '',
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value
        }))
    }

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        try {
            const response = await userLogin(user)
            setLoading(false)
            if (response?.data.success) {
                router.push('/')
            } else if (response?.data?.error) {
                setError(response?.data.error || "An error occurred, please try again.");
            }
        } catch (err: unknown) {
            setLoading(false)
            if (err instanceof Error) {
                setError(err.message)
            } else {
                setError("An unexpected error occurred.")
            }
        }
    }
    return (
        <div className="flex items-center justify-center min-h-screen">
            <BaseCard shadow className='w-full max-w-md p-8'>
                <form onSubmit={handleLogin} className='flex flex-col gap-5'>
                    <CustomInput type="email"
                        id='email'
                        name='email'
                        placeholder='Email'
                        value={user?.email}
                        onChange={handleChange} />
                    <CustomInput type="password"
                        id='password'
                        name='password'
                        placeholder='Password'
                        value={user?.password}
                        onChange={handleChange} />
                    <CustomButton
                        disabled={loading}
                        onClick={handleLogin}
                        label={loading ? 'Processing...' : 'Login'} />
                    <Link href='/signup' className='underline text-blue-600 font-sm'>Create an account?</Link>
                    <Link href='/forgotpassword' className='underline text-blue-600 font-sm'>Forgot password?</Link>
                    {error?.length > 0 && <p className='text-red-600 font-bold'>{error}</p>}
                </form>
            </BaseCard>
        </div>
    )
}

export default LoginPage