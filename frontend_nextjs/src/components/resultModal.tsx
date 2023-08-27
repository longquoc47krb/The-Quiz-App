import { motion } from 'framer-motion';
import { maxBy } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { fetchResultsByPlayerIdAndQuizId } from '@/apis/resultServices';
import { congratsImagesPath } from '@/common/images';
import { useAuth } from '@/hooks/useAuthContext';
import { getRandomItemFromArray, renderCorrectRatio } from '@/utils';

function ResultModal({ numberCorrectAnswer, questions, quiz }) {
  const correctRatio = numberCorrectAnswer / questions?.length;
  const score = useSelector((state) => state.quizSession.score);
  const [results, setResults] = useState([]);
  const { user } = useAuth();
  useEffect(() => {
    async function fetchResults() {
      const response = await fetchResultsByPlayerIdAndQuizId(user?.id, quiz.id);
      setResults(response.data);
    }
    fetchResults();
  }, [numberCorrectAnswer]);
  const highestScoreObj = maxBy(results, 'score');
  const previousHighestScore = highestScoreObj?.score || 0;
  console.log({ previousHighestScore, score });
  return (
    <div className="rounded-lg cursor-pointer py-8 h-fit w-50 flex flex-col justify-between text-sky-600 dark:text-violet-400 bg-darkViolet mx-auto">
      <img
        src={getRandomItemFromArray(congratsImagesPath)}
        className="w-40 h-40 mx-auto rounded-xl"
      />
      <span>{score > previousHighestScore ? 'New record' : 'Score'}</span>
      <motion.p
        animate={{ scale: [1.5, 2, 1.5, 2, 1.5, 2, 1.5, 2] }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        className={`text-2xl font-semibold my-2 ${
          score > previousHighestScore ? 'text-amber-500' : 'text-gray-500'
        }`}
      >
        {score}
      </motion.p>
      <div className="flex items-center justify-center gap-x-4">
        {' '}
        <p className={renderCorrectRatio(correctRatio * 100)}>
          {numberCorrectAnswer}/{questions?.length}
          <br />({(correctRatio * 100).toFixed(2)}%)
        </p>
      </div>
    </div>
  );
}

export default ResultModal;
