import React from "react";
import { TestProps, User } from "../interfaces";
import { useFetchUsers } from "../apis/userServices";
import { useNavigate } from "react-router-dom";

function Test(props: TestProps) {
  const { name, questions, author, id } = props;
  const { data, isLoading } = useFetchUsers();
  const navigate = useNavigate();
  const authorInfo =
    !isLoading &&
    data?.find(function (user: User) {
      return user.email === author;
    });
  return (
    <div
      className="test-container cursor-pointer"
      onClick={() => navigate(`/quiz/${id}`)}
    >
      <div>
        <h1 className="text-2xl font-semibold line-clamp-2">{name}</h1>
        <h2 className="font-medium text-gray-500">
          {questions.length} câu hỏi
        </h2>
      </div>
      <div className="flex items-center gap-x-4 absolute bottom-2">
        <img
          src={authorInfo.avatar}
          className="rounded-full"
          style={{ width: 48 }}
        />
        <h2>{authorInfo.name}</h2>
      </div>
    </div>
  );
}

export default Test;
