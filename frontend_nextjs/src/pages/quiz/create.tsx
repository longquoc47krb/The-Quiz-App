import React from 'react';

import CreateQuizForm from '@/components/quiz/createQuiz';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

const CreateNewQuiz: React.FC = () => {
  return (
    <Main meta={<Meta title="Create new quiz" description="Create new quiz" />}>
      <div className="flex justify-center items-center">
        <CreateQuizForm />
      </div>
    </Main>
  );
};

export default CreateNewQuiz;
