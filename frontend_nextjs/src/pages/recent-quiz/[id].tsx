/* eslint-disable react/jsx-no-undef */
import { usePrevious } from '@uidotdev/usehooks';
import { countBy } from 'lodash';
import React, { useEffect, useState } from 'react';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { BiTimer } from 'react-icons/bi';
import { MdOutlineSportsScore, MdVerified } from 'react-icons/md';

import { fetchResultById } from '@/apis/resultServices';
import SlideAnimation from '@/components/animation/slider';
import GridPagination from '@/components/grid-pagination';
import MultiChoiceQuestionsPreview from '@/components/multi-choice-questions/multi-choice-questions-preview';
import type { Result } from '@/interfaces';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';
import {
  calculateTimeDifference,
  convertSecondsToMinutesAndSeconds,
  formatDateToCustomFormat,
  renderCorrectRatio,
} from '@/utils';

function RecentlySubmitedQuiz({ result }: RecentResultPageProps) {
  const time = calculateTimeDifference(result.endTime, result.startTime);
  const { player, quiz, result: resultArr } = result;
  const [yourAnswers, setYourAnswers] = useState(resultArr);
  const numberCorrectAnswer = countBy(result.result, 'correct').true || 0;
  const [correctArr, setCorrectArr] = useState([]);
  // pagination
  const questionsPerPage = 1;
  const [currentPage, setCurrentPage] = useState(0);
  const previousPage = usePrevious(currentPage);
  const totalPages = Math.ceil(quiz.questions.length / questionsPerPage);
  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const correctRatio = numberCorrectAnswer / quiz?.questions?.length;
  useEffect(() => {
    if (resultArr.length !== quiz?.questions.length) {
      const updatedOptions = [...resultArr];
      const itemsToAdd = quiz?.questions.length - updatedOptions.length;
      for (let i = updatedOptions.length; i < itemsToAdd; i++) {
        updatedOptions.push({
          yourChoice: '',
          correct: false,
          answer: quiz?.questions[i]?.correctOption,
        }); // Replace someValue with the value you want to add
        console.log({ updatedOptions });
      }
      setYourAnswers(updatedOptions);
    }
  }, [quiz, resultArr]);
  useEffect(() => {
    const correctArray = yourAnswers.map((item) => item.correct);
    const desiredLength = quiz.questions.length;
    const newArray = [];
    for (let i = 0; i < desiredLength; i++) {
      newArray.push(correctArray[i] || false);
    }
    setCorrectArr(newArray);
  }, [result]);
  console.log(`ID ${result.id}:`, yourAnswers);

  return (
    <Main
      meta={
        <Meta title="Recently quiz played" description="Recently quiz played" />
      }
    >
      {' '}
      <div>
        <div className="flex justify-center items-start">
          <div>
            <div className="flex w-full justify-center items-start">
              <div className="flex justify-start items-center text-gray-300 bg-active p-4 rounded-lg">
                <div className="flex justify-start gap-4 pr-4 mr-4 border-r-2 border-r-primary">
                  <img
                    src={player.avatar}
                    className="rounded-full border-2 border-gray-500 w-12 h-12"
                  />
                  <div className="text-lg">
                    <h2>
                      {player.name}{' '}
                      {player?.verified && (
                        <MdVerified className="inline-block text-cyan-500" />
                      )}
                    </h2>
                    <h2>
                      Level{' '}
                      <span className="text-lime-400">{player.level}</span>
                    </h2>
                  </div>
                </div>
                <div className="text-lg grid grid-cols-2 grid-rows-3 gap-x-4 ">
                  <h1>Quiz: {quiz.title}</h1>
                  <p>{formatDateToCustomFormat(result.startTime)}</p>
                  <p>
                    <BiTimer className="inline-block mr-2 text-2xl" />
                    <span className="text-lime-400">
                      {convertSecondsToMinutesAndSeconds(time)}
                    </span>
                  </p>
                  <p>
                    <AiOutlineCheckCircle className="inline-block m-0 text-green-500" />{' '}
                    Correct:
                    <span className="text-gray-500 mx-2">
                      {numberCorrectAnswer}/{quiz?.questions?.length}
                    </span>
                    <span className={renderCorrectRatio(correctRatio * 100)}>
                      ({(correctRatio * 100).toFixed(2)}%)
                    </span>
                  </p>
                  <p>
                    <MdOutlineSportsScore className="inline-block mr-2" />{' '}
                    <span className="text-lime-400">{result?.score} pts</span>
                  </p>
                </div>
              </div>
            </div>
            <SlideAnimation
              direction={currentPage > previousPage ? 1 : -1}
              currentPage={currentPage}
              className="mx-auto w-full"
            >
              {quiz.questions
                .slice(
                  currentPage * questionsPerPage,
                  (currentPage + 1) * questionsPerPage,
                )
                ?.map((question, index) => (
                  <MultiChoiceQuestionsPreview
                    key={currentPage}
                    explain={question.explain}
                    options={question.options}
                    title={question.text}
                    result={yourAnswers[currentPage]}
                    answer={question.correctOption}
                  />
                ))}
            </SlideAnimation>
          </div>
          <GridPagination
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
            handleNextPage={handleNextPage}
            handlePrevPage={handlePrevPage}
            correctArray={correctArr}
          />
        </div>
      </div>
    </Main>
  );
}
interface RecentResultPageProps {
  result: Result;
}
export async function getServerSideProps(context) {
  const { params } = context;
  const { id } = params;
  // Fetch quiz data based on quizId
  // Replace this with your actual API call or data fetching method
  try {
    const response = await fetchResultById(id);

    return {
      props: {
        result: response,
      },
    };
  } catch (error) {
    console.error('Error fetching quiz data:', error);

    return {
      props: {
        result: null,
      },
    };
  }
}
export default RecentlySubmitedQuiz;
