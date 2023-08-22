import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { CgLock, CgProfile } from 'react-icons/cg';
import { VscVerified } from 'react-icons/vsc';

const ProfileSidebar = ({ className }) => {
  const router = useRouter();
  const profileRef = useRef(null);
  const passwordRef = useRef(null);
  const verificationRef = useRef(null);
  const [index, setIndex] = useState(0);
  useEffect(() => {
    switch (router.pathname) {
      case '/profile': {
        setIndex(0);
        break;
      }
      case '/update-password': {
        setIndex(1);
        break;
      }
      case '/verfication': {
        setIndex(2);
        break;
      }
      default: {
        setIndex(3);
        break;
      }
    }
  }, [router.pathname]);
  return (
    <ul
      className={`relative w-fit md:flex flex-col hidden border-r-[1px] border-r-zinc-700 pr-4 ${className}`}
    >
      <li
        ref={profileRef}
        className={`profile-sidebar-item ${
          router.pathname === '/profile' ? 'active' : ''
        }`}
        id="profile"
        onClick={() => {
          router.push('/profile');
          setIndex(0);
        }}
      >
        <CgProfile size={32} />
        <span>Profile</span>
      </li>
      <li
        id="profile"
        ref={passwordRef}
        className={`profile-sidebar-item ${
          router.pathname === '/update-password' ? 'active' : ''
        }`}
        onClick={() => {
          router.push('/update-password');
          setIndex(1);
        }}
      >
        <CgLock size={32} />
        <span>Update password</span>
      </li>
      <li
        id="profile"
        ref={verificationRef}
        className={`profile-sidebar-item ${
          router.pathname === '/verification' ? 'active' : ''
        }`}
        onClick={() => {
          router.push('/verification');
          setIndex(2);
        }}
      >
        <VscVerified size={32} />
        <span>Verification</span>
      </li>
      {/* <span className={`profile-sidebar-item active absolute -z-20 translate-y-[${80 * index}px] duration-75 ease-linear`}/> */}
    </ul>
  );
};

export default ProfileSidebar;
