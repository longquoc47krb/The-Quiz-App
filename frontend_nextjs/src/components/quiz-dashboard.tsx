/* eslint-disable prettier/prettier */
/* eslint-disable unused-imports/no-unused-vars */
import type { NextPage } from 'next';

import type { Quiz } from '@/interfaces';

import QuizEntity from './quiz';

interface QuizProps {
  quizzes: Quiz[];
}

const QuizDashboard : NextPage<QuizProps> = ({ quizzes }) => {
  return <div className='w-full h-full flex flex-wrap justify-center'>
    {
      quizzes.map(({ id, title, questions, author, category }: Quiz) => (
        <QuizEntity  key={id} id={id} title={title} questions={questions} author={author} category={category}/>
      ))
    }
  </div>;
};



export default QuizDashboard;
