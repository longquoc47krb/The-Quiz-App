import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchQuizById } from "../apis/quizServices";
import MultipleChoiceQuestion from "../sections/MutiQuestions";

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
