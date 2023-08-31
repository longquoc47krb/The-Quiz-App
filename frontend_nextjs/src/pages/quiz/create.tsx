import React from 'react';

import { VerificationModal } from '@/components/dialog/verification-alert-modal';
import CreateQuizForm from '@/components/quiz/createQuiz';
import { useAuth } from '@/hooks/useAuthContext';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

const CreateNewQuiz: React.FC = () => {
  const { user } = useAuth();
  const isVerified = user?.verified;
  return (
    <Main meta={<Meta title="Create new quiz" description="Create new quiz" />}>
      <div className="flex justify-center items-center">
        {isVerified ? (
          <CreateQuizForm />
        ) : (
          <VerificationModal isVerification={isVerified} />
        )}
      </div>
    </Main>
  );
};

export default CreateNewQuiz;
