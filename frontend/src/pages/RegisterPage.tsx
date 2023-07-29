import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { RANDOM_AVATAR } from "../common/constants";
import { getRandomItemFromArray } from "../utils";
import { IoDiceSharp } from "react-icons/io5";
import { CreateUserDto } from "../interfaces";
interface RegisterFormValues {
  name: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const RegisterPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>();
  const [avatar, setAvatar] = useState("");
  const [random, setRandomize] = useState(false);
  useEffect(() => {
    setAvatar(
      `https://api.dicebear.com/6.x/adventurer-neutral/svg?seed=${getRandomItemFromArray(
        RANDOM_AVATAR
      )}`
    );
  }, [random]);
  const handleFormSubmit = (data: RegisterFormValues) => {
    const registerUser : CreateUserDto = {
      avatar,
      email: data.email,
      name: 
    }
  };
  const navigate = useNavigate();
  return (
    <div className="flex justify-center items-center w-full h-full">
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
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              className="input"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <span className="error">{errors.name.message}</span>
            )}
          </div>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              className="input"
              {...register("username", { required: true })}
            />
            {errors.username && (
              <span className="error">{errors.username.message}</span>
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
            {errors.email && (
              <span className="error">{errors.email.message}</span>
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
              <span className="error">{errors.password.message}</span>
            )}
          </div>
          <div className="form-group">
            <label>Confirm password</label>
            <input
              className="input"
              type="password"
              {...register("confirmPassword", { required: true, minLength: 6 })}
            />
            {errors.confirmPassword && (
              <span className="error">{errors.confirmPassword.message}</span>
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
