/* eslint-disable no-inner-declarations */
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchQuizById } from "../apis/quizServices";

const MultiQuestions = () => {
  const { quizId } = useParams();
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [yourAnswer, setYourAnswer] = useState<string>("");
  const [showScore, setShowScore] = useState(false);
  const [quiz, setQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchQuiz() {
      const response: any = await fetchQuizById(String(quizId));
      setQuiz(response);
    }
    fetchQuiz();
  }, []);
  // handle score
  useEffect(() => {
    if (yourAnswer === quiz?.questions[currentQuestionIndex].correctOption) {
      setScore(1000);
    }
  }, [currentQuestionIndex]);
  console.log(
    "test:",
    yourAnswer === quiz?.questions[currentQuestionIndex].correctOption
  );
  console.log("score:", score);
  const handleOptionSelect = (optionIndex: any) => {
    setSelectedOption(optionIndex);
    setTimeout(() => {
      const isCorrect =
        optionIndex === quiz.questions[currentQuestionIndex].correctIndex;
      setShowScore(true);
      if (isCorrect) {
        setScore(score + 1);
      }
      setTimeout(() => {
        setSelectedOption(null);
        setShowScore(false);
        if (currentQuestionIndex + 1 < quiz.questions.length) {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
          // End of the quiz
        }
      }, 1000);
    }, 1000);
  };
  const checkAnswer = (answer: string) => {
    if (answer === quiz?.questions[currentQuestionIndex].correctOption) {
      return true;
    }
    return false;
  };
  return (
    <div>
      <p className="text-white font-bold">Score: {score}</p>
      <div>
        <h2 className="text-gray-200 font-semibold text-xl text-center">
          Question {currentQuestionIndex + 1}:
          <span className="text-yellow-500 ml-4">
            {quiz?.questions[currentQuestionIndex].text}
          </span>
        </h2>
        <ul className="question-container">
          {quiz?.questions[currentQuestionIndex].options.map(
            (question: any, index: number) => {
              const isCorrect =
                question === quiz.questions[currentQuestionIndex].correctOption;
              const isSelected = selectedOption === question;
              let className = "answer";
              if (isSelected) {
                className += " selected";
              }
              if (showScore) {
                className += !isSelected
                  ? checkAnswer(question)
                    ? " correct"
                    : ""
                  : isCorrect
                  ? " correct"
                  : " incorrect";
              }
              return (
                <li
                  className={className}
                  key={index}
                  onClick={() => {
                    handleOptionSelect(question);
                    setYourAnswer(question);
                  }}
                >
                  {question}
                </li>
              );
            }
          )}
        </ul>
      </div>
    </div>
  );
};

export default MultiQuestions;
