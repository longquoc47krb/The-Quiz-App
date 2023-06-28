import React, { useState } from "react";
import { Question } from "../interfaces";

interface MultipleChoiceQuestionProps {
  answers: string[];
  onAnswerSelected: (selectedIndex: number) => void;
}

const MultipleChoiceQuestion: React.FC<MultipleChoiceQuestionProps> = ({
  answers,
  onAnswerSelected,
}) => {
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(0);

  const handleAnswerSelected = (selectedIndex: number) => {
    setSelectedAnswerIndex(selectedIndex);
    onAnswerSelected(selectedIndex);
  };
  console.log({ answers });
  return (
    <div>
      {answers.map((answer, index) => (
        <button
          key={index}
          onClick={() => handleAnswerSelected(index)}
          style={{
            backgroundColor: selectedAnswerIndex === index ? "blue" : "white",
          }}
        >
          {answer}
        </button>
      ))}
    </div>
  );
};

export default MultipleChoiceQuestion;
