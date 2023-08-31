import { motion } from 'framer-motion';
import { countBy, isArray, maxBy, orderBy } from 'lodash';
import React from 'react';

import {
  calculateTimeDifference,
  convertSecondsToMinutesAndSeconds,
  formatDateToCustomFormat,
} from '@/utils';

function ResultTable({ results, symbol }: { results: any[]; symbol: boolean }) {
  const reversedArray = isArray(results)
    ? results.map((_, index, array) => array[array.length - 1 - index])
    : [];
  const highestScoreObj = maxBy(reversedArray, 'score');
  const previousHighestScore = highestScoreObj?.score || 0;

  const sortedByScore = orderBy(reversedArray, ['score'], ['desc']);
  const renderRank = (value) => {
    switch (value) {
      case 1:
        return (
          <img
            src="https://em-content.zobj.net/source/icons8/373/1st-place-medal_1f947.png"
            alt="golden medal"
            className="h-10"
          />
        );
      case 2:
        return (
          <img
            src="https://em-content.zobj.net/source/icons8/373/2nd-place-medal_1f948.png"
            alt="silver medal"
            className="h-10"
          />
        );
      case 3:
        return (
          <img
            src="https://em-content.zobj.net/source/icons8/373/3rd-place-medal_1f949.png"
            alt="bronze medal"
            className="h-10"
          />
        );
      default:
        return <span>{value}</span>;
    }
  };
  return (
    <div className="mt-4 w-full">
      <motion.table
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.5 }}
        className="border-collapse border-neutral-900/50 border w-11/12"
      >
        <thead>
          <tr className="bg-violet-400/10 text-violet-400 rounded-lg">
            <th className="border border-neutral-900/50 p-2">#</th>
            <th className="border border-neutral-900/50 p-2">Name</th>
            <th className="border border-neutral-900/50 p-2">Date</th>
            <th className="border border-neutral-900/50 p-2">Time</th>
            <th className="border border-neutral-900/50 p-2">Correct Answer</th>
            <th className="border border-neutral-900/50 p-2">Score</th>
          </tr>
        </thead>
        <tbody>
          {sortedByScore.map((result, index) => (
            <tr key={index} className="text-center text-violet-400/40">
              <td className="border p-2 border-neutral-900/50">
                {symbol ? renderRank(index + 1) : index + 1}
              </td>
              <td className="border p-2 border-neutral-900/50">
                {result.player.name}
              </td>
              <td className="border p-2 border-neutral-900/50">
                {formatDateToCustomFormat(result.startTime)}
              </td>
              <td className="border p-2 border-neutral-900/50">
                {convertSecondsToMinutesAndSeconds(
                  calculateTimeDifference(result.endTime, result.startTime),
                )}
              </td>
              <td className="border p-2 border-neutral-900/50">
                {countBy(result.result, 'correct').true || 0}
              </td>
              <td
                className={`border p-2 border-neutral-900/50 ${
                  result.score >= previousHighestScore ? 'text-lime-500' : ''
                }`}
              >
                {result.score}
              </td>
            </tr>
          ))}
        </tbody>
      </motion.table>
    </div>
  );
}

export default ResultTable;
