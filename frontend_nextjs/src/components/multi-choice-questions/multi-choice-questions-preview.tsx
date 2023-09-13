import { FaCheck } from 'react-icons/fa';
import { ImCross } from 'react-icons/im';

import {
  CorrectMessage,
  IncorrectMessage,
  NoAnswerProvidedMessage,
} from '@/common/constants';
import type { MCQProps } from '@/interfaces';
import {
  getRandomItemFromArray,
  replaceHtmlComma,
  validateOptionClassName,
} from '@/utils';

const MultiChoiceQuestionsPreview = (props: MCQProps) => {
  const { answer, explain, options, picture, title, yourChoice } = props;
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
    <div className="flex md:items-center flex-col py-4">
      <div
        className="text-center dark:text-gray-200 w-[60vw] text-lg"
        dangerouslySetInnerHTML={{ __html: title }}
      />
      {picture && (
        <div className="flex justify-center w-full">
          <img
            src={picture}
            className="h-[30vh] border-2 border-gray-500"
            alt="question"
          />
        </div>
      )}
      <div className="flex flex-col items-start">
        <div
          className={`md:grid text-lg ${
            options.length === 3 ? 'md:grid-cols-1' : 'md:grid-cols-2'
          } md:gap-4 mt-4 flex flex-col gap-y-4 `}
        >
          {options.map((option, index) => (
            <button
              key={index}
              disabled
              value={option}
              className={`option ${validateOptionClassName(
                yourChoice,
                option,
                answer,
              )}`}
            >
              <div
                className="text-center dark:text-gray-200"
                dangerouslySetInnerHTML={{ __html: replaceHtmlComma(option) }}
              />
            </button>
          ))}
        </div>
        {renderResult()}
      </div>
      <div
        className="bg-gray-600 text-gray-900 rounded-lg p-4 mt-4 w-[50vw] fade-in"
        dangerouslySetInnerHTML={{ __html: explain }}
      />
    </div>
  );
};

export default MultiChoiceQuestionsPreview;
