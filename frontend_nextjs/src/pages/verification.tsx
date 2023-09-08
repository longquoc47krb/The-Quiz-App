import React, { useState } from 'react';
import { GoUnverified } from 'react-icons/go';
import { MdVerified } from 'react-icons/md';

import { sendVerifyEmail } from '@/apis/authServices';
import withAuth from '@/hocs/withAuth';
import { useAuth } from '@/hooks/useAuthContext';
import { Meta } from '@/layouts/Meta';
import { ProfileLayout } from '@/templates/ProfileLayout';

function VerficationPage() {
  const { user } = useAuth();
  const [sentMessage, setSentMessage] = useState(null);
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
  const handleVerifyAccount = async () => {
    await sendVerifyEmail(user?.email);
    setSentMessage('Verification email sent');
  };
  return (
    <ProfileLayout
      meta={<Meta title="Verification | Quizaholic" description="Verification" />}
    >
      <h1 className="p-4 rounded-xl bg-darkBlack/20 max-w-[calc(100vw-20rem)] drop-shadow-md flex items-center justify-between">
        <span>My account status: {renderVerificationStatus(isVerified)} </span>
        {!isVerified && (
          <button
            type="button"
            className="bg-green-500 px-4 py-2 rounded-lg w-fit text-xs font-semibold text-green-900 border-2 border-green-900 hover:bg-green-700 hover:text-green-500 drop-shadow-md"
            onClick={handleVerifyAccount}
          >
            Verify account
          </button>
        )}
      </h1>
      {sentMessage && <p className="text-green-500 mt-4">{sentMessage}</p>}
    </ProfileLayout>
  );
}

export default withAuth(VerficationPage);
