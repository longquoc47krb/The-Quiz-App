// pages/profile.js
import React from 'react';
import { MdVerified } from 'react-icons/md';

import Tabs from '@/components/tabs';
import { useAuth } from '@/hooks/useAuthContext';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

const Settings = () => {
  const tabs = ['My quizzes', 'Achievements', 'Settings'];
  const { user } = useAuth();
  console.log({ user });
  return (
    <Main meta={<Meta title="Profile" description="Profile user" />}>
      <div className="text-gray-300 m-4">
        <div className="flex items-center gap-x-4">
          <img
            src={user.avatar}
            alt="Avatar"
            className="w-24 h-24 rounded-full border-2 border-gray-500"
          />
          <div>
            <h1 className="font-semibold">
              {user.name}
              {user.verified && (
                <MdVerified className="inline-block text-cyan-500" />
              )}
            </h1>
            <p className="text-gray-600 text-base">@{user.username}</p>
          </div>
        </div>
      </div>
      <Tabs tabs={tabs} />
    </Main>
  );
};

export default Settings;
