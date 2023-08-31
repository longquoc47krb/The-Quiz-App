/* eslint-disable react/jsx-no-undef */
import { usePrevious } from '@uidotdev/usehooks';
import { countBy } from 'lodash';
import React, { useEffect, useState } from 'react';
import { LuCheckCircle, LuTimer, LuTrophy } from 'react-icons/lu';
import { MdVerified } from 'react-icons/md';

import { fetchResultById } from '@/apis/resultServices';
import SlideAnimation from '@/components/animation/slider';
import GridPagination from '@/components/grid-pagination';
import MultiChoiceQuestionsPreview from '@/components/multi-choice-questions/multi-choice-questions-preview';
import type { MCQProps, Result } from '@/interfaces';
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
  const numberCorrectAnswer = countBy(result.result, 'correct').true || 0;
  const [correctArr, setCorrectArr] = useState([]);
  // pagination
  const questionsPerPage = 1;
  const [currentPage, setCurrentPage] = useState(0);
  const previousPage = usePrevious(currentPage);
  const totalPages = Math.ceil(resultArr.length / questionsPerPage);
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

  const correctRatio = numberCorrectAnswer / resultArr.length;
  useEffect(() => {
    const correctArray = resultArr.map((item) => item.correct);
    const desiredLength = resultArr.length;
    const newArray = [];
    for (let i = 0; i < desiredLength; i++) {
      newArray.push(correctArray[i] || false);
    }
    setCorrectArr(newArray);
  }, [result]);
  return (
    <Main
      meta={
        <Meta title="Recently quiz played" description="Recently quiz played" />
      }
    >
      {' '}
      <div>
        <div className="md:flex md:items-start block min-h-screen text-base">
          <div className="w-[60vw]">
            <div className="flex md:w-full justify-start items-start relative">
              <div className="md:flex md:justify-center md:items-start text-gray-300 bg-primary-900 p-4 rounded-lg block md:w-full w-[calc(100vw-5rem)">
                <div className="md:flex md:justify-center md:gap-4 md:pr-4 md:mr-4 md:border-r-2 md:border-r-primary block">
                  <img
                    src={player.avatar}
                    className="rounded-full border-2 border-gray-500 w-12 h-12"
                  />
                  <div className="md:block flex justify-between pb-2 mb-4 border-b-primary border-b-2 md:border-none">
                    <h2 className="flex items-center">
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
                <div className="md:grid md:grid-cols-[20vw_20vw] md:grid-rows-3 md:gap-x-4 block ">
                  <h1>Quiz: {quiz.title}</h1>
                  <p>{formatDateToCustomFormat(result.startTime)}</p>
                  <p>
                    <LuTimer className="inline-block mr-1 mb-1" />
                    <span className="text-lime-400">
                      {convertSecondsToMinutesAndSeconds(time)}
                    </span>
                  </p>
                  <p>
                    <LuCheckCircle className="inline-block mb-1 text-green-500" />{' '}
                    Correct:
                    <span className="text-gray-500 mx-2">
                      {numberCorrectAnswer}/{resultArr.length}
                    </span>
                    <span className={renderCorrectRatio(correctRatio * 100)}>
                      ({(correctRatio * 100).toFixed(2)}%)
                    </span>
                  </p>
                  <p>
                    <LuTrophy className="inline-block mr-1 mb-1" />{' '}
                    <span className="text-lime-400">{result?.score} pts</span>
                  </p>
                </div>
              </div>
            </div>
            <SlideAnimation
              direction={currentPage > previousPage ? 1 : -1}
              currentPage={currentPage}
              className="mx-auto"
            >
              {resultArr
                .slice(
                  currentPage * questionsPerPage,
                  (currentPage + 1) * questionsPerPage,
                )
                ?.map((props: MCQProps, index) => (
                  <MultiChoiceQuestionsPreview key={currentPage} {...props} />
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
        result: response.data,
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
