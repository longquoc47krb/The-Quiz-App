import React from 'react';

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
      <h1>Profile</h1>
    </ProfileLayout>
  );
}

export default withAuth(Profile);
