import React, { useEffect, useState } from "react";
import { fetchQuizById, useFetchQuizzes } from "../apis/quizServices";
import { Quiz } from "../interfaces";
import MultipleChoiceQuestion from "../sections/MutiQuestions";
import { useParams } from "react-router-dom";
import { fetchQuestionById } from "../apis/questionServices";

const QuizPage = () => {
  const { quizId } = useParams();
  const [quiz, setQuiz] = useState(null);
  useEffect(() => {
    async function fetchQuestionById() {
      const response: any = await fetchQuizById(String(quizId));
      setQuiz(response);
    }
    fetchQuestionById();
  }, []);
  return (
    <div>
      <h1 className="text-white font-bold">{quiz?.name}</h1>
      <MultipleChoiceQuestion />
    </div>
  );
};

export default QuizPage;
