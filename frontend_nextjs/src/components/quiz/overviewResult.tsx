import { motion } from 'framer-motion';
import { maxBy } from 'lodash';
import { toast, Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';

import { useAuth } from '@/hooks/useAuthContext';
import { isStart, setQuizSession } from '@/middlewares/slices/quizSessionSlice';
import { convertSecondsToMinutesAndSeconds } from '@/utils';

function OverviewResult({ quizData, results }) {
  const highestScoreObject = maxBy(results, 'score');
  const dispatch = useDispatch();
  const { user } = useAuth();
  const checkAuthentication = (user) => {
    if (user) {
      dispatch(isStart(true));
    }
    toast.error('Please login to start');
  };
  const attemptsTryTimes = 5;
  return (
    <motion.div
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, stiffness: 300 }}
      className="flex flex-col items-center mb-4 pb-4 border-b-[1px] border-b-gray-800/75 mx-16"
    >
      <div className="flex justify-center gap-x-4">
        <p>
          Quiz: <span className="text-gray-400">{quizData.title}</span>
        </p>
        |
        <p>
          Category: <span className="text-gray-400">{quizData.category}</span>
        </p>
      </div>
      <div className="flex justify-center gap-x-4">
        <p>
          No.questions:{' '}
          <span className="text-gray-400">{quizData.questions?.length}</span>{' '}
        </p>
        <p>
          Time{' '}
          <span className="text-gray-400">
            {convertSecondsToMinutesAndSeconds(quizData.questions?.length * 15)}
          </span>
        </p>
      </div>
      <p>
        No.attempts tried:{' '}
        <span className="text-gray-400">{results?.length || 0}</span>{' '}
      </p>
      <p>
        Limited No.attempts tried:{' '}
        <span className="text-gray-400">{attemptsTryTimes}</span>{' '}
      </p>
      <p>
        My record:{' '}
        <span className="text-lime-500">{highestScoreObject?.score}</span>{' '}
      </p>
      <motion.button
        whileHover={{
          scale: 1.2,
        }}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        onClick={async () => {
          checkAuthentication(user);
          dispatch(
            setQuizSession({
              id: null,
              user,
              quiz: quizData,
              startTime: new Date(),
              endTime: null,
              currentQuestion: 0,
              results: [],
              timePerQuestion: 0,
              score: 0,
              streak: 0,
            }),
          );
        }}
        className="mt-4 flex justify-center px-6 py-1 rounded-lg text-gray-200 bg-green-600 w-fit hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-5"
        disabled={results?.length === attemptsTryTimes}
        // disabled={results.length === 5}
      >
        Start
      </motion.button>
      <Toaster />
    </motion.div>
  );
}

export default OverviewResult;
