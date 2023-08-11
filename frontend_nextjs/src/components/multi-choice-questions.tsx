/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-key */
/* eslint-disable react/button-has-type */
import { countBy } from 'lodash';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CongratulationPic from '@/assets/images/200w.webp';
import { setCurrentQuestion } from '@/middlewares/slices/quizSessionSlice';
import { checkCorrectAnswer, checkOptionIsCorrectOrNot } from '@/utils';

import Countdown from './countdown';
import Modal from './modal';

function MultichoiceQuestion({
  title,
  options,
  answer,
  explain,
  time
}: {
  title: string;
  options: string[];
  answer: string;
  time: any;
  explain: string;
}) {
  const [selectOption, setSelectOption] = useState('');
  const [isCorrect, setIsCorrect] = useState([false, false, false, false]);
  const [isFinish, setIsFinish] = useState(false);
  const [isShowExplain, setIsShowExplain] = useState(false);
  const questions = useSelector((state) => state.quizSession.quiz.questions);
  const dispatch = useDispatch();
  const currenQuestion = useSelector(
    (state) => state.quizSession.currentQuestion,
  );
  const router = useRouter()
  const [yourAnswers, setYourAnswers] = useState<string[]>([]);
  const [startTime, setStartTime] = useState<number>(0);
  const [timer, setTimer] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const handleNextQuestion = () => {
    // Move to the next question and reset relevant states
    setSelectOption('');
    setIsCorrect([false, false, false, false]);
    setIsShowExplain(false);
    if (currenQuestion < questions.length - 1) {
      dispatch(setCurrentQuestion(currenQuestion + 1));
    }
    if(currenQuestion === questions.length - 1){
      setIsFinish(true);
      setModalIsOpen(true);
    }
  };
  console.log({yourAnswers})
  const handleAnswer = (
    e: React.MouseEvent<HTMLButtonElement>,
    index: number,
  ) => {
    const selected = e.currentTarget.value;
    setSelectOption(selected);
    setIsCorrect(checkCorrectAnswer(options, answer));
    setIsShowExplain(true);
    setTimeout(() => {
      handleNextQuestion();
    }, 1500);
  };
  const handleAddYourAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Create a new array with the updated options
    const updatedOptions = [...yourAnswers, {
      yourOption: e.currentTarget.value,
      correct: checkOptionIsCorrectOrNot(e.currentTarget.value, answer),
      answer, 
      time: Math.floor(timer / 1000) 
    }];

    // Update the state with the new array
    setYourAnswers(updatedOptions);
  };
  const handleFinish = () => {
    dispatch(setCurrentQuestion(0))
    setIsFinish(true)
    router.push('/')
  }
  const closeModal = () => {
    setModalIsOpen(false);
  };
  const validateClassName = (option: string, index: number) => {
    if (selectOption === option) {
      return isCorrect[index] ? 'correct-choice flicker' : 'incorrect-choice';
    }
    return isCorrect[index] ? 'correct-choice flicker' : '';
  };
  const numberCorrectAnswer = countBy(yourAnswers, 'correct').true || 0;
  console.log({numberCorrectAnswer})
  return (
    <div className="flex flex-col items-center justify-center">
      <h1>
        Question {currenQuestion + 1} of {questions?.length}
      </h1>
      <Countdown seconds={time} onCountdownComplete={handleNextQuestion}/>
   
      <h1 className="dark:text-gray-300">{title}</h1>
      <div className="grid grid-cols-2 gap-4 mt-4">
        {options.map((option, index) => (
          <button
            disabled={selectOption !== '' || isFinish}
            value={option}
            className={`option ${validateClassName(option, index)}`}
            onClick={(e) => {
              handleAnswer(e, index)
              handleAddYourAnswer(e);
            }}
          >
            {option}
          </button>
        ))}
      </div>
      {isShowExplain && (
        <div className="bg-gray-600 text-gray-900 rounded-lg p-4 mt-4 w-[50vw] fade-in">
          {explain}
        </div>
      )}
      {
        currenQuestion === questions?.length - 1 && <button className='bg-red-600 text-white px-4 py-2 rounded-md w-fit mt-4 hover:bg-red-700' onClick={handleFinish}>Finish</button>
      }
      <Modal isOpen={modalIsOpen} onClose={closeModal}>
        <img src={CongratulationPic.src} className='w-40 h-40 mx-auto'/>
        <h2>Result</h2>
        <p>Correct: {numberCorrectAnswer}/{questions?.length}</p>
      </Modal>
    </div>
  );
}

export default MultichoiceQuestion;
