import React from 'react';
import { GoUnverified } from 'react-icons/go';
import { MdVerified } from 'react-icons/md';

import withAuth from '@/hocs/withAuth';
import { useAuth } from '@/hooks/useAuthContext';
import { Meta } from '@/layouts/Meta';
import { ProfileLayout } from '@/templates/ProfileLayout';

function VerficationPage() {
  const { user } = useAuth();
  const isVerified = user?.verified;
  const renderVerificationStatus = (verified: boolean) => {
    if (verified) {
      return (
        <span className="text-lime-500">
          Verified <MdVerified className="inline-block mb-2" />
        </span>
      );
    }
    return (
      <span className="text-orange-600">
        Unverified <GoUnverified className="inline-block mb-2" />
      </span>
    );
  };
  return (
    <ProfileLayout
      meta={
        <Meta title="Update password | Quizaka" description="Update password" />
      }
    >
      <h1 className="p-4 rounded-xl bg-darkBlack/20 max-w-[calc(100vw-20rem)] drop-shadow-md">
        My account status: {renderVerificationStatus(isVerified)}
      </h1>
    </ProfileLayout>
  );
}

export default withAuth(VerficationPage);
