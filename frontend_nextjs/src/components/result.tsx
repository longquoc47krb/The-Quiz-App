/* eslint-disable no-unsafe-optional-chaining */
import { countBy } from 'lodash';
import moment from 'moment';
import { useRouter } from 'next/router';
import React from 'react';
import { LuHistory } from 'react-icons/lu';

import type { Result } from '@/interfaces';
import { renderCorrectRatio } from '@/utils';

function ResultEntity(props: Result) {
  const { quiz, startTime, result, id } = props;
  const router = useRouter();
  const numberCorrectAnswer = countBy(result, 'correct').true || 0;
  const correctRatio = numberCorrectAnswer / result?.length;
  return (
    <div
      className="item-container"
      onClick={() => router.push(`/recent-quiz/${id}`)}
    >
      <div>
        <h1 className="text-3xl font-medium line-clamp-2">{quiz.title}</h1>
        <h2 className="font-normal italic text-gray-600">{quiz.category}</h2>
        Correct:{' '}
        <span className={renderCorrectRatio(correctRatio * 100)}>
          {(correctRatio * 100).toFixed(2)}%
        </span>
      </div>
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <img
            src={quiz?.author?.avatar}
            className="rounded-full"
            style={{ width: 32 }}
          />
          <h2 className="text-sm">{quiz?.author?.name}</h2>
        </div>
        <h2 className="font-medium text-gray-600">
          <h2 className="font-medium text-gray-600">
            <LuHistory className="inline-block text-gray-600" />{' '}
            {moment(startTime).fromNow()}
          </h2>
        </h2>
      </div>
    </div>
  );
}

export default ResultEntity;
