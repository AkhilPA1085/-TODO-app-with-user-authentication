'use client'
import CustomButton from '@/app/components/basic/CustomButton';
import { userEmailVerification } from '@/services/user.services';
import React, { useEffect, useState } from 'react';

const VerifyEmail = () => {
  const [state, setState] = useState({
    token: '',
    verified: false,
    error: null as Error | null, // Specify error type
    loading: true,
  });

  const { token, verified, error, loading } = state;

  const verifyEmail = async (token: string) => {
    try {
      const res = await userEmailVerification(token);
      if (res.data.success) {
        setState((prev) => ({ ...prev, verified: true, loading: false }));
      }
    } catch (error: unknown) {  // Specify that error could be of type unknown
      if (error instanceof Error) {  // Check if error is an instance of the Error object
        setState((prev) => ({ ...prev, error, loading: false }));
      } else {
        setState((prev) => ({ ...prev, error: new Error('An unknown error occurred'), loading: false }));
      }
    }
  };

  useEffect(() => {
    const urlToken = new URLSearchParams(window.location.search).get('token');
    setState((prev) => ({ ...prev, token: urlToken || '' }));
  }, []);

  useEffect(() => {
    if (token) {
      verifyEmail(token);
    }
  }, [token]);

  return (
    <div className='h-screen flex items-center justify-center flex-col gap-5'>
      {loading ? (
        <h1 className='text-4xl'>Checking for email verification, please wait...</h1>
      ) : verified ? (
        <>
          <h1 className='text-4xl'>Email Verification successfully completed</h1>
          <CustomButton href='/login' label='Login'/>
        </>
      ) : error ? (
        <div className='text-4xl'>{error.message || 'Verification Error'}</div>
      ) : null}
    </div>
  );
};

export default VerifyEmail;