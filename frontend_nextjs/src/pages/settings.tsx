// pages/profile.js
import React, { useState } from 'react';
import { MdVerified } from 'react-icons/md';

import Tabs from '@/components/tabs';
import withAuth from '@/hocs/withAuth';
import { useAuth } from '@/hooks/useAuthContext';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

const Settings = () => {
  const tabs = ['Achievements', 'Settings'];
  const [currentTab, setCurrentTab] = useState(0);
  const { user } = useAuth();
  const handleSwitchTab = (tab) => {
    setCurrentTab(tab);
  };
  return (
    <Main meta={<Meta title="Profile" description="Profile user" />}>
      <div className="text-gray-300 m-4">
        <div className="flex items-center gap-x-4">
          <img
            src={user?.avatar}
            alt="Avatar"
            className="w-24 h-24 rounded-full border-2 border-gray-500"
          />
          <div>
            <h1 className="font-semibold">
              {user?.name}
              {user?.verified && (
                <MdVerified className="inline-block text-cyan-500" />
              )}
            </h1>
            <p className="text-gray-600 text-base">@{user?.username}</p>
          </div>
        </div>
      </div>
      <Tabs tabs={tabs} onSwitchTab={handleSwitchTab}>
        {currentTab === 0 ? <p>Achievements</p> : <p>Settings</p>}
      </Tabs>
    </Main>
  );
};

export default withAuth(Settings);
