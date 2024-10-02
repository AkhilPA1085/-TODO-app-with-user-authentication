'use client'
import CustomButton from '@/app/components/basic/CustomButton';
import { userEmailVerification } from '@/services/user.services';
import React, { useEffect, useState } from 'react';

const VerifyEmail = () => {
  const [state, setState] = useState({
    token: '',
    verified: false,
    error: false,
    loading: true,
  });

  const { token, verified, error, loading } = state;

  const verifyEmail = async (token: string) => {
    try {
      const res = await userEmailVerification(token);
      if (res.data.success) {
        setState((prev) => ({ ...prev, verified: true, loading: false }));
      }
    } catch (error) {
      setState((prev) => ({ ...prev, error: true, loading: false }));
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
        <div className='text-4xl'>Verification Error</div>
      ) : null}
    </div>
  );
};

export default VerifyEmail;
