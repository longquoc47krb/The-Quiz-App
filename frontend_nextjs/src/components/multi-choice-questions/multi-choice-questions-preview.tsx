import { useEffect, useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import { ImCross } from 'react-icons/im';

import {
  CorrectMessage,
  IncorrectMessage,
  NoAnswerProvidedMessage,
} from '@/common/constants';
import { checkCorrectAnswer, getRandomItemFromArray } from '@/utils';

const MultiChoiceQuestionsPreview = ({
  title,
  options,
  explain,
  yourChoice,
  answer,
}) => {
  const [isCorrect, setIsCorrect] = useState([false, false, false, false]);
  useEffect(() => {
    const isAnswerCorrect = checkCorrectAnswer(options, answer);
    setIsCorrect(isAnswerCorrect);
  }, [options]);
  const validateClassName = (option: string, index: number) => {
    if (yourChoice === option) {
      return isCorrect[index] ? 'correct-choice flicker' : 'incorrect-choice';
    }
    if (option === answer) {
      return isCorrect[index] ? 'correct-choice flicker' : 'incorrect-choice';
    }
    return isCorrect[index] ? 'correct-choice flicker' : '';
  };
  function renderResult() {
    if (!yourChoice) {
      return (
        <span className="my-2">
          <ImCross className="inline-block" />{' '}
          {getRandomItemFromArray(NoAnswerProvidedMessage)}
        </span>
      );
    }

    if (yourChoice === '') {
      return (
        <span className="my-2">
          <ImCross className="inline-block" />{' '}
          {getRandomItemFromArray(NoAnswerProvidedMessage)}
        </span>
      );
    }
    if (yourChoice === answer) {
      return (
        <span className="text-left text-lime-400 my-2">
          <FaCheck className="inline-block text-lime-400" />{' '}
          {getRandomItemFromArray(CorrectMessage)}
        </span>
      );
    }
    return (
      <span className="items-start text-red-600 my-2">
        <ImCross className="inline-block text-red-600" />{' '}
        {getRandomItemFromArray(IncorrectMessage)}
      </span>
    );
  }
  return (
    <div className="flex md:items-center flex-col py-4 absolute">
      <h1 className="dark:text-gray-300 w-[60vw] text-center">{title}</h1>
      <div className="flex flex-col items-start">
        <div className="md:grid md:grid-cols-2 md:gap-4 mt-4 flex flex-col gap-y-4">
          {options.map((option, index) => (
            <button
              key={index}
              disabled
              value={option}
              className={`option ${validateClassName(option, index)}`}
            >
              {option}
            </button>
          ))}
        </div>
        {renderResult()}
      </div>
      <div className="bg-gray-600 text-gray-900 rounded-lg p-4 mt-4 w-[50vw] fade-in">
        {explain}
      </div>
    </div>
  );
};

export default MultiChoiceQuestionsPreview;
