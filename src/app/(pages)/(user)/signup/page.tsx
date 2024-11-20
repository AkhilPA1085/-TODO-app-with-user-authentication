'use client'
import React, { ChangeEvent, useState } from 'react'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SignUpForm } from '../../../types/definitions';
import { userSignUp } from '@/services/user.services';
import CustomInput from '@/app/components/basic/CustomInput';
import CustomButton from '@/app/components/basic/CustomButton';
import BaseCard from '@/app/components/cards/BaseCard';


const SignUpPage = () => {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState<SignUpForm>({
        username: '',
        email: '',
        password: '',
    })
    const [verificationMessage, setVerificationMessage] = useState('')

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value
        }))
    }

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true)
        try {
            const response = await userSignUp(user)
            setLoading(false)
            if (response?.data?.success && response?.data?.savedUser?.isVerified) {
                router.push('/login')
            } else {
                setVerificationMessage('A verification email has been sent to your email address. Please check and verify your account.')
                setUser({
                    username: '',
                    email: '',
                    password: '',
                })
            }
        } catch (error) {
            setLoading(false)
            console.log('signup error', error)
        }
    }
    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            {verificationMessage?.length > 0 && <p className='text-md text-green-600 mb-5'>{verificationMessage}</p>}
            <BaseCard shadow className='p-8 w-full max-w-md'>
                <form onSubmit={(e) => handleSignup(e)} className='flex flex-col gap-5'>
                    <CustomInput type="text"
                        id='username'
                        name='username'
                        placeholder='User Name'
                        value={user?.username}
                        onChange={handleChange} />
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
                        type="submit"
                        label={loading ? 'Processing...' : 'Sign up'} />
                    <Link href='/login'>Already have an account?</Link>
                </form>
            </BaseCard>
        </div>
    )
}

export default SignUpPage