import React, { useState, useEffect } from "react";
import { fetchQuestionById } from "../apis/questionServices";
import { useParams } from "react-router-dom";
import { fetchQuizById } from "../apis/quizServices";
import { Question, Quiz } from "../interfaces";

interface MultiQuestionsProps {
  quiz: Quiz;
}

const MultiQuestions: React.FC<MultiQuestionsProps> = ({ quiz }) => {
  const { quizId } = useParams();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [currentQuestion, setCurrentQuestion] = useState<Question>();
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>(
    Array(quiz?.questions.length).fill(null)
  );
  console.log({ userAnswers, currentQuestion });
  const [showCorrectAnswer, setShowCorrectAnswer] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const handleAnswer = (questionIndex: number, optionIndex: number) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[questionIndex] = optionIndex;
    setUserAnswers(updatedAnswers);
    setShowCorrectAnswer(true);
    calculateScore();
    setTimeout(() => {
      moveToNextQuestion();
    }, 3000);
  };
  const calculateScore = () => {
    let newScore = 0;

    for (let i = 0; i < quiz.questions.length; i++) {
      if (userAnswers[i] === quiz.questions[i].correctOption) {
        newScore++;
      }
    }
    setScore(newScore);
  };
  const moveToNextQuestion = () => {
    const nextQuestionIndex = currentQuestionIndex + 1;
    console.log({ nextQuestionIndex, currentQuestionIndex });
    if (nextQuestionIndex < quiz.questions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
      setShowCorrectAnswer(false);
    } else {
      // All questions answered, you can perform any necessary actions here
    }
  };
  const questions = quiz?.questions;
  const currentQuestionId = questions[currentQuestionIndex];
  useEffect(() => {
    async function fetchQuestion() {
      const response = await fetchQuestionById(currentQuestionId);
      setCurrentQuestion(response);
    }
    fetchQuestion();
  }, [currentQuestionIndex]);
  return (
    <div>
      <p className="text-white font-bold">Score: {score}</p>
      {currentQuestion && (
        <div className="text-center">
          <h3 className="text-gray-100">
            Question {currentQuestionIndex + 1}:
          </h3>
          <p className="text-yellow-300 text-2xl">{currentQuestion.content}</p>
          <ul className="question-container">
            {currentQuestion.options.map((option, index) => {
              const isCorrectOption = currentQuestion.correctOption === index;
              const isSelectedOption =
                userAnswers[currentQuestionIndex] === index;
              const optionClassName = isSelectedOption
                ? isCorrectOption
                  ? "answer correct"
                  : "answer incorrect"
                : "answer";
              return (
                <li
                  key={index}
                  onClick={() => handleAnswer(currentQuestionIndex, index)}
                  className={optionClassName}
                >
                  {option}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MultiQuestions;
