import React from 'react';
import { MdEmail } from 'react-icons/md';

import withAuth from '@/hocs/withAuth';
import { useAuth } from '@/hooks/useAuthContext';
import { Meta } from '@/layouts/Meta';
import { ProfileLayout } from '@/templates/ProfileLayout';

function Profile() {
  const { user } = useAuth();
  return (
    <ProfileLayout
      meta={
        <Meta title={`${user?.name} | Quizaka`} description="User profile" />
      }
    >
      <div className="w-full flex justify-center">
        <div className="w-3/4 bg-darkBlack/50 px-4 rounded-3xl p-4">
          <div className="p-4 mb-4 border-b border-b-gray-700/10">
            <img src={user.avatar} className="rounded-full w-24 h-24 mx-auto" />
            <div className="grid grid-cols-2 justify-start">
              <h1 className="text-left text-gray-200">{user.name}</h1>
              <h2 className="text-left text-gray-700 text-base">
                @{user.username}
              </h2>
              <div className="flex items-center justify-center gap-x-2">
                <MdEmail />
                <span className="text-base">{user.email}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProfileLayout>
  );
}

export default withAuth(Profile);
