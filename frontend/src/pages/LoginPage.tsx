import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { BsFacebook } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { login } from "../apis/authServices";
import toast, { Toaster } from "react-hot-toast";
import { useCookies } from "react-cookie";
import useAuth from "../hooks/useAuth";
import { EXPIRATION_DATE } from "../common/constants";
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
  const { cookies, setCookie } = useAuth();
  const [token, setAccessToken] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    // Check if the 'accessToken' cookie exists and its value
    const accessTokenCookie = cookies["accessToken"];
    console.log({ accessTokenCookie });
    if (!accessTokenCookie || accessTokenCookie !== "true") {
      // navigate("/dashboard");
    }
  }, [cookies]);
  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    // Handle form submission
    const { identifier, password } = data;
    const loginDto = { identifier, password };
    try {
      const response: any = await login(loginDto);
      const { accessToken } = response.data;
      // Set the accessToken cookie with an expiration date of 7 days from now

      setCookie("accessToken", accessToken, {
        path: "/",
        expires: EXPIRATION_DATE,
      });
      setAccessToken(accessToken);
      toast.success("Login successful!"); // Display success toast
    } catch (error) {
      toast.error("Login failed. Please check your credentials."); // Display error toast
    }
  };
  const handleGoogleLogin = () => {
    window.open(import.meta.env.VITE_GOOGLE_OAUTH, "_blank");
  };

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
            <Toaster />
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
            <button
              className="bg-slate-200 flex items-center justify-center gap-x-2 w-full mt-4"
              onClick={handleGoogleLogin}
            >
              <FcGoogle />
              <span>Login with Google</span>
            </button>
            <button className="bg-slate-200 flex items-center justify-center gap-x-2 w-full mt-4">
              <BsFacebook color={"#1877F2"} />
              <span>Login with Facebook</span>
            </button>
            <div className="form-group flex items-center justify-center">
              <p className="text-gray-200">Need an account? </p>
              <a onClick={() => navigate("/signup")}>Register</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
