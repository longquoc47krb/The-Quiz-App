/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable prettier/prettier */
/* eslint-disable unused-imports/no-unused-vars */
import { Splide } from '@splidejs/react-splide';
import { useMediaQuery } from '@uidotdev/usehooks';
import { isArray } from 'lodash';
import type { NextPage } from 'next';
import { useState } from 'react';

import { useAuth } from '@/hooks/useAuthContext';
import type { Quiz } from '@/interfaces';

import { CustomPopover } from './pop-over';
import QuizEntity from './quiz';
import ResultItemWrap from './splide';

interface QuizProps {
  quizzes: Quiz[];
}

const QuizDashboard : NextPage<QuizProps> = ({ quizzes }) => {
  const {user} = useAuth()
  const [topics, setTopics] = useState([])
  const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");
  const quizzesArray = quizzes.filter(q => q.authorId !== user?.id);
  const reversedArray = isArray(quizzesArray)
  ? quizzesArray.map((_, index, array) => array[array.length - 1 - index])
  : [];

  const filteredQuizzesByCategory = topics.length > 0 ? reversedArray.filter((quiz) =>
  topics.some((category) => category === quiz.category) 
) : reversedArray;
  return <div>
     { quizzesArray.length > 0 && <div>
       <div className="flex items-center gap-x-2">
         <h1 className="m-4 text-2xl dark:text-gray-400 text-primary-900 font-medium section">Discover</h1>
         <CustomPopover onSelectTopic={setTopics}/>
       </div>
       <Splide options={{start:0, perPage: isSmallDevice ? 1 : 3, gap: "1rem" , width: isSmallDevice ? '90vw' : 'calc(100vw - 8rem)', arrows: false, height: "100%"}} tag="div" style={{paddingTop: "1em", paddingLeft: 8}}>
        {
          filteredQuizzesByCategory.map((props: Quiz) => (
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
