/* eslint-disable prettier/prettier */
import { usePrevious } from "@uidotdev/usehooks";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { ScoreMax, ScoreMin,ScorePenalty, Tmax } from "@/common/constants";
import type { Question } from "@/interfaces";
import {
  clearStreak,
  increaseStreak,
  pushToResults,
  setScore,
  timePerQuestionSelector,
} from "@/middlewares/slices/quizSessionSlice";
import { checkOptionIsCorrectOrNot } from "@/utils";

import QuizHelp from '../quiz-help.';




const MultiChoiceQuestions = ({
  question,
  selectOption,
  isFinish,
  isShowExplain,
  validateOptionClassName,
  handleAnswer,
}: {
  question: Question;
  selectOption: string;
  isFinish: boolean;
  isShowExplain: boolean;
  validateOptionClassName: any;
  handleAnswer: any;
}) => {
  const dispatch = useDispatch();
  const [showScore, setShowScore] = useState(false);
  const score = useSelector(state => state.quizSession.score);
  const prevScore = usePrevious(score);
  const timePerQuestion = useSelector(timePerQuestionSelector);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isIncorrect, setIsIncorrect] = useState(false);
  const streak = useSelector(state =>state.quizSession.streak)
  const handleCorrectAnswer = () => {
    dispatch(increaseStreak());
    let Bonus = 0;
    if((streak+1) % 5 === 0 && streak > 0) {
      Bonus += 1000;
    }
    let Score = 0;
    console.log({Bonus})
    console.log({streak})
    if(timePerQuestion <= Tmax) {
      Score = ScoreMax - ScorePenalty  * (timePerQuestion - 2 ) 
      console.log("Score:", prevScore + Score + Bonus)
      dispatch(setScore(prevScore + Score + Bonus))
    }  else {
      Score = ScoreMin
      console.log("Score:", prevScore + Score + Bonus)
      dispatch(setScore(prevScore + Score + Bonus))
    }
   
  };
  const handleWrongAnswer = () => {
    dispatch(clearStreak());
  }
  useEffect(()=>{
    if(isCorrect){
      handleCorrectAnswer()
    } if (isIncorrect) {
      handleWrongAnswer()
    }   
  },[isCorrect, isIncorrect])
  const handleAddYourAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    const isAnswerCorrect = checkOptionIsCorrectOrNot(
      e.currentTarget.value,
      question.correctOption
    );
    setIsCorrect(isAnswerCorrect);
    setIsIncorrect(!isAnswerCorrect)
    setShowScore(true);
    const updatedAnswer = {
      yourChoice: e.currentTarget.value,
      correct: isAnswerCorrect,
      answer: question.correctOption,
      options: question.options,
      time: timePerQuestion,
      title: question.text,
      picture: question.picture,
      explain: question.explain,
    };
    dispatch(pushToResults(updatedAnswer));
    setTimeout(()=>{
      setShowScore(false);
    },1000)
  };
  function handleScore(time: number, correct: boolean) {
    let Bonus = 0;
    if(streak % 5 === 0 && streak > 0) {
      Bonus += 1000
    }
    if(correct){
      if(time <= Tmax) {
        let Score = 0
        Score = ScoreMax - ScorePenalty  * (time - 2 ) + Bonus
        
        return Score 
      }  
        return ScoreMin + Bonus;
      
    }
    return 0;  
  }
  const scorePerQuestion = useMemo(() => handleScore(timePerQuestion, isCorrect), [isCorrect, streak, isIncorrect]);
  return (
    <div className="min-w-fit relative">
      {/* <QuizHelp/> */}
      <h1 className="text-right">Score: <span className="text-lime-500">{score}</span></h1>
      <h1 className="dark:text-gray-300 text-center">{question.text}</h1>
      { question.picture && <div className="flex justify-center w-full">
        <img src={question.picture} className="h-[30vh] border-2 border-gray-500" alt="question"/>
      </div>}
      <div className={`md:grid ${question.options.length === 3 ? "md:grid-cols-1" :"md:grid-cols-2"} md:gap-4 mt-4 flex flex-col gap-y-4 relative`}>
        {question.options.map((option, index: number) => (
          option !== "" && <button
            key={index}
            disabled={selectOption !== "" || isFinish}
            value={option}
            className={`option ${selectOption !== "" && validateOptionClassName(selectOption, option, question.correctOption)}`}
            onClick={(e) => {
              handleAnswer(e, index);
              handleAddYourAnswer(e);
            }}
            type="button"
          >
            {option}
          </button>
        ))}
         { showScore &&  <motion.h1
           initial={{ opacity: 0, x: 100}}
           animate={{ opacity: 1, x: 0}}
           transition={{ type: "keyframes", duration: 0.5 }}
          className={`${handleScore(timePerQuestion, isCorrect) > 0 ? "text-lime-500" :  "text-red-500"} px-4 py-2 rounded-2xl text-right font-bold w-full text-2xl absolute -top-10 right-0 glitch`}
               >
          +{scorePerQuestion}
          </motion.h1>}
          {isShowExplain && streak % 5 === 0  &&  (
        <motion.h1
        initial={{ opacity: 0, scale: 1}}
        animate={{ opacity: 1, scale: [1.05, 1, 1.05, 1, 1.05, 1, 1.05, 1, 1, 1.05, 1, 1.05, 1]}}
        transition={{ type: "keyframes", duration: 1 }} 
        className="flex justify-start text-2xl text-amber-500 drop-shadow-lg drop-shadow-black">
          Streak {streak}
        </motion.h1>
      )}
      </div>
      {isShowExplain && (
        <div className="bg-gray-600 text-gray-900 rounded-lg p-4 mt-4 w-full fade-in flex justify-center">
          {question.explain}
        </div>
      )}
    </div>
  );
};

export default MultiChoiceQuestions;
