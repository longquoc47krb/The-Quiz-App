import React, { useEffect, useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";
import { login } from "../apis/authServices";
import { saveTokenToCookies } from "../utils";
export interface LoginFormValues {
  identifier: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>();
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    // Handle form submission
    const { identifier, password } = data;
    const loginDto = { identifier, password };
    const response: any = await login(loginDto);
    const { accessToken } = response.data;
    saveTokenToCookies(accessToken);
    navigate("/home");
  };
  //   const handleGoogleLogin = () => {
  //     console.log("Logging in with Google"); // Perform Google login logic here
  //   };

  return (
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
                {...register("identifier", { required: "Email is required" })}
              />
              {errors.identifier && (
                <span className="error">{errors.identifier.message}</span>
              )}
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                className="input"
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters long",
                  },
                })}
              />
              {errors.password && (
                <span className="error">{errors.password.message}</span>
              )}
            </div>
            <div className="form-group">
              <p className="text-gray-200 text-right">
                <a href="">Forgot password?</a>
              </p>
            </div>
            <button className="primary-button" type="submit">
              Sign in
            </button>
            <div className="or-divider">
              <span className="divider-line"></span>
              <span className="or-text">or</span>
              <span className="divider-line"></span>
            </div>
            <button className="bg-slate-200 flex items-center justify-center gap-x-2 w-full mt-4">
              <FcGoogle />
              <span>Login with Google</span>
            </button>
            <button className="bg-slate-200 flex items-center justify-center gap-x-2 w-full mt-4">
              <BsFacebook color={"#1877F2"} />
              <span>Login with Facebook</span>
            </button>
            <div className="form-group flex items-center justify-center">
              <p className="text-gray-200">Need an account? </p>
              <a onClick={() => navigate("/sign-up")}>Register</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
