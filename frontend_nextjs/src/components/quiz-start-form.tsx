/* eslint-disable react/button-has-type */
import React from 'react';
import { useDispatch } from 'react-redux';

import useAuth from '@/hooks/useAuth';
import type { Quiz } from '@/interfaces';
import { isStart, setQuizSession } from '@/middlewares/slices/quizSessionSlice';
import { convertSecondsToMinutesAndSeconds } from '@/utils';

function QuizStartForm({ quizData }: { quizData: Quiz }) {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const time = convertSecondsToMinutesAndSeconds(
    15 * quizData.questions?.length,
  );
  return (
    <div className="w-full h-full flex justify-center items-start">
      <div className="bg-gray-500 p-4 rounded-sm w-[20rem] text-center mt-10">
        <h1 className="font-bold text-2xl">{quizData.title}</h1>
        <p>
          {quizData.questions?.length} questions Time: {time}
        </p>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white text-center px-4 py-2 rounded-md"
          onClick={() => {
            dispatch(isStart(true));
            dispatch(
              setQuizSession({
                id: null,
                user,
                quiz: quizData,
                startTime: new Date(),
                endTime: null,
              }),
            );
            localStorage.setItem(
              'countdownTimeLeft',
              15 * quizData.questions?.length,
            );
          }}
        >
          Start
        </button>
      </div>
    </div>
  );
}

export default QuizStartForm;
