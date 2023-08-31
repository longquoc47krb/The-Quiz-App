import { Dialog, DialogContent, DialogTitle } from '@radix-ui/react-dialog';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { DialogFooter, DialogHeader } from '../dialog';

export const VerificationModal = (isVerification) => {
  const [isModalOpen, setIsModalOpen] = useState(isVerification !== true);
  const router = useRouter();
  const handleCloseModal = () => {
    router.push('/');
  };
  const redirectToVerificationPage = () => {
    router.push('/verification');
  };
  return (
    <Dialog open={isModalOpen}>
      <DialogContent className="dark:bg-primary-900 dark:text-primary-text p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            🔒 Attention: Verified Account Required 🔒
          </DialogTitle>
        </DialogHeader>
        <div className="font-normal text-lg text-left px-8">
          <br />
          To proceed, please verify your account by clicking
          <strong> OK</strong>. <br />
          You will be securely redirected to the 'verification page. Thank you
          for your cooperation.
        </div>
        <DialogFooter className="dark:bg-transparent px-6 py-4">
          <button
            className="bg-primary-500 rounded-lg dark:text-primary-text dark:hover:bg-primary-800 font-bold px-4 py-2 text-center"
            onClick={redirectToVerificationPage}
          >
            OK
          </button>
          <button
            className="bg-red-600 rounded-lg dark:text-primary-text dark:hover:bg-red-800 font-bold px-4 py-2 text-center"
            onClick={handleCloseModal}
          >
            Cancel
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
