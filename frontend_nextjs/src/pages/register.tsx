/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable simple-import-sort/imports */
/* eslint-disable prettier/prettier */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { SubmitHandler, Controller, useForm } from 'react-hook-form';
import { IoDiceSharp } from "react-icons/io5";
import  {AiFillEyeInvisible, AiFillEye} from 'react-icons/ai';
import toast, { Toaster } from 'react-hot-toast';
import ErrorMessage from '@/components/error-message';
import { getRandomItemFromArray, validateSchema } from '@/utils';
import { Main } from '@/templates/Main';
import { Meta } from '@/layouts/Meta';
import { CreateUserDto, LoginType, Role } from "@/interfaces";
import { RANDOM_AVATAR } from '@/common/constants';
import { registerUser } from '@/apis/authServices';

interface RegisterFormValues {
  name: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const RegisterPage: React.FC = () => {
  const [avatar, setAvatar] = useState('');
  const [random, setRandomize] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [cpasswordVisible, setCPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible((prevVisible) => !prevVisible);
  };
  const toggleCPasswordVisibility = () => {
    setCPasswordVisible((prevVisible) => !prevVisible);
  };
  const router = useRouter();
  useEffect(() => {
    setAvatar(
      `https://api.dicebear.com/6.x/adventurer-neutral/svg?seed=${getRandomItemFromArray(
        RANDOM_AVATAR
      )}`
    );
  }, [random]);
  const {
    getValues,
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: yupResolver(validateSchema),
  });

  const onSubmit: SubmitHandler<RegisterFormValues> = async (data) => {
    try {
      const registerUserRequest: CreateUserDto = {
        avatar,
        email: data.email,
        name: data.name,
        username: data.username,
        loginType: [LoginType.EmailPassword],
        password: data.password,
        roles: [Role.User],
        verified: false,
      };
  
      const response = await registerUser(registerUserRequest);
  
      // Handle the result here, e.g., show a success message
      if(response.success){        
        toast.success(response?.message, {
          position: 'bottom-center',
        });
      }
    } catch (error) {
      // Handle any errors that occur during registration
      toast.error(`Error during registration: ${error.response.data}`);
      // Show an error message to the user or take appropriate action
    }
  
  
   
  };
  const isLengthValid = getValues('password')?.length >= 8;
  const hasUppercase = /[A-Z]/.test(getValues('password'));
  const hasLowercase = /[a-z]/.test(getValues('password'));
  const hasNumber = /\d/.test(getValues('password'));
  const hasSpecialCharacter = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(
      getValues('password'),
    );
 
  return (
    <Main meta={<Meta title="Register New Account" description="Register New Account" />}>
    <div className="flex justify-center items-center">
      <div className="auth-container">
        <h1 className="font-semibold text-yellow-400 text-4xl text-center mb-2">
          Register Page
        </h1>
        <div className="relative w-full flex justify-center">
          <img
            src={avatar}
            alt="avatar"
            className="w-[120px] h-[120px] rounded-lg gradient-box"
          />
          <IoDiceSharp
            onClick={() => setRandomize(!random)}
            style={{
              fontSize: 32,
              cursor: "pointer",
              position: "absolute",
              bottom: 0,
              right: "30%",
            }}
            color="red"
          />
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="name"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <div className="form-group">
                <label>Name</label>
                <input {...field} type="text" className="input" />
                <ErrorMessage error={errors.name?.message} />
              </div>
            )}
          />
          <Controller
            name="username"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <div className="form-group">
                <label>Username</label>
                <input {...field} type="text" className="input" />
                <ErrorMessage error={errors.username?.message} />
              </div>
            )}
          />
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <div className="form-group">
                <label>Email</label>
                <input {...field} type="text" className="input" />
                <ErrorMessage error={errors.email?.message} />
              </div>
            )}
          />
          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <div className="form-group relative">
                <label>Password</label>
                <div className='relative inline-block w-full'>
                <input
                  className="input"
                  type={passwordVisible ? 'text' : 'password'}
                  {...field}
                  {...register('password', { required: true, minLength: 6 })}
                />
                <button className='bg-transparent hover:bg-transparent w-fit absolute top-1/2 right-2 -translate-y-1/2' type="button" onClick={togglePasswordVisibility}>
                  {passwordVisible ? <AiFillEyeInvisible/> : <AiFillEye/>}
                </button>
                </div>
               
                <ErrorMessage error={errors.password?.message} />
                <ul className="password-cases">
                  <li
                    className={`block ${
                      isLengthValid ? 'text-green-500' : 'error'
                    }`}
                  >
                    {isLengthValid ? '✅' : '⛔'}At least 8 characters
                  </li>
                  <li
                    className={`block ${
                      hasUppercase ? 'text-green-500' : 'error'
                    }`}
                  >
                    {hasUppercase ? '✅' : '⛔'}Contains at least one uppercase
                    letter
                  </li>
                  <li
                    className={`block ${
                      hasLowercase ? 'text-green-500' : 'error'
                    }`}
                  >
                    {hasLowercase ? '✅' : '⛔'}Contains at least one lowercase
                    letter
                  </li>
                  <li
                    className={`block ${
                      hasNumber ? 'text-green-500' : 'error'
                    }`}
                  >
                    {hasNumber ? '✅' : '⛔'}Contains at least one number
                  </li>
                  <li
                    className={`block ${
                      hasSpecialCharacter ? 'text-green-500' : 'error'
                    }`}
                  >
                    {hasSpecialCharacter ? '✅' : '⛔'}Contains at least one
                    special character
                  </li>
                </ul>
              </div>
            )}
          />
          <Controller
            name="confirmPassword"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <div className="form-group">
                <label>Confirm password</label>
                <div className='relative inline-block w-full'>
                <input {...field} type={cpasswordVisible ? 'text' : 'password'} className="input" />
                <button className='bg-transparent hover:bg-transparent w-fit absolute top-1/2 right-2 -translate-y-1/2' type="button" onClick={toggleCPasswordVisibility}>
                  {cpasswordVisible ? <AiFillEyeInvisible/> : <AiFillEye/>}
                </button>
                </div>
                <ErrorMessage error={errors.confirmPassword?.message} />
              </div>
            )}
          />

          <button className="primary-button mt-4" type="submit">
            Register
          </button>
          <div className="form-group flex items-center justify-center">
            <p className="text-gray-200 text-center ">Already a user? </p>
            <a className="cursor-pointer" onClick={()=>router.push("/login")}>Login</a>
          </div>
        </form>
      </div>
      <Toaster />
    </div></Main>
  );
};

export default RegisterPage;
