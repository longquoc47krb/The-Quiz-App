/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { logout } from "../store/slices/authSlice";
const Header = () => {
  const [toggle, setToggle] = useState(false);
  const { user, removeCookie, dispatch } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    removeCookie("accessToken");
    dispatch(logout());
    navigate("/");
  };
  const handleLogin = () => {
    navigate("/login");
  };
  console.log({ user });
  return (
    <header>
      <div className="flex items-center justify-end w-full">
        {user ? (
          <div className="text-gray-200 font-medium text-base flex items-center gap-x-4">
            <img
              src={user.avatar}
              alt="avatar"
              className="w-12 h-12 rounded-full"
              onClick={() => setToggle(!toggle)}
            />
            <span className="text-white">{user.name}</span>
          </div>
        ) : (
          <span className="text-white cursor-pointer" onClick={handleLogin}>
            Login
          </span>
        )}
      </div>
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
