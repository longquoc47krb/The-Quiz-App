/* eslint-disable prettier/prettier */
/* eslint-disable unused-imports/no-unused-vars */
import { Splide } from '@splidejs/react-splide';
import { isArray } from 'lodash';
import type { NextPage } from 'next';

import { useAuth } from '@/hooks/useAuthContext';
import type { Quiz } from '@/interfaces';

import QuizEntity from './quiz';
import ResultItemWrap from './splide';

interface QuizProps {
  quizzes: Quiz[];
}

const QuizDashboard : NextPage<QuizProps> = ({ quizzes }) => {
  const {user} = useAuth()
  const filteredQuizzes = quizzes.filter(q => q.authorId !== user?.id)
  const reversedArray = isArray(filteredQuizzes)
  ? filteredQuizzes.map((_, index, array) => array[array.length - 1 - index])
  : [];
  return <div>
     { filteredQuizzes.length > 0 && <div>
       <h1 className="m-4 text-2xl text-gray-400 font-medium section">Discover</h1>
       <Splide options={{start:0, perPage: 3, gap: "1rem" , width: 'calc(100vw - 8rem)', arrows: false, height: "100%"}} tag="div" style={{paddingTop: "1em", paddingLeft: 8}}>
        {
          reversedArray.map((props: Quiz) => (
            <ResultItemWrap>
            <QuizEntity  key={props.id} {...props}/>
            </ResultItemWrap>
          ))
        }
           </Splide>
     </div>}
  </div>;
};



export default QuizDashboard;
