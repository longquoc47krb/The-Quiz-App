import { useRouter } from 'next/router';
import React, { useState } from 'react';

import Modal from '@/components/modal';
import CreateQuizForm from '@/components/quiz/createQuiz';
import { useAuth } from '@/hooks/useAuthContext';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

const CreateNewQuiz: React.FC = () => {
  const { user } = useAuth();
  const isVerified = user?.verified;
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(!isVerified);
  const handleCloseModal = () => {
    setModalOpen(false);
    router.push('/');
  };
  return (
    <Main meta={<Meta title="Create new quiz" description="Create new quiz" />}>
      <div className="flex justify-center items-center">
        {isVerified ? (
          <CreateQuizForm />
        ) : (
          <Modal isOpen={modalOpen} onClose={handleCloseModal}>
            <div>
              <div className="w-full min-h-[10rem] p- rounded-lg text-active flex items-center justify-center">
                <p className="font-semibold">
                  🔒 Attention: Verified Account Required 🔒
                  <span className="font-normal text-lg">
                    <br />
                    To proceed, please verify your account by clicking{' '}
                    <strong>OK</strong>. <br />
                    You will be securely redirected to the 'verification page.'
                    Thank you for your cooperation.
                  </span>
                </p>
              </div>
              <div className="flex justify-center items-center gap-x-2">
                <button
                  className="bg-darkPrimary rounded-lg dark:text-gray-500 dark:hover:bg-primary font-bold px-4 py-2 text-center"
                  onClick={() => router.push('/verification')}
                >
                  OK
                </button>
                <button
                  className="bg-red-600 rounded-lg dark:text-gray-500 dark:hover:bg-red-800 font-bold px-4 py-2 text-center"
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </Main>
  );
};

export default CreateNewQuiz;
