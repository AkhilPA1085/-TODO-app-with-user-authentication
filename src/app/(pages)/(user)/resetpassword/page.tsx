'use client'
import CustomButton from '@/app/components/basic/CustomButton'
import CustomInput from '@/app/components/basic/CustomInput'
import { resetPassword } from '@/services/user.services'
import React, { useEffect, useState } from 'react'

const ResetPassword = () => {
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
        resetPassword(newPassword, token).then((res) => {
            if (res?.data.success) {
                setResMessage(res?.data?.message || "Password reset successfully");
                setNewPassword("");
            } else if (res?.data.error) {
                setResMessage(res?.data.error || "An error occurred, please try again.");
            }
        }).catch((error) => {
            // Handle unexpected errors
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
                <CustomButton type="submit" label='Reset Password'/>
                <p className="text xl text-red-600">{resMessage}</p>
            </form>
        </div>
    )
}

export default ResetPassword
