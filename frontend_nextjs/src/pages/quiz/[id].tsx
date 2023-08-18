/* eslint-disable prettier/prettier */
/* eslint-disable react/button-has-type */
// pages/quiz/[id].js

import { useRouter } from 'next/router';
import { useState } from 'react';
import {useSelector  } from 'react-redux';

import { fetchQuizById } from '@/apis/quizServices';
import Loading from '@/components/loading';
import Modal from '@/components/modal';
import MultichoiceQuestion from '@/components/multi-choice-section';
import QuizStartForm from '@/components/quiz-start-form';
import type { Quiz } from '@/interfaces';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

function QuizDetailPage({ quizData }: QuizDetailPageProps) {
  const router = useRouter();
  const { id } = router.query;
  const isStart = useSelector(state => state.quizSession.isStart);
  if (!quizData) {
    return <Loading />;
  }
  const [modalOpen, setModalOpen] = useState(true);
  const currentQuestion = useSelector(state => state.quizSession.currentQuestion)
  const closeModal = () => {
    setModalOpen(false);
  }
  return (
    <Main
      meta={
        <Meta
          title={`Quizaka | ${quizData?.title}`}
          description={`${quizData?.title}`}
        />
      }
     >
      <Modal isOpen={modalOpen} onClose={()=> {
        closeModal()
        router.push('/')
        }}>
        <QuizStartForm quizData={quizData} onClose={closeModal}/>
      </Modal>
        {isStart && <MultichoiceQuestion 
        options={quizData?.questions[currentQuestion]?.options} 
        title={quizData?.questions[currentQuestion]?.text}
        answer={quizData?.questions[currentQuestion]?.correctOption}
        explain={quizData?.questions[currentQuestion]?.explain}
        time={10 * quizData?.questions?.length}
        /> }
       
     </Main>
  );
}
interface QuizDetailPageProps {
  quizData: Quiz;
}
export async function getServerSideProps(context) {
  const { params } = context;
  const { id } = params;
  // Fetch quiz data based on quizId
  // Replace this with your actual API call or data fetching method
  try {
    const response = await fetchQuizById(id);

    return {
      props: {
        quizData: response.data,
      },
    };
  } catch (error) {
    console.error('Error fetching quiz data:', error);

    return {
      props: {
        quizData: null,
      },
    };
  }
}
export default QuizDetailPage;
