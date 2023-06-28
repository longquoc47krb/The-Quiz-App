import React from "react";
import Test from "../components/test";
import { TestProps } from "../interfaces";
import { useFetchQuizzes } from "../apis/quizServices";

function Recently() {
  const { data } = useFetchQuizzes();
  return (
    <div className="test-wrapper">
      {data?.map((item: TestProps, index: number) => (
        <Test
          id={item.id}
          name={item.name}
          key={index}
          questions={item.questions}
          author={item.author}
        />
      ))}
    </div>
  );
}

export default Recently;
