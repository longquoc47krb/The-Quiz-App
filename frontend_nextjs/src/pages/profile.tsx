// pages/profile.js
import React from 'react';

import { useAuth } from '@/hooks/useAuthContext';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

const Profile = () => {
  const userProfile = {
    avatar: 'link-to-avatar-image',
    name: 'John Doe',
    username: 'johndoe',
    email: 'johndoe@example.com',
    dateOfBirth: '1990-01-01',
  };
  const { user } = useAuth();
  console.log({ user });
  return (
    <Main meta={<Meta title="Profile" description="Profile user" />}>
      <div className="text-gray-300">
        <img
          src={user.avatar}
          alt="Avatar"
          className="w-24 h-24 rounded-full border-2 border-gray-500"
        />
        <h1>{user.name}</h1>
        <p>Username: {user.username}</p>
        <p>Email: {user.email}</p>
        <p>Date of Birth: {user?.dateOfBirth}</p>
      </div>
    </Main>
  );
};

export default Profile;
