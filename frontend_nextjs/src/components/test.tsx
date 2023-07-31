import React from "react";
import { QuizProps, User } from "../interfaces";
import { useFetchUsers } from "../apis/userServices";
import { useNavigate } from "react-router-dom";

function QuizEntity(props: QuizProps) {
  const { name, author, id, category, questions } = props;
  const navigate = useNavigate();
  return (
    <div
      className="test-container cursor-pointer"
      onClick={() => navigate(`/quiz/${id}`)}
    >
      <div>
        <h1 className="text-2xl font-semibold line-clamp-2">{name}</h1>
        <h2 className="font-medium text-gray-500">{category}</h2>
        <h2 className="font-medium text-gray-500">
          {questions.length} câu hỏi
        </h2>
      </div>
      <div className="flex items-center gap-x-4 absolute bottom-2">
        <img
          src={author?.avatar}
          className="rounded-full"
          style={{ width: 48 }}
        />
        <h2>{author?.name}</h2>
      </div>
    </div>
  );
}

export default QuizEntity;
