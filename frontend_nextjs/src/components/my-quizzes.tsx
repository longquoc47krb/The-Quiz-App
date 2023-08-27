import { Splide } from '@splidejs/react-splide';
import { useQuery } from '@tanstack/react-query';
import { isArray } from 'lodash';
import React from 'react';

import { fetchQuizzesByAuthorId } from '@/apis/quizServices';
import { useAuth } from '@/hooks/useAuthContext';
import type { Quiz } from '@/interfaces';

import QuizEntity from './quiz';
import ResultItemWrap from './splide';

function MyQuizzes() {
  const { user } = useAuth();
  const { data: quizzes, isLoading } = useQuery({
    queryKey: ['fetchQuizzesByAuthorId'],
    queryFn: () => fetchQuizzesByAuthorId(user?.id),
    refetchInterval: 10000,
  });
  if (isLoading) {
    return <span>Loading...</span>;
  }
  const reversedArray = isArray(quizzes.data)
    ? quizzes.data.map((_, index, array) => array[array.length - 1 - index])
    : [];
  return (
    <>
      {reversedArray.length > 0 && (
        <div>
          <h1 className="m-4 text-2xl text-gray-400 font-medium section">
            My quizzes
          </h1>
          <Splide
            options={{
              start: 0,
              perPage: 3,
              gap: '1rem',
              width: 'calc(100vw - 8rem)',
              arrows: false,
              height: '100%',
            }}
            tag="div"
            style={{ paddingTop: '1em', paddingLeft: 8 }}
          >
            {reversedArray.map((props: Quiz, index) => (
              <ResultItemWrap>
                <QuizEntity key={index} {...props} isUpdate />
              </ResultItemWrap>
            ))}
          </Splide>
        </div>
      )}
    </>
  );
}

export default MyQuizzes;
