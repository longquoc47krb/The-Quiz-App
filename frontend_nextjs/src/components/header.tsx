/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable simple-import-sort/imports */
/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable import/newline-after-import */
/* eslint-disable no-inner-declarations */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { useRouter } from 'next/router';
import useAuth from "@/hooks/useAuth";
import Cookies from "js-cookie";
import DarkModeSwitch from "./dark-mode-switch";

const Header = () => {
  const { user, setUser } = useAuth()
  const [toggle, setToggle] = useState(false);
  const router = useRouter();
  const handleLogout = () => {
   Cookies.remove("accessToken");
   setUser(null)
  };
  const handleLogin = () => {
    router.push('/login');
  };
  
  return (
    <header className="header">
      <div className="flex items-center justify-end w-full">
        <DarkModeSwitch/>
        {user ? (
          <div className="text-gray-200 font-medium text-base flex items-center gap-x-4">
            <img
              src={user.avatar}
              alt="avatar"
              className="w-10 h-10 rounded-full"
              onClick={() => setToggle(!toggle)}
            />
          </div>
        ) : (
          <span className="dark:text-white cursor-pointer mr-4" onClick={handleLogin}>
            Login
          </span>
        )}
      </div>
      {toggle && user && (
        <ul className="bg-gray-100 p-4 absolute top-14 right-12">
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
