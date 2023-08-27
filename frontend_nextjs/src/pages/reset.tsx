import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

import { resetPassword } from '@/apis/authServices';
import ErrorMessage from '@/components/error-message';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';
import { validateUpdatePasswordSchema } from '@/utils';

interface NewPasswordValues {
  newPassword: string;
}

function NewPassword() {
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
    getValues,
    setValue,
  } = useForm<NewPasswordValues>({
    resolver: yupResolver(validateUpdatePasswordSchema),
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible((prevVisible) => !prevVisible);
  };
  const router = useRouter();
  const { query } = router;
  const { code } = query;
  useEffect(() => {
    const createNewPassword = async () => {
      try {
        const response = await resetPassword(code);
        toast.success(response.message);
      } catch (error) {
        console.log({ error });
      }
    };
    createNewPassword();
  }, [code]);
  const onSubmit = (data) => {
    console.log(data); // You can handle password update logic here
  };
  return (
    <Main meta={<Meta title="New password" description="New password" />}>
      <div className="flex justify-center">
        <div>
          <h1>New Password</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="newPassword"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <div className="form-group relative">
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
                  <br />
                  <ErrorMessage error={errors.newPassword?.message} />
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
        </div>
        <Toaster />
      </div>
    </Main>
  );
}

export default NewPassword;
