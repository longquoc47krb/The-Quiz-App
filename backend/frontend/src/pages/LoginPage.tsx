import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";
export interface LoginFormValues {
  emailOrUsername: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>();
  const handleFormSubmit = (data: LoginFormValues) => {
    console.log("Login form data:", data);
  };
  const navigate = useNavigate();
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
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <div className="form-group">
              <label>Email</label>
              <input
                type="text"
                className="input"
                {...register("emailOrUsername", { required: true })}
              />
              {errors.emailOrUsername && (
                <span className="error">Email or username is required</span>
              )}
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                className="input"
                type="password"
                {...register("password", { required: true, minLength: 6 })}
              />
              {errors.password && (
                <span className="error">Password is required</span>
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
