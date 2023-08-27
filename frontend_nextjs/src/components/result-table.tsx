import { motion } from 'framer-motion';
import { countBy, isArray, maxBy } from 'lodash';
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
  const renderRank = (value) => {
    switch (value) {
      case 1:
        return <span className="text-gray-50">🥇</span>;
      case 2:
        return <span className="text-gray-50">🥈</span>;
      case 3:
        return <span className="text-gray-50">🥉</span>;
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
          {reversedArray.map((result, index) => (
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
