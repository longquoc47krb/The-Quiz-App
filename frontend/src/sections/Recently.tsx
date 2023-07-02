import React from "react";
import QuizEntity from "../components/test";
import { QuizProps } from "../interfaces";
import { useFetchQuizzes } from "../apis/quizServices";

function Recently() {
  const { data } = useFetchQuizzes();
  return (
    <div className="test-wrapper">
      {data?.map((item: QuizProps, index: number) => (
        <QuizEntity
          id={item.id}
          name={item.title}
          category={item.category}
          key={index}
          questions={item.questions}
          author={item.author}
        />
      ))}
    </div>
  );
}

export default Recently;
