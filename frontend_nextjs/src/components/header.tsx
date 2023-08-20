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
import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { useAuth } from "@/hooks/useAuthContext";

const Header = () => {
  const { user, setCurrentUser, removeCurrentUser } = useAuth();
  useEffect(() => {
    setCurrentUser();
  }, []);
  const [toggle, setToggle] = useState(false);
  const router = useRouter();
  const handleLogin = () => {
    router.push('/login');
  };
  
  return (
    <header className="header">
      <div className="flex items-center justify-end w-full">
        {/* <DarkModeSwitch/> */}
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
        <ul className="menu-list">
          <li className="menu-item">Profile</li>
          <li className="menu-item">Settings</li>
          <li
            className="menu-item"
            onClick={removeCurrentUser}
          >
            Log out
          </li>
        </ul>
      )}
    </header>
  );
};
export default Header;
