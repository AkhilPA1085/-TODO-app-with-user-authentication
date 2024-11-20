'use client'
import CustomButton from '@/app/components/basic/CustomButton'
import CustomInput from '@/app/components/basic/CustomInput'
import { resetPassword } from '@/services/user.services'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const ResetPassword = () => {
    const [loading, setLoading] = useState(false)
    const [token, setToken] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [resMessage, setResMessage] = useState("")

    useEffect(() => {
        const urlToken = window.location.search.split('=')[1];
        setToken(urlToken || "")
    }, [])

    const handleResetPassword = (e: React.FormEvent) => {
        e.preventDefault();
        setNewPassword("");
        setLoading(true)
        resetPassword(newPassword, token).then((res) => {
            if (res?.data.success) {
                setLoading(false)
                setResMessage(res?.data?.message || "Password reset successfully");
                setNewPassword("");
            } else if (res?.data.error) {
                setLoading(false)
                setResMessage(res?.data.error || "An error occurred, please try again.");
            }
        }).catch((error:unknown) => {
            // Handle unexpected errors
            setLoading(false)
            setResMessage("An unexpected error occurred. Please try again.");
            console.log(error);
        })
    }

    return (
        <div className='h-screen flex flex-col items-center justify-center'>
            <form
                className='flex flex-col gap-5'
                onSubmit={handleResetPassword}
            >
                <CustomInput
                    type="text"
                    name="reset_password"
                    id="reset_password"
                    placeholder='Enter New Password'
                    onChange={(e) => setNewPassword(e.target.value)}
                />
                <CustomButton type="submit" label={loading ? 'Processing...' : 'Reset Password'} />
                {resMessage && <>
                    <p className="text xl text-red-600">{resMessage}</p>
                    <Link href='/login'>Login</Link>
                </>}
            </form>
        </div>
    )
}

export default ResetPassword
