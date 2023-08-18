/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable prettier/prettier */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/button-has-type */
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import type { SubmitHandler} from 'react-hook-form';
import {useForm } from 'react-hook-form';
import toast, {  Toaster } from 'react-hot-toast';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { BsFacebook } from 'react-icons/bs';
import { FcGoogle } from 'react-icons/fc';

import { login } from '@/apis/authServices';
import { EXPIRATION_DATE } from '@/common/constants';
import ErrorMessage from '@/components/error-message';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';


export interface LoginFormValues {
  identifier: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>();
  const router = useRouter()
  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible((prevVisible) => !prevVisible);
  };
  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    // Handle form submission
    if(isSubmitting){
    const { identifier, password } = data;
    const loginDto = { identifier, password };
    try {
      const response: any = await login(loginDto);
      const { accessToken } = response.data;
    
      Cookies.set("accessToken", accessToken, {
        expires: EXPIRATION_DATE
      } );
      router.push('/')
      toast.success("Login successful!");
      setIsSubmitting(false) // Display success toast
    } catch (error) {
      toast.error("Login failed. Please check your credentials."); // Display error toast
      setIsSubmitting(false)
    }
  }
  };
  const handleGoogleLogin = () => {
    window.open(process.env.NEXT_PUBLIC_GOOGLE_OAUTH, '_blank');
  };

  return (
    <Main meta={<Meta title="Login" description="Login" />} >
      <div className="flex justify-center items-center h-full w-full">
        <div className="auth-wrapper">
          <div className="auth-container">
            <h1 className="font-semibold text-yellow-400 text-4xl text-center mb-2">
              Login Page
            </h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="text"
                  className="input"
                  {...register('identifier', { required: 'Email is required' })}
                />
                <ErrorMessage error={errors.identifier?.message} />
              </div>
              <div className="form-group">
                <label>Password</label>
                <div className='relative inline-block w-full'>
                <input
                  className="input"
                  type={passwordVisible ? 'text' : 'password'}
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters long',
                    },
                  })}
                />
                <ErrorMessage error={errors.password?.message} />
                <button className='bg-transparent hover:bg-transparent w-fit absolute top-1/2 right-2 -translate-y-1/2' type="button" onClick={togglePasswordVisibility}>
                  {passwordVisible ? <AiFillEyeInvisible/> : <AiFillEye/>}
                </button>
                </div>
              </div>
              <Toaster />
              <div className="form-group">
                <p className="text-gray-200 text-right">
                  <a href="/forgot-password">Forgot password?</a>
                </p>
              </div>
              <button className="primary-button bg-primary" type="submit" onClick={()=> setIsSubmitting(true)}>
                Sign in
              </button>
              <div className="or-divider">
                <span className="divider-line" />
                <span className="or-text">or</span>
                <span className="divider-line" />
              </div>
              <button
                className="bg-slate-200 flex items-center justify-center gap-x-2 w-full mt-4 p-2"
                onClick={handleGoogleLogin}
              >
                <FcGoogle />
                <span>Login with Google</span>
              </button>
              <button className="bg-slate-200 flex items-center justify-center gap-x-2 w-full mt-4 p-2">
                <BsFacebook color="#1877F2" />
                <span>Login with Facebook</span>
              </button>
              <div className="form-group flex items-center justify-center">
                <p className="text-gray-200">Need an account? </p>
                <a className="cursor-pointer"onClick={()=>router.push("/register")}>Register</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Main>
  );
};
export default LoginPage;
