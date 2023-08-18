/* eslint-disable react/button-has-type */
import React from 'react';
import { useDispatch } from 'react-redux';

import { useAuth } from '@/hooks/useAuthContext';
import type { Quiz } from '@/interfaces';
import { isStart, setQuizSession } from '@/middlewares/slices/quizSessionSlice';
import { convertSecondsToMinutesAndSeconds } from '@/utils';

function QuizStartForm({
  quizData,
  onClose,
}: {
  quizData: Quiz;
  onClose: any;
}) {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const time = convertSecondsToMinutesAndSeconds(
    15 * quizData.questions?.length,
  );
  return (
    <div className="rounded-lg cursor-pointer p-4 h-[15rem] w-50 flex flex-col justify-between mr-4 text-sky-600 dark:text-violet-400 bg-violet-400/10">
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
          onClose();
        }}
      >
        Start
      </button>
    </div>
  );
}

export default QuizStartForm;
