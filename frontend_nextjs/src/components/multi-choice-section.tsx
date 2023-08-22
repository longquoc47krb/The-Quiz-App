/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-plusplus */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-key */
/* eslint-disable react/button-has-type */
import { usePrevious } from '@uidotdev/usehooks';
import { countBy } from 'lodash';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { createResult } from '@/apis/resultServices';
import CongratulationPic from '@/assets/images/200w.webp';
import { congratSound, correctSound, incorrectSound } from '@/common/sounds';
import type { Quiz } from '@/interfaces';
import { isStart, pushToResults, setCurrentQuestion, setEndTime, setQuizSession, setTimePerQuestion, timePerQuestionSelector } from '@/middlewares/slices/quizSessionSlice';
import { checkCorrectAnswer, checkOptionIsCorrectOrNot, renderCorrectRatio,  } from '@/utils';

import SlideAnimation from './animation/slider';
import Countdown from './countdown';
import Modal from './modal';
import MultiChoiceQuestions from './multi-choice-questions/multi-choice-questions';

function MultichoiceQuestionSection({
  quiz,
  currentQuestion
}: {
  quiz: Quiz,
  currentQuestion: number
}) {

  
  const time = 10 * quiz?.questions?.length

  const timePerQuestion = useSelector(timePerQuestionSelector);
  const [selectOption, setSelectOption] = useState('');
  const [isCorrect, setIsCorrect] = useState([false, false, false, false]);
  const [isFinish, setIsFinish] = useState(false);
  const [isFillMissing, setIsFillMissing] = useState(false)
  const [isShowExplain, setIsShowExplain] = useState(false);
  const questions = useSelector((state) => state.quizSession.quiz.questions);
  const dispatch = useDispatch();
  const results = useSelector(state => state.quizSession.results)
  const previousQuestion = usePrevious(currentQuestion);
  const user = useSelector(state => state.quizSession.user);
  const startTime = useSelector(state => state.quizSession.startTime);
  const endTime = useSelector(state => state.quizSession.endTime);
  const router = useRouter()
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const numberCorrectAnswer = countBy(results, 'correct').true || 0;
  async function submitResult(){
    await createResult({
            player_id: user.id,
            quiz_id: quiz.id,
            startTime: new Date(startTime),
            endTime: new Date(endTime),
            result: results
    })
  }
  useEffect(()=> {
    if(isFillMissing){
      submitResult()
    }
  },[isFillMissing])
  useEffect(()=>{
    if(isFinish){
      const questionsLength = quiz?.questions?.length || 0;

      if (results.length !== questionsLength) {
      const diff = questionsLength - results.length;

      for (let i = 0; i < diff; i++) {
      const newQuestionIndex = results.length + i;
      const newQuestion = quiz?.questions?.[newQuestionIndex];
      
      if (newQuestion) {
        const { correctOption, options, text, explain } = newQuestion;
        
        dispatch(pushToResults({
          yourChoice: '',
          correct: false,
          answer: correctOption,
          options,
          time: 0,
          title: text,
          explain
        }));
        }
      }
    } 
    setIsFillMissing(true)     
    }
  },[isFinish])
  // end sound
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(setTimePerQuestion(timePerQuestion + 1)); // Dispatch the action to update timer
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [dispatch, timePerQuestion, currentQuestion]);
  const handleFinish = () => {
    if(!isFinish && !modalIsOpen)
    {
    dispatch(setEndTime(new Date()))
    setIsFinish(true) 
    setModalIsOpen(true);
    congratSound.play() 
    dispatch(setQuizSession(null))
    }   
  }
  const resetSelection = () => {
    setSelectOption('');
    setIsCorrect([false, false, false, false]);
    setIsShowExplain(false);
    dispatch(setTimePerQuestion(0))
  }
  const resetQuizSession = () => {
    dispatch(setCurrentQuestion(0))
    dispatch(isStart(false));
  }
  const handleNextQuestion = () => {
    // Move to the next question and reset relevant states
    
    const lastQuestionIndex = questions.length - 1;
    if (currentQuestion < lastQuestionIndex) {
      resetSelection()
      dispatch(setCurrentQuestion(currentQuestion + 1));
    } else if (currentQuestion === lastQuestionIndex) {
      handleFinish()
    }
  };
  // console.log({yourAnswers})
  const handleAnswer = (e: React.MouseEvent<HTMLButtonElement>,
    index: number,
  ) => {
    const selected = e.currentTarget.value;
    setSelectOption(selected);
    const isAnswerCorrect = checkCorrectAnswer(quiz?.questions[currentQuestion]?.options, quiz?.questions[currentQuestion]?.correctOption)
    setIsCorrect(isAnswerCorrect);
    setIsShowExplain(true);
    if (checkOptionIsCorrectOrNot(selected, quiz?.questions[currentQuestion]?.correctOption)) {
      const randomIndex = Math.floor(Math.random() * correctSound.length);
      const randomSound = correctSound[randomIndex];
      randomSound.play();

    } else {
      const randomIndex = Math.floor(Math.random() * incorrectSound.length);
      const randomSound = incorrectSound[randomIndex];
      randomSound.play();

    }
    setTimeout(()=>{
      handleNextQuestion()
    },1800)
  }
 
  const redirectToHome = ()=>{
    resetQuizSession()
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
  
  const correctRatio = numberCorrectAnswer/questions?.length;
  return (
    <div className="flex flex-col items-center justify-center relative">
      <h1>
        Question {currentQuestion + 1} of {questions?.length}
      </h1>
      <Countdown seconds={time} onCountdownComplete={handleFinish}/>
      <SlideAnimation
              direction={currentQuestion > previousQuestion ? 1 : -1}
              currentPage={currentQuestion}
              className="mx-auto top-[10vh] w-[80vw]"
            >
          <MultiChoiceQuestions key={currentQuestion} question={quiz?.questions[currentQuestion]} isFinish={isFinish} isShowExplain={isShowExplain} selectOption={selectOption} handleAnswer={handleAnswer} validateClassName={validateClassName}/>

            </SlideAnimation>
      {
        isFinish && <button className='bg-red-600 text-white px-4 py-2 rounded-md w-fit mt-4 hover:bg-red-700 absolute top-[60vh]' onClick={redirectToHome}>Finish</button>
      }
      <Modal isOpen={modalIsOpen} onClose={closeModal}>
        <img src={CongratulationPic.src} className='w-40 h-40 mx-auto'/>
        <p className="text-2xl font-bold">Correct: {numberCorrectAnswer}/{questions?.length} <br/>
        <span className={renderCorrectRatio(correctRatio * 100)}>{correctRatio * 100}%</span></p>
      </Modal>
    </div>
  );
}

export default MultichoiceQuestionSection;
