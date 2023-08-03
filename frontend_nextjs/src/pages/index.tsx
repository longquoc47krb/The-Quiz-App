/* eslint-disable simple-import-sort/imports */
/* eslint-disable import/order */
/* eslint-disable @typescript-eslint/consistent-type-imports */
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';
import QuizDashboard from '@/components/quiz-dashboard';
import { Quiz } from '@/interfaces';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next/types';
import { fetchQuizzes } from '@/apis/quizServices';

export const getServerSideProps: GetServerSideProps<{
  quizzes: Quiz[];
}> = async () => {
  const quizzes = await fetchQuizzes();
  return {
    props: { quizzes },
  };
};
const Index = ({
  quizzes,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <Main meta={<Meta title="Quizaka | Home Page" description="Quizaka" />}>
      <QuizDashboard quizzes={quizzes} />
    </Main>
  );
};

export default Index;
