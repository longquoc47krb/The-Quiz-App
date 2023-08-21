/* eslint-disable prettier/prettier */
import { usePrevious } from "@uidotdev/usehooks";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { ScoreMax, ScoreMin,ScorePenalty, Tmax } from "@/common/constants";
import type { Question } from "@/interfaces";
import {
  pushToResults,
  setScore,
  timePerQuestionSelector,
} from "@/middlewares/slices/quizSessionSlice";
import { checkOptionIsCorrectOrNot } from "@/utils";

const MultiChoiceQuestions = ({
  question,
  selectOption,
  isFinish,
  isShowExplain,
  validateClassName,
  handleAnswer,
}: {
  question: Question;
  selectOption: string;
  isFinish: boolean;
  isShowExplain: boolean;
  validateClassName: any;
  handleAnswer: any;
}) => {

  const dispatch = useDispatch();
  const [showScore, setShowScore] = useState(false);
  const score = useSelector(state => state.quizSession.score);
  const prevScore = usePrevious(score);
  const [scorePerQuestion, setScorePerQuestion] = useState(0);
  const timePerQuestion = useSelector(timePerQuestionSelector);
  const [isCorrect, setIsCorrect] = useState(false);
  useEffect(()=>{
    if(isCorrect){
      if(timePerQuestion <= Tmax) {
        const Score = ScoreMax - ScorePenalty  * timePerQuestion
        dispatch(setScore(prevScore + Score))
        setScorePerQuestion(Score);
      }  else {
        const Score = ScoreMin;
        dispatch(setScore(prevScore + Score))
        setScorePerQuestion(Score);
      }
      setScorePerQuestion(0);
    }    
  },[isCorrect])
  const handleAddYourAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    const isAnswerCorrect = checkOptionIsCorrectOrNot(
      e.currentTarget.value,
      question.correctOption
    );
    setIsCorrect(isAnswerCorrect);
    setShowScore(true);
    const updatedAnswer = {
      yourChoice: e.currentTarget.value,
      correct: isAnswerCorrect,
      answer: question.correctOption,
      options: question.options,
      time: timePerQuestion,
      title: question.text,
      explain: question.explain,
    };
    dispatch(pushToResults(updatedAnswer));
    setTimeout(()=>{
      setShowScore(false);
    },2500)
  };
  function handleScore(time: number, correct: boolean) {
    if(correct){
        return scorePerQuestion
    }
    return 0;  
  }
  return (
    <>
      <h1 className="text-right">Score: <span className="text-lime-500">{score}</span></h1>
      <h1 className="dark:text-gray-300 text-center">{question.text}</h1>
      <div className="md:grid md:grid-cols-[30vw_30vw] md:justify-center md:gap-4 md:mt-4 md:items-start flex flex-col gap-y-4 items-center">
        {question.options.map((option, index) => (
          <button
            key={index}
            disabled={selectOption !== "" || isFinish}
            value={option}
            className={`option ${validateClassName(option, index)}`}
            onClick={(e) => {
              handleAnswer(e, index);
              handleAddYourAnswer(e);
            }}
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
       {showScore &&  <h1
        className={`${handleScore(timePerQuestion, isCorrect) > 0 ? "text-lime-500" : "text-red-600"} text-center showScore font-bold `}
      >
        +{handleScore(timePerQuestion, isCorrect)}
      </h1>}
    </>
  );
};

export default MultiChoiceQuestions;
