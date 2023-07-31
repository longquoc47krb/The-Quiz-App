import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { RANDOM_AVATAR } from "../common/constants";

import { yupResolver } from "@hookform/resolvers/yup";
import { IoDiceSharp } from "react-icons/io5";
import ErrorMessage from "../components/error-message";
import { CreateUserDto, LoginType, Role } from "../interfaces";
import { getRandomItemFromArray, validateSchema } from "../utils";
interface RegisterFormValues {
  name: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const RegisterPage: React.FC = () => {
  const {
    getValues,
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: yupResolver(validateSchema),
  });
  const [avatar, setAvatar] = useState("");
  const [random, setRandomize] = useState(false);
  useEffect(() => {
    setAvatar(
      `https://api.dicebear.com/6.x/adventurer-neutral/svg?seed=${getRandomItemFromArray(
        RANDOM_AVATAR
      )}`
    );
  }, [random]);
  const onSubmit: SubmitHandler<RegisterFormValues> = async (data) => {
    console.log({ data });
    const registerUser: CreateUserDto = {
      avatar,
      email: data.email,
      name: data.name,
      username: data.username,
      loginType: LoginType.EmailPassword,
      password: data.password,
      roles: [Role.User],
      verified: false,
    };
    console.log({ registerUser });
  };
  const navigate = useNavigate();

  const isLengthValid = getValues("password")?.length >= 8;
  const hasUppercase = /[A-Z]/.test(getValues("password"));
  const hasLowercase = /[a-z]/.test(getValues("password"));
  const hasNumber = /\d/.test(getValues("password"));
  const hasSpecialCharacter = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(
    getValues("password")
  );
  return (
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
              <div className="form-group">
                <label>Password</label>
                <input
                  className="input"
                  type="password"
                  {...register("password", { required: true, minLength: 6 })}
                />
                <ErrorMessage error={errors.password?.message} />
                <ul className="password-cases">
                  <li
                    className={`block ${
                      isLengthValid ? "text-green-500" : "error"
                    }`}
                  >
                    {isLengthValid ? "✅" : "⛔"}At least 8 characters
                  </li>
                  <li
                    className={`block ${
                      hasUppercase ? "text-green-500" : "error"
                    }`}
                  >
                    {hasUppercase ? "✅" : "⛔"}Contains at least one uppercase
                    letter
                  </li>
                  <li
                    className={`block ${
                      hasLowercase ? "text-green-500" : "error"
                    }`}
                  >
                    {hasLowercase ? "✅" : "⛔"}Contains at least one lowercase
                    letter
                  </li>
                  <li
                    className={`block ${
                      hasNumber ? "text-green-500" : "error"
                    }`}
                  >
                    {hasNumber ? "✅" : "⛔"}Contains at least one number
                  </li>
                  <li
                    className={`block ${
                      hasSpecialCharacter ? "text-green-500" : "error"
                    }`}
                  >
                    {hasSpecialCharacter ? "✅" : "⛔"}Contains at least one
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
                <input {...field} type="text" className="input" />
                <ErrorMessage error={errors.confirmPassword?.message} />
              </div>
            )}
          />

          <button className="primary-button" type="submit">
            Register
          </button>
          <div className="form-group flex items-center justify-center">
            <p className="text-gray-200 text-center ">Already a user? </p>
            <a onClick={() => navigate("/login")}>Sign In</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
