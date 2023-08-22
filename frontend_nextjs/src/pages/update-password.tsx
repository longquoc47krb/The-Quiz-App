import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

import ErrorMessage from '@/components/error-message';
import withAuth from '@/hocs/withAuth';
import { Meta } from '@/layouts/Meta';
import { ProfileLayout } from '@/templates/ProfileLayout';
import { validateUpdatePasswordSchema } from '@/utils';

interface UpdatePasswordValues {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

function UpdatePassword() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [cpasswordVisible, setCPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible((prevVisible) => !prevVisible);
  };
  const toggleCPasswordVisibility = () => {
    setCPasswordVisible((prevVisible) => !prevVisible);
  };
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
    getValues,
    setValue,
  } = useForm<UpdatePasswordValues>({
    resolver: yupResolver(validateUpdatePasswordSchema),
  });

  const onSubmit = (data) => {
    console.log(data); // You can handle password update logic here
  };
  return (
    <ProfileLayout
      meta={
        <Meta title="Update password | Quizaka" description="Update password" />
      }
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-2xl font-semibold">Update Password</h1>
        <Controller
          name="currentPassword"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <div className="form-group relative">
              <label>Current Password</label>
              <div className="relative inline-block w-[calc(100vw-50rem)]">
                <input
                  className="input-container w-[calc(100vw-50rem)]"
                  type={passwordVisible ? 'text' : 'password'}
                  {...field}
                  {...register('currentPassword', {
                    required: true,
                    minLength: 6,
                  })}
                />
                <button
                  className="bg-transparent hover:bg-transparent w-fit absolute top-1/2 right-2 -translate-y-1/2"
                  type="button"
                  onClick={togglePasswordVisibility}
                >
                  {passwordVisible ? <AiFillEyeInvisible /> : <AiFillEye />}
                </button>
              </div>

              <ErrorMessage error={errors.currentPassword?.message} />
            </div>
          )}
        />
        <Controller
          name="newPassword"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <div className="form-group relative">
              <label>New Password</label>
              <div className="relative inline-block w-[calc(100vw-50rem)]">
                <input
                  className="input-container w-[calc(100vw-50rem)]"
                  type={passwordVisible ? 'text' : 'password'}
                  {...field}
                  {...register('newPassword', {
                    required: true,
                    minLength: 6,
                  })}
                />
                <button
                  className="bg-transparent hover:bg-transparent w-fit absolute top-1/2 right-2 -translate-y-1/2"
                  type="button"
                  onClick={togglePasswordVisibility}
                >
                  {passwordVisible ? <AiFillEyeInvisible /> : <AiFillEye />}
                </button>
              </div>

              <ErrorMessage error={errors.currentPassword?.message} />
            </div>
          )}
        />
        <Controller
          name="confirmPassword"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <div className="form-group relative">
              <label>Confirm Password</label>
              <div className="relative inline-block w-[calc(100vw-50rem)]">
                <input
                  className="input-container w-[calc(100vw-50rem)]"
                  type={passwordVisible ? 'text' : 'password'}
                  {...field}
                  {...register('confirmPassword', {
                    required: true,
                    minLength: 6,
                  })}
                />
                <button
                  className="bg-transparent hover:bg-transparent w-fit absolute top-1/2 right-2 -translate-y-1/2"
                  type="button"
                  onClick={togglePasswordVisibility}
                >
                  {passwordVisible ? <AiFillEyeInvisible /> : <AiFillEye />}
                </button>
              </div>

              <ErrorMessage error={errors.currentPassword?.message} />
            </div>
          )}
        />
        <button
          type="submit"
          className="w-fit px-4 py-2 bg-darkPrimary hover:bg-darkPrimaryActive rounded-md text-gray-400 mt-4"
        >
          Update Password
        </button>
      </form>
    </ProfileLayout>
  );
}

export default withAuth(UpdatePassword);
