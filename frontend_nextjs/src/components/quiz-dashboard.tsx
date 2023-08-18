/* eslint-disable prettier/prettier */
/* eslint-disable unused-imports/no-unused-vars */
import type { NextPage } from 'next';

import type { Quiz } from '@/interfaces';

import QuizEntity from './quiz';

interface QuizProps {
  quizzes: Quiz[];
}

const QuizDashboard : NextPage<QuizProps> = ({ quizzes }) => {
  return <div>
     { quizzes.length > 0 && <div>
       <h1 className="m-4 text-2xl text-gray-400 font-medium">Discover</h1>
           <div className='m-4 w-screen h-full grid grid-cols-[24rem_24rem_24rem] gap-4'>
        {
          quizzes.map((props: Quiz) => (
            <QuizEntity  key={props.id} {...props}/>
          ))
        }
           </div>
     </div>}
  </div>;
};



export default QuizDashboard;
