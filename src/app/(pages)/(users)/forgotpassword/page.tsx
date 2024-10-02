'use client'
import CustomButton from '@/app/components/basic/CustomButton';
import CustomInput from '@/app/components/basic/CustomInput';
import { forgotPassword } from '@/services/user.services';
import React, { useState } from 'react'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false);
  const [resMessage, setResMessage] = useState('')
  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true)
    forgotPassword(email).then((res) => {
      if (res.data.success) {
        setLoading(false)
        setResMessage(res.data.message)
        setEmail('')
      }
    })
  }
  return (
    <div className='h-screen flex flex-col items-center justify-center'>
      <form className='flex flex-col gap-5'>
        <CustomInput
          type="email"
          name="email"
          id="email"
          placeholder='Enter Email Id'
          value={email}
          onChange={(e) => setEmail(e.target.value)} />
        <CustomButton
          type="submit"
          disabled={loading}
          onClick={handleForgotPassword}
          label={loading ? 'Processing...' : 'Submit'}
        />
      </form>
      {resMessage?.length > 0 && <p className='text-2xl font-bold text-red-600 mt-4'>{resMessage}</p>}
    </div>
  )
}

export default ForgotPassword