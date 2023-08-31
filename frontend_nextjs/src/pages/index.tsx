/* eslint-disable simple-import-sort/imports */
/* eslint-disable import/order */
/* eslint-disable @typescript-eslint/consistent-type-imports */
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';
import QuizDashboard from '@/components/quiz-dashboard';
import { Quiz } from '@/interfaces';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next/types';
import { fetchQuizzes } from '@/apis/quizServices';
import {
  isStart,
  setQuizSession,
  setCurrentQuestion,
} from '@/middlewares/slices/quizSessionSlice';
import { useDispatch } from 'react-redux';
import RecentYourQuizzes from '@/components/recent-your-quizzes';
import Search from '@/components/search';
import MyQuizzes from '@/components/my-quizzes';

export const getServerSideProps: GetServerSideProps<{
  quizzes: Quiz[];
}> = async () => {
  try {
    const quizzes = await fetchQuizzes();
    return {
      props: { quizzes },
    };
  } catch (err) {
    return {
      props: { quizzes: [] },
    };
  }
};
const Index = ({
  quizzes,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const dispatch = useDispatch();
  dispatch(isStart(false));
  dispatch(setQuizSession(null));
  dispatch(setCurrentQuestion(0));
  return (
    <Main meta={<Meta title="Quizaka | Home Page" description="Quizaka" />}>
      <Search data={quizzes} keysToSearch={['title']} />
      <MyQuizzes />
      <RecentYourQuizzes />
      <QuizDashboard quizzes={quizzes} />
    </Main>
  );
};

export default Index;
