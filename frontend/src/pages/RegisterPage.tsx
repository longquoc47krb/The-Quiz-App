import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface RegisterFormValues {
  username: string;
  email: string;
  password: string;
}

const RegisterPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>();

  const handleFormSubmit = (data: RegisterFormValues) => {
    console.log("Register form data:", data);
  };
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="auth-container">
        <h1 className="font-semibold text-yellow-400 text-4xl text-center mb-2">
          Register Page
        </h1>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              className="input"
              {...register("username", { required: true })}
            />
            {errors.username && (
              <span className="error">Username is required</span>
            )}
          </div>
          <div className="form-group">
            {" "}
            <label>Email</label>
            <input
              className="input"
              type="email"
              {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
            />
            {errors.email && <span className="error">Email is required</span>}
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
          <div className="mt-8">
            <button className="primary-button" type="submit">
              Register
            </button>
          </div>
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
