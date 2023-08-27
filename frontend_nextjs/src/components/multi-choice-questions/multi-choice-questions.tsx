/* eslint-disable prettier/prettier */
import { usePrevious } from "@uidotdev/usehooks";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { ScoreMax, ScoreMin,ScorePenalty, Tmax } from "@/common/constants";
import type { Question } from "@/interfaces";
import {
  pushToResults,
  setScore,
  setStreak,
  timePerQuestionSelector,
} from "@/middlewares/slices/quizSessionSlice";
import { checkOptionIsCorrectOrNot } from "@/utils";




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
    dispatch(setStreak(streak + 1));
    if(timePerQuestion <= Tmax) {
      let Score = 0;
      Score = ScoreMax - ScorePenalty  * timePerQuestion
      // if(streak % 5 === 0 && streak > 0) {
      //   Score += 1000;
      // }
      dispatch(setScore(prevScore + Score))
    }  else {
      let Score = 0;
      Score = ScoreMin;
      dispatch(setScore(prevScore + Score))
    }
   
  };

  const handleIncorrectAnswer = () => {
    dispatch(setStreak(0));
  };
  useEffect(()=>{
    if(isCorrect){
      handleCorrectAnswer()
    } if (isIncorrect) {
      handleIncorrectAnswer()
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
    if(correct){
      if(time <= Tmax) {
        let Score = 0
        Score = ScoreMax - ScorePenalty  * time
        // if(streak % 4 === 0 && streak > 0) {
        //   Score *= (1 + 5 / 100);
        // }
        return Score
      }  
        return ScoreMin;
      
    }
    return 0;  
  }
  const scorePerQuestion = useMemo(() => handleScore(timePerQuestion, isCorrect), [isCorrect]);
  return (
    <>
   
      <h1 className="text-right">Score: <span className="text-lime-500">{score}</span></h1>
      <h1 className="dark:text-gray-300 text-center">{question.text}</h1>
      { question.picture && <div className="flex justify-center w-full">
        <img src={question.picture} className="h-[30vh] border-2 border-gray-500" alt="question"/>
      </div>}
      <div className={`md:grid ${question.options.length === 3 ? "md:grid-cols-1" :"md:grid-cols-2"} md:gap-4 mt-4 flex flex-col gap-y-4`}>
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
      </div>
      {isShowExplain && (
        <div className="bg-gray-600 text-gray-900 rounded-lg p-4 mt-4 w-full fade-in flex justify-center">
          {question.explain}
        </div>
      )}
       { showScore &&  <motion.h1
           initial={{ opacity: 0, x: 100, y: -350}}
           animate={{ opacity: 1, x: 0, y: -350}}
           transition={{ type: "keyframes", duration: 0.5 }}
          className={`${handleScore(timePerQuestion, isCorrect) > 0 ? "text-lime-500" :  "text-red-500"} px-4 py-2 rounded-2xl text-right font-bold w-full text-2xl`}
               >
          +{scorePerQuestion}
          </motion.h1>}
    
    </>
  );
};

export default MultiChoiceQuestions;
