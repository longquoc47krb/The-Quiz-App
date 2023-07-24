/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { HeaderProps } from "../interfaces";
import { useState } from "react";
import { clearAccessTokenInCookie } from "../utils";
import { redirect } from "react-router-dom";
const Header: React.FC<HeaderProps> = ({ user }) => {
  const { name, avatar } = user;
  const [toggle, setToggle] = useState(false);
  // const { data, isLoading } = useFetchQuizzes();
  const handleLogout = () => {
    clearAccessTokenInCookie();
    redirect("/home");
  };

  return (
    <header>
      <h1 className="font-bold text-white text-3xl">{name}</h1>
      <img
        src={avatar}
        alt="avatar"
        className="w-12 h-12 rounded-full"
        onClick={() => setToggle(!toggle)}
      />
      {toggle && (
        <ul className="bg-gray-100 p-4 absolute top-12 right-12">
          <li className="block cursor-pointer hover:bg-slate-300">Profile</li>
          <li className="block cursor-pointer  hover:bg-slate-300">Settings</li>
          <li
            className="block cursor-pointer  hover:bg-slate-300"
            onClick={handleLogout}
          >
            Log out
          </li>
        </ul>
      )}
    </header>
  );
};

export default Header;
