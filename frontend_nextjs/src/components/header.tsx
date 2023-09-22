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
import { useAuth } from "@/hooks/useAuthContext";
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useClickAway } from "@uidotdev/usehooks";
import ThemeSwitch from "./theme-switch";
const Header = () => {
  const { user, setCurrentUser, removeCurrentUser } = useAuth();
  const [toggle, setToggle] = useState(false);
  const avatarRef = useRef(null)
  const ref = useClickAway(() => {
      setToggle(false);
  });
  const router = useRouter();
  const handleGoogleLogin = () => {
    window.open(process.env.NEXT_PUBLIC_GOOGLE_OAUTH, '_blank');
  };
  useEffect(()=>{
    setCurrentUser()
  },[])
  const currentDomain = window.location.hostname;
    console.log('Current Domain:', currentDomain);
  return (
    <header className="header">
        {/* <DarkModeSwitch/> */}
        <h1 onClick={()=>router.push('/')} className="flex items-center dark:text-white text-primary-900 font-bold cursor-pointer text-xl">Quizaholic</h1>
        <div className="flex items-center gap-x-4"> <ThemeSwitch/>
        {user ? (
          <div className="text-gray-200 font-medium text-base flex items-center gap-x-4">
            <img
              src={user.avatar}
              alt="avatar"
              ref={avatarRef}
              className="w-10 h-10 rounded-full object-cover"
              onClick={() => setToggle(!toggle)}
            />
          </div>
        ) : (
          currentDomain === "localhost" ? <button
          className="bg-gray-800/30 flex items-center justify-center w-max gap-x-2 mt-4 p-2 rounded-lg m-2 text-white hover:bg-gray-800/70"
          onClick={handleGoogleLogin}
        >
          <FcGoogle />
          <span>Login with Google</span>
        </button> : <span>Login</span>
        )}
        </div>
        <AnimatePresence>
      {toggle && user && (
        <motion.div ref={ref} initial={{opacity: 0 }} animate={{opacity: 1}} exit={{opacity: 0}} transition={{duration: 0.5}}className="absolute w-max top-14 right-10 z-50">
          <ul className="menu-list">
            <motion.li className="menu-item"   onClick={()=>router.push('/profile')}>Profile</motion.li>
            <motion.li className="menu-item"
            onClick={()=>router.push('/settings')}
            >Settings</motion.li>
            <motion.li
              className="menu-item"
              onClick={removeCurrentUser}
            >
              Log out
            </motion.li>
          </ul>
        </motion.div>
      )}
      </AnimatePresence>
    </header>
  );
};
export default Header;
