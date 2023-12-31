import { Splide } from '@splidejs/react-splide';
import { useQuery } from '@tanstack/react-query';
import { useMediaQuery } from '@uidotdev/usehooks';
import { isArray } from 'lodash';
import React from 'react';

import { fetchQuizzesByAuthorId } from '@/apis/quizServices';
import { useAuth } from '@/hooks/useAuthContext';
import type { Quiz } from '@/interfaces';

import QuizEntity from './quiz';
import ResultItemWrap from './splide';

function MyQuizzes() {
  const { user } = useAuth();
  const isSmallDevice = useMediaQuery('only screen and (max-width : 768px)');
  const { data: quizzes, isLoading } = useQuery({
    queryKey: ['fetchQuizzesByAuthorId'],
    queryFn: () => {
      if (!user) {
        // Handle the case when user is undefined or null
        return Promise.resolve([]); // You can return an empty array or any default value
      }
      return fetchQuizzesByAuthorId(user.id);
    },
  });
  if (isLoading) {
    return <span className="m-4">Loading...</span>;
  }
  if (!quizzes) {
    return null;
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
              perPage: isSmallDevice ? 1 : 3,
              gap: '1rem',
              width: isSmallDevice ? '90vw' : 'calc(100vw - 8rem)',
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
