import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { BsFacebook } from 'react-icons/bs';
import { FcGoogle } from 'react-icons/fc';

// export interface LoginFormValues {
//   identifier: string;
//   password: string;
// }

const LoginPage: React.FC = () => {
  // const { cookies, setCookie } = useAuth();
  const router = useRouter();

  const handleGoogleLogin = () => {
    window.open(process.env.NEXT_APP_GOOGLE_OAUTH, '_blank');
  };

  return (
    <Main meta={<Meta title="Lorem ipsum" description="Lorem ipsum" />}>
      <div className="flex justify-center items-center h-full w-full">
    <div className="auth-wrapper">
      <div className="auth-container">
        <h1 className="font-semibold text-yellow-400 text-4xl text-center mb-2">
          Login Page
        </h1>
        <form>
          <div className="form-group">
            <label>Email</label>
            <input
              type="text"
              className="input"
              // {...register('identifier', { required: 'Email is required' })}
            />
            {/* {errors.identifier && (
              <span className="error">{errors.identifier.message}</span>
            )} */}
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              className="input"
              type="password"
              // {...register('password', {
              //   required: 'Password is required',
              //   minLength: {
              //     value: 6,
              //     message: 'Password must be at least 6 characters long',
              //   },
              // })}
            />
            {/* {errors.password && (
              <span className="error">{errors.password.message}</span>
            )} */}
          </div>
          {/* <Toaster /> */}
          <div className="form-group">
            <p className="text-gray-200 text-right">
              <a href="/forgot-password">Forgot password?</a>
            </p>
          </div>
          <button className="primary-button" type="submit">
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
            <Link href="/signup">Register</Link>
          </div>
        </form>
      </div>
    </div>
  </div></Main>
    
  );
};

export default LoginPage;
