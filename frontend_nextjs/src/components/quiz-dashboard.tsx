/* eslint-disable prettier/prettier */
/* eslint-disable unused-imports/no-unused-vars */
import type { NextPage } from 'next';

import type { Quiz } from '@/interfaces';

import QuizEntity from './quiz';

interface QuizProps {
  quizzes: Quiz[];
}

const QuizDashboard : NextPage<QuizProps> = ({ quizzes }) => {
  return <div className='m-4 w-full h-full flex flex-wrap justify-start'>
    {
      quizzes.map((props: Quiz) => (
        <QuizEntity  key={props.id} {...props}/>
      ))
    }
  </div>;
};



export default QuizDashboard;
