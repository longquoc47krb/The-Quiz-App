import React from "react";
import { useFetchQuizzes } from "../apis/quizServices";
import { Quiz } from "../interfaces";
import MultipleChoiceQuestion from "../sections/MutiQuestions";
import { useParams } from "react-router-dom";

const QuizPage = () => {
  const { quizId } = useParams();
  const { data, isLoading } = useFetchQuizzes();
  const quiz =
    !isLoading &&
    data?.find(function (quiz: Quiz) {
      return quiz.id === Number(quizId);
    });
  return (
    <div>
      <h1 className="text-white font-bold">{quiz.name}</h1>
      <MultipleChoiceQuestion quiz={quiz} />
    </div>
  );
};

export default QuizPage;
